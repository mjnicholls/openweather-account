export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR'

export const notifySuccess = (message) => ({
  type: NOTIFICATION_SUCCESS,
  payload: message,
})

export const notifyError = (message) => ({
  type: NOTIFICATION_ERROR,
  payload: message,
})
