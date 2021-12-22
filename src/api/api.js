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
export const getTriggersAPI = (userId) =>
  axios.get(`${getIndexURL}?user_id=${userId}`)

export const createTriggerAPI = (params, userId) =>
  axios.post(`${postTriggerURL}?user_id=${userId}`, {
    ...params,
    user_id: userId,
  })

export const updateTriggerAPI = (params, userId) =>
  axios.patch(`${patchTriggerURL}?user_id=${userId}`, {
    ...params,
    user_id: userId,
  })

export const deleteTriggerAPI = (id, userId) =>
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
