import { variables } from '../config'

export const conditionToTextLong = (condition) => {
  const text = conditionToText(condition)
  const textLowerCase = text.charAt(0).toLowerCase() + text.slice(1)
  return `You will be notified if the ${textLowerCase}`
}

export const conditionToText = (condition) => {
  const { label } = variables.find((el) => el.value === condition.variable)
  const verb = condition.condition === '>' ? 'exceeds' : 'falls below'
  const units = getUnits(condition.variable, condition.units)
  return `${label} ${verb} ${condition.value}${units}`
}

const getUnits = (variable, units) => {
  let res = ''
  if (variable === 'temp') {
    res = units === 'metric' ? '°C' : '°F'
  }
  if (variable === 'prec') {
    res = units === 'mm' ? 'mm' : 'mm'
  }
  if (variable === 'wind') {
    res = units === 'metric' ? 'm/s' : 'mph'
  }
  return res
}

export const notificationText = (days) =>
  days
    ? `Up to ${days} day${days > 1 ? 's' : ''} before the event starts`
    : 'On the day of the event'
