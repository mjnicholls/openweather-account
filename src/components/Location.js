import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { coordinatesError } from '../utils/validation'
import EditableInput from './EditableInput'
import AutoCompleteForm from './LocationAutoComplete'
import CoordinatesSearch from './LocationCoordinates'

const Location = ({
  mapRef,
  location,
  setLocation,
  tempLocation,
  setTempLocation,
  error,
  setError,
  searchBoxRef,
  isDropDown,
  setIsDropDown,
  setIsLocationNameEdited,
}) => {
  const [isSearchByName, setIsSearchByName] = useState(true)
  const [coordsTempLocation, setCoordsTempLocation] = useState(tempLocation)

  const setCoordinates = () => {
    setError({})
    const coordsError = coordinatesError(
      coordsTempLocation.lat,
      coordsTempLocation.lon,
    )
    if (coordsError) {
      setError(coordsError)
      setIsDropDown(false)
      return
    }
    setTempLocation({
      ...coordsTempLocation,
      name: 'Custom location',
    })
    setIsDropDown(false)
  }

  const canSetCoordinates = () =>
    tempLocation.lat !== coordsTempLocation.lat ||
    tempLocation.lon !== coordsTempLocation.lon

  const setLocationName = (val) => {
    setLocation({ ...location, name: val })
    setIsLocationNameEdited(true)
  }

  return (
    <div>
      <div
        className="flex-grow-1"
        style={{ position: 'relative' }}
        ref={searchBoxRef}
      >
        <div className="d-flex align-items-baseline">
          <h5>Location</h5>
        </div>
        {isSearchByName ? (
          <AutoCompleteForm
            mapRef={mapRef}
            setTempLocation={setTempLocation}
            error={error}
            setError={setError}
            setIsDropDown={setIsDropDown}
          />
        ) : (
          <CoordinatesSearch
            mapRef={mapRef}
            coordsLocation={coordsTempLocation}
            setCoordsLocation={setCoordsTempLocation}
            setIsDropDown={setIsDropDown}
            setCoordinates={setCoordinates}
            error={error}
            setError={setError}
          />
        )}
        {isDropDown && (
          <div className="padded search-pop-up d-flex justify-content-between">
            <div>
              <button
                type="button"
                className={`padded-button ${
                  isSearchByName ? 'padded-button-active' : ''
                }`}
                onClick={() => setIsSearchByName(true)}
                aria-pressed="true"
              >
                Location
              </button>
              <button
                type="button"
                className={`padded-button ${
                  !isSearchByName ? 'padded-button-active' : ''
                }`}
                onClick={() => setIsSearchByName(false)}
                aria-pressed="true"
              >
                Coordinates
              </button>
            </div>
            {!isSearchByName && (
              <button
                type="button"
                className={`padded-button ${
                  canSetCoordinates() ? 'padded-button-active' : ''
                }`}
                onClick={setCoordinates}
                aria-pressed="true"
                disabled={!canSetCoordinates()}
              >
                Set
              </button>
            )}
          </div>
        )}
      </div>
      {location.lat && location.lon && (
        <div className="my-3">
          <EditableInput
            content={location.name}
            setContent={setLocationName}
            tagName="p"
            error={error.locationName}
          />
        </div>
      )}
      {error.lat && <div className="invalid-feedback d-block">{error.lat}</div>}
      {error.lon && <div className="invalid-feedback d-block">{error.lon}</div>}
      {error.location && (
        <div className="invalid-feedback d-block">{error.location}</div>
      )}
    </div>
  )
}

Location.propTypes = {
  mapRef: PropTypes.object,
  location: PropTypes.object,
  setLocation: PropTypes.func,
  tempLocation: PropTypes.object,
  setTempLocation: PropTypes.func,
  error: PropTypes.object,
  setError: PropTypes.func,
  searchBoxRef: PropTypes.object,
  isDropDown: PropTypes.bool,
  setIsDropDown: PropTypes.func,
  setIsLocationNameEdited: PropTypes.func,
}

export default Location
