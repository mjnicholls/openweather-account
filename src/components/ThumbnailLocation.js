import React from 'react'

import PropTypes from 'prop-types'
import { Location } from 'react-ikonate'

const ThumbnailLocation = ({ location, showIcon = true }) => (
  <div className="thumbnail" style={{ paddingLeft: 0 }}>
    {showIcon && <Location />}
    <span className="ms-1">
      {location.name} ({location.lat.toFixed(3)}, {location.lon.toFixed(3)})
    </span>
  </div>
)

ThumbnailLocation.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
    lat: PropTypes.number,
    lon: PropTypes.number,
  }),
  showIcon: PropTypes.bool,
}

export default ThumbnailLocation
