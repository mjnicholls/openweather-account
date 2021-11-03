/* eslint-disable */
import {variables} from './config'


var structure = {
  temp: 'degrees'
}

const getValue = (variable, units) => {
  if (variable === 'temp') {
    return units === 'metric' ? '°C degrees' : '°F degrees'
  }

}

const humanReadable = (condition) => {
  // The temperature falls below 0°C degrees
  // The wind speed exceeds 10 m/sec  m/s (metric) mph (F)
  // The precipitation level exceeds 15mm

  let res = `${variables.find(el => el.value === condition.variable).label} ${condition.condition === ">" ? "exceeds" : "falls below"}`
  return res
}

export default humanReadable