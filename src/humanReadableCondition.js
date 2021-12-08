import { variables } from './config'

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

const humanReadable = (condition) => {
  const res = `You will be notified if the ${
    variables.find((el) => el.value === condition.variable).label
  } ${condition.condition === '>' ? 'exceeds' : 'falls below'} ${
    condition.value
  }${getUnits(condition.variable, condition.units)}`
  return res
}

export default humanReadable
