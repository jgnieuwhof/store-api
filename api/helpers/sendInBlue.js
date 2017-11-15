
import fetch from 'node-fetch'

import { fromEmails, sendInBlueApi, sendInBlueKey } from '../config'
import logger from './logger'

export let sendInBlueApiRequest = async ({ endpoint, method, body }) => {
  if (process.env.NODE_ENV === `test`) {
    return
  }
  let response = await fetch(`${sendInBlueApi}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': `application/json`,
      'api-key': sendInBlueKey,
    },
    body: JSON.stringify(body),
  })
  let json = await response.json()
  if (json.code === `failure`) {
    return { success: false, message: json.message }
  }
  else if (json.data.failed) {
    return { success: false, message: json.data.failed.message }
  }
  return { ...json, success: true }
}

export let createEmailContact = async ({ email, first, last }) => {
  let body = {
    email,
    attributes: {
      FIRSTNAME: first,
      LASTNAME: last,
    },
  }
  let response = await sendInBlueApiRequest({
    endpoint: `/user/createdituser`,
    method: `POST`,
    body,
  })
  if (!response.success)
    logger.error(`Error creating a user: `, response)
  else
    logger.info(`Added user ${email}, ${first}, ${last}`)
  return response
}

export const addToNewsletter = async ({ email }) => {
  let response = await createEmailContact({ email })
  if (!response.success) return response
  response = await sendInBlueApiRequest({
    endpoint: `list/4/users`,
    method: `POST`,
    body: {
      users: [ email ],
    },
  })
  if (!response.success)
    logger.error(`Error adding to newsletter: `, response)
  else
    logger.info(`Added user ${email} to newsletter`)
  return response
}

export let sendHtmlEmail = async ({ email, subject, html, files }) => {
  let body = {
    to: { [email]: email },
    from: fromEmails,
    subject,
    html,
  }
  if (files && files.length) {
    body.attachment = files
  }
  let { success, message } = await sendInBlueApiRequest({
    endpoint: `email`,
    method: `POST`,
    body,
  })
  if (!success)
    logger.error(`Error sending email: `, message)
  else
    logger.info(`Email sent! ${email}, ${subject}`)
  return { success, message }
}
