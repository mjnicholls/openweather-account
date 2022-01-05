import React from 'react'

import PropTypes from 'prop-types'

const InfoWindow = ({ location, setLocation, showButton }) => {
  const onSetLocationClick = (e) => {
    setLocation(location)
    e.stopPropagation()
  }

  return location.lat && location.lon ? (
    <div className="mapPop">
      <h5>{location.name}</h5>
      <hr />
      <div className="main">
        <div>
          <p>
            <b>Latitude: </b>
            {location.lat.toFixed(6)}{' '}
          </p>
          <p>
            <b>Longitude: </b>
            {location.lon.toFixed(6)}
          </p>
        </div>
        <div className="text-end">
          {showButton && (
            <button
              type="button"
              className="button-active shadow-none"
              onClick={onSetLocationClick}
            >
              Set location
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null
}

InfoWindow.propTypes = {
  location: PropTypes.object,
  setLocation: PropTypes.func,
  showButton: PropTypes.bool,
}

export default InfoWindow
