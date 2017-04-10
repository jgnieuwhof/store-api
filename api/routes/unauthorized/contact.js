
import logger from '../../helpers/logger'
import { contact } from '../../helpers/email'
import { addToNewsletter, createEmailContact } from '../../helpers/sendInBlue'

const reasons = {
  generalInquiry: `General Inquiry`,
  customOrderRequest: `Custom Order Request`,
  shippingInquiry: `Shipping Inquiry`,
}

export default ({ api }) => {
  api.post(`/contact`, async (req, res) => {
    logger.info(`in /contact`)
    try {
      let sendToEmail = `jgnieuwhof@gmail.com`
      let { first, last, reason, email, joinNewsletter, description } = req.body
      if (!first || !last || !email) {
        return res.json({ success: false, message: `Missing required fields` })
      }
      if (reason === reasons.customOrderRequest && !description) {
        return res.json({ success: false, message: `Missing custom order request fields` })
      }
      let { success, message } = await contact({ ...req.body, sendToEmail })
      if (joinNewsletter) {
        let response = await createEmailContact({ email, first, last })
        if (!response.success)
          return res.json({
            success: false,
            message: `Error joining mailing list, please try again later`,
          })
        setTimeout(() => { addToNewsletter({ email }) }, 30000)
        return res.json({ success: true })
      }
      res.json({ success, message })
    }
    catch(e) {
      logger.error(e)
      res.json({ success: false, message: `An error occurred, please try again later`})
    }
  })
}
