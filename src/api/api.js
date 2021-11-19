import axios from 'axios'

import {
  getIndexURL,
  postTriggerURL,
  patchTriggerURL,
  deleteTriggerURL,
  getEventsURL,
  getEventsByTriggerIdURL,
} from './index'

axios.defaults.timeout = 15000

// Trigger methods
export const getTriggers = (userId) =>
  /** Get a list of triggers  */
  axios.get(`${getIndexURL}?user_id=${userId}`)

export const postTrigger = (params) =>
  /** Create a new trigger  */
  axios.post(`${postTriggerURL}?user_id=${params.user_id}`, params)

export const patchTrigger = (params) =>
  /** Update a trigger  */
  axios.patch(`${patchTriggerURL}?user_id=${params.user_id}`, params)

export const deleteTrigger = (id, userId) =>
  /** Delete a trigger  */
  axios.delete(`${deleteTriggerURL}/${id}`, {
    params: { user_id: userId },
  })

// Event methods
export const getEventsByTriggerId = (triggerId, userId) =>
  /** Get a list of events  */
  axios.get(`${getEventsByTriggerIdURL}/${triggerId}?user_id=${userId}`)

export const getEvents = (userId) =>
  /** Get a list of events  */
  axios.get(`${getEventsURL}?user_id=${userId}`)
