
import logger from '../../helpers/logger'
import { addToNewsletter, createEmailContact } from '../../helpers/sendInBlue'

export default ({ api }) => {
  api.post(`/joinNewsletter`, async (req, res) => {
    logger.info(`in /joinNewsletter`)
    try {
      let { email } = req.body
      if (!email) {
        res.json({ success: false, message: `Please provide an email address` })
      }
      else {
        let response = await createEmailContact({ email })
        if (!response.success) {
          res.json({ success: false, message: `Invalid email address`})
        }
        else {
          response = await addToNewsletter({ email })
          if (!response.success) {
            res.json({ success: false, message: `An error occurred, please try again later` })
          }
          else {
            res.json({ success: true })
          }
        }
      }
    }
    catch(e) {
      logger.error(`error in /joinNewsletter`)
      logger.error(e)
      res.json({ success: false, message: `An error occurred, please try again later`})
    }
  })
}
