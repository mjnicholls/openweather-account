
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

const humanReadable = (condition) => {

  const res = `You will be notified if the ${variables.find(el => el.value === condition.variable).label} ${condition.condition === ">" ? "exceeds" : "falls below"} ${condition.value}  ${condition.units === "metric" ? "°C, m/s" : "°F, mph"}`
  return res
}


export default humanReadable