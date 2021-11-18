const baseURL = process.env.REACT_APP_BASE_URL
export const getIndexURL = `${baseURL}triggers/v1/trigger/all`
export const postTriggerURL = `${baseURL}triggers/v1/trigger`
export const patchTriggerURL = `${baseURL}triggers/v1/trigger`
export const deleteTriggerURL = `${baseURL}triggers/v1/trigger`
export const getEventsURL = `${baseURL}triggers/v1/events/all`
export const getEventsByTriggerIdURL = `${baseURL}triggers/v1/events`
