
import { sendToEmail } from '../../config'
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
      let { body } = req
      let { first, last, reason, email, joinNewsletter, description, similarPhotoUrl } = body
      if (!first || !last || !email) {
        return res.json({ success: false, message: `Missing required fields` })
      }
      if (reason === reasons.customOrderRequest && !description) {
        return res.json({ success: false, message: `Missing custom order request fields` })
      }
      let { success, message } = await contact({ ...body, files: [similarPhotoUrl], sendToEmail })
      res.json({ success, message })

      createEmailContact({ email, first, last })
      if (joinNewsletter)
        setTimeout(() => { addToNewsletter({ email }) }, 30000)
    }
    catch(e) {
      logger.error(e)
      res.json({ success: false, message: `An error occurred, please try again later`})
    }
  })
}
