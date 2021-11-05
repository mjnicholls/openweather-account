import { variables } from './config'

/* 
  const structure = {
  temp: 'degrees'
}

const getValue = (variable, units) => {
  if (variable === 'temp') {
    return units === 'metric' ? '°C degrees' : '°F degrees'

  }

}

*/

const getUnits = (variable, units) => {
  let res = ""
  if (variable === "temp") {
    res = (units === "metric") ? "°C" : "°F"
  }
  // TODO
  // rain => mm (always)
  // wind => m/s for metric, or mph for imperial
  return res

}

const humanReadable = (condition) => {
  const res = `You will be notified if the ${
    variables.find((el) => el.value === condition.variable).label
  } ${condition.condition === '>' ? 'exceeds' : 'falls below'} ${
    condition.value
  }  ${getUnits(condition.variable, condition.units)}`
  return res
}

export default humanReadable
