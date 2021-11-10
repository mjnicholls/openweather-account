import React from 'react'

import axios from 'axios'
import { getIndexURL, postTriggerURL, patchTriggerURL } from './index'

export const getTriggers = (userId) => {
  /** Get a list of triggers  */

  const url = `${getIndexURL}?user_id=${userId}`
  return axios.get(url, { timeout: 15000 })
}

export const postTrigger = async (params) => {
  /** Create a new trigger  */

  const url = `${postTriggerURL}`
  return axios.post(url, { timeout: 15000 }, params)
}

export const patchTrigger = async (params) => {
  /** Create a new trigger  */

  const url = `${patchTriggerURL}`
  return axios.patch(url, { timeout: 15000 }, params)
}
