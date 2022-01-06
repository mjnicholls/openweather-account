import React from 'react'

import PropTypes from 'prop-types'
import { Location } from 'react-ikonate'

const ThumbnailLocation = ({ location, showIcon = true }) => (
  <div className="thumbnail ps-0">
    {showIcon && (
      <div>
        <Location className="me-1" />
      </div>
    )}
    <span>
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
