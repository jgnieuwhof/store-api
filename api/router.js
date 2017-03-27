import express from 'express'

import auth from './auth'
import authorizedRoutes from './routes/authorized'
import unauthorizedRoutes from './routes/unauthorized'

export default ({ app }) => {

  let api = express.Router()

  unauthorizedRoutes.forEach(route => route({ api }))

  auth({ app, api })

  authorizedRoutes.forEach(route => route({ api }))

  return api
}
