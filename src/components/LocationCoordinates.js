import React, { useRef } from 'react'

import PropTypes from 'prop-types'

const LocationCoordinates = ({
  coordsLocation,
  setCoordsLocation,
  setIsDropDown,
  setCoordinates,
  error,
  setError,
}) => {
  const lonRef = useRef(null)

  const onFocus = () => {
    setIsDropDown(true)
  }

  const onKeyDownLat = (e) => {
    setError({
      ...error,
      lat: null,
    })
    if (e.keyCode === 13) {
      lonRef.current.focus()
    }
  }

  const onKeyDownLon = (e) => {
    setError({
      ...error,
      lon: null,
    })
    if (e.keyCode === 13) {
      setCoordinates()
    }
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <input
          type="number"
          style={{
            borderRight: error.lat ? '1px solid red' : 'none',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          className={`owm-selector ${error.lat ? 'danger-border' : ''}`}
          value={coordsLocation.lat}
          onChange={(e) => {
            setCoordsLocation({
              ...coordsLocation,
              lat: parseFloat(e.target.value),
            })
          }}
          placeholder="Latitude"
          onFocus={onFocus}
          onKeyDown={onKeyDownLat}
        />
      </div>
      <div className="flex-grow-1">
        <input
          ref={lonRef}
          type="number"
          style={{
            borderLeft: error.lon ? '1px solid red' : 'none',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          className={`owm-selector ${error.lon ? 'danger-border' : ''}`}
          value={coordsLocation.lon}
          onChange={(e) => {
            setCoordsLocation({
              ...coordsLocation,
              lon: parseFloat(e.target.value),
            })
          }}
          placeholder="Longitude"
          onFocus={onFocus}
          onKeyDown={onKeyDownLon}
        />
      </div>
    </div>
  )
}

LocationCoordinates.propTypes = {
  coordsLocation: PropTypes.object,
  error: PropTypes.object,
  setError: PropTypes.func,
  setCoordinates: PropTypes.func,
  setCoordsLocation: PropTypes.func,
  setIsDropDown: PropTypes.func,
}

export default LocationCoordinates
