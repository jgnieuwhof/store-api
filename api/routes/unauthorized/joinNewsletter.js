
import logger from '../../helpers/logger'

export default ({ api }) => {
  api.post(`/joinNewsletter`, (req, res) => {
    try {
      logger.info(`in /joinNewsletter`)
      res.json({ success: false })
    }
    catch(e) {
      logger.error(`error in /joinNewsletter: ${e}`)
    }
  })
}
