import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

import { noBlankErrorMessage } from '../config'
import placeMarker from './placeMarker'

const CoordinatesSearch = ({
  mapRef,
  tempLocation,
  setTempLocation,
  setIsDropDown,
}) => {
  const [error, setError] = useState({})

  const latRangeError = 'Value cannot be below -90 or above 90'
  const lngRangeError = 'Value cannot be below -180 or above 180'

  const [localTempLocation, setLocalTempLocation] = useState(tempLocation)

  const validate = () => {
    setError({})
    const newError = {}

    if (!localTempLocation.lat && localTempLocation.lat !== 0) {
      newError.lat = noBlankErrorMessage
    } else if (localTempLocation.lat < -90 || localTempLocation.lat > 90) {
      newError.lat = latRangeError
    }
    if (!localTempLocation.lon && localTempLocation.lon !== 0) {
      newError.lon = noBlankErrorMessage
    } else if (localTempLocation.lon < -180 || localTempLocation.lon > 180) {
      newError.lon = lngRangeError
    }
    if (Object.keys(newError).length) {
      setError(newError)
      return false
    }
    return true
  }

  const onFocus = () => {
    setIsDropDown(true)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setCoordinates()
    }
  }

  const setCoordinates = () => {
    if (validate()) {
      // const pos = new google.maps.LatLng(tempLocation.lat, tempLocation.lon)
      // if (mapRef && mapRef.current) {
        /* eslint-disable-next-line */
        // placeMarker(pos, mapRef.current.map_)
      setTempLocation({
        ...localTempLocation,
        name: 'Custom location',
      })
      console.log('set')
    }
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <Input
          type="number"
          style={{borderRight: 'none', borderTopRightRadius: 0, borderBottomRightRadius: 0}}
          className={`owm-selector ${error.lat ? 'danger-border' : ''}`}
          value={localTempLocation.lat}
          onChange={(e) => {
            setLocalTempLocation({ ...localTempLocation, lat: parseFloat(e.target.value) })
          }}
          placeholder="Latitude"
          onFocus={onFocus}
        />
        <div
          className={`invalid-feedback ${error.lat ? 'd-block' : ''}`}
        >
          {error.lat}
        </div>
      </div>
      <div className="flex-grow-1">
        <Input
          type="number"
          style={{borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
          className={`owm-selector ${error.lon ? 'danger-border' : ''}`}
          value={localTempLocation.lon}
          onChange={(e) => {
            setLocalTempLocation({ ...localTempLocation, lon: parseFloat(e.target.value) })
          }}
          placeholder="Longitude"
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
        <div
          className={`invalid-feedback ${error.lon ? 'd-block' : ''}`}
        >
          {error.lon}
        </div>
      </div>
    </div>
  )
}

CoordinatesSearch.propTypes = {
  tempLocation: PropTypes.object,
  setTempLocation: PropTypes.func,
  mapRef: PropTypes.object,
  setIsDropDown: PropTypes.func,
}

export default CoordinatesSearch
