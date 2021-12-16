import React from 'react'
import { Location } from 'react-ikonate'


const TriggerLocation = ({location, showIcon=true}) => (
  <div className="d-flex align-items-center">
    {showIcon && <Location />}
    <span className="ms-1">
      {location.name} ({location.lat.toFixed(3)},{' '}
      {location.lon.toFixed(3)})
    </span>
  </div>
)

export default TriggerLocation