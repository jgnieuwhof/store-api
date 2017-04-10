
import contact from './contact'
import { sendHtmlEmail } from '../sendInBlue'

const templates = { contact }

export default Object.keys(templates).reduce((obj,template) => ({
  ...obj,
  [template]: async props => {
      let { sendToEmail, files } = props
      let { html, subject } = templates[template](props)
      let { success, message } = await sendHtmlEmail({ email: sendToEmail, subject, html, files })
      return { success, message }
    },
}), {})
