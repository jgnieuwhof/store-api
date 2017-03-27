
import fetch from 'node-fetch'

import { sendInBlueApi, sendInBlueKey } from '../config'

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

export let createEmailContact = ({ email }) => {
  return sendInBlueApiRequest({
    endpoint: `/user/createdituser`,
    method: `POST`,
    body: {
      email,
    },
  })
}

export const addToNewsletter = ({ email }) => {
  return sendInBlueApiRequest({
    endpoint: `list/4/users`,
    method: `POST`,
    body: {
      users: [ email ],
    },
  })
}

export let sendHtmlEmail = async ({ email, subject, html }) => {
  let body = {
    to: { [email]: email },
    from: [ `hello@phrase.fm`, `Phrase.fm` ],
    subject,
    html,
  }
  if (files && files.length) {
    body.attachment = files
  }
  return sendInBlueApiRequest({
    endpoint: `email`,
    method: `POST`,
    body,
  })
}
