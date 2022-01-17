let baseURL = process.env.REACT_APP_BASE_URL
if (window.gon && window.gon.trigger_api_host) {
  baseURL = window.gon.trigger_api_host
}
let basePath = process.env.REACT_APP_BASE_PATH
if (window.gon && window.gon.trigger_api_path) {
  basePath = window.gon.trigger_api_path
}

export const getIndexURL = `${baseURL}${basePath}/trigger/all`
export const postTriggerURL = `${baseURL}${basePath}/trigger`
export const patchTriggerURL = `${baseURL}${basePath}/trigger`
export const deleteTriggerURL = `${baseURL}${basePath}/trigger`
export const getEventsURL = `${baseURL}${basePath}/events/all`
export const getEventsByTriggerIdURL = `${baseURL}${basePath}/events`
