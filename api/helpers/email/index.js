
import contact from './contact'
import logger from '../logger'
import { sendHtmlEmail } from '../sendInBlue'

const templates = { contact }

export default Object.keys(templates).reduce((obj,template) => ({
  ...obj,
  [template]: async props => {
      let { sendToEmail, files } = props
      let { html, subject } = templates[template](props)
      logger.info(
        `Sending email with subject "${subject}" to "${sendToEmail}" with ${files.length} files`
      )
      let { success, message } = await sendHtmlEmail({ email: sendToEmail, subject, html, files })
      return { success, message }
    },
}), {})
