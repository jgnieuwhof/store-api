
import logger from '../../helpers/logger'
import { contact } from '../../helpers/email'

export default ({ api }) => {
  api.post(`/contact`, async (req, res) => {
    logger.info(`in /contact`)
    try {
      let email = `jgnieuwhof@gmail.com`
      let { first, last, note, reason, email: contactEmail } = req.body
      if (!first || !last || !contactEmail) {
        return res.json({ success: false, message: `Missing required fields` })
      }
      let { success, message } = await contact({ first, last, note, reason, contactEmail, email })
      res.json({ success, message })
    }
    catch(e) {
      logger.error(e)
      res.json({ success: false, message: `An error occurred, please try again later`})
    }
  })
}
