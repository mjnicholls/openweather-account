import { noBlankErrorMessage } from '../config'

export const validateEmail = (email) => {
  const re = /^([^@\s]+)@((?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,})$/
  return re.test(email)
}

export const coordinatesError = (lat, lon) => {
  const latRangeError = 'Latitude value cannot be below -90 or above 90'
  const lngRangeError = 'Longitude value cannot be below -180 or above 180'

  const error = {}

  if (lat === 'undefined') {
    error.lat = noBlankErrorMessage
  } else if (lat < -90 || lat > 90) {
    error.lat = latRangeError
  }
  if (lon === 'undefined') {
    error.lon = noBlankErrorMessage
  } else if (lon < -180 || lon > 180) {
    error.lon = lngRangeError
  }
  if (Object.keys(error).length) {
    return error
  }
  return null
}
