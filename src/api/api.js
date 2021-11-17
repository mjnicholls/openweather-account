import axios from 'axios'
import {
  getIndexURL,
  postTriggerURL,
  patchTriggerURL,
  deleteTriggerURL,
  getEventsURL,
  getTriggersId
  
} from './index'

axios.defaults.timeout = 15000

export const getTriggers = (userId) => {
  /** Get a list of triggers  */
  const url = `${getIndexURL}?user_id=${userId}`
  return axios.get(url)
}

/*eslint-disable-next-line*/
export const getTriggersbyId = (trigger_id, userId) => {
  /** Get a list of triggers  */
  /*eslint-disable-next-line*/
  const url = `${getTriggersId}/${trigger_id}?user_id=${userId}`
  return axios.get(url)
}

export const getEvents = (userId) => {
  /** Get a list of events  */
  const url = `${getEventsURL}?user_id=${userId}`
  return axios.get(url)
}

export const postTrigger = async (params) => {
  /** Create a new trigger  */
  const url = `${postTriggerURL}`
  return axios.post(url, params)
}

export const patchTrigger = async (params) => {
  /** Update a trigger  */

  const url = `${patchTriggerURL}`
  return axios.patch(url, params)
}

export const deleteTrigger = async (id, userId) => {
  /** Delete a trigger  */

  const url = `${deleteTriggerURL}/${id}`

  return axios.delete(url, { params: { user_id: userId } })
}
