import React, { useState } from 'react'

import { Button } from 'reactstrap'

import AutoCompleteFormNew from './LocationAutoCompleteSearch'
import CoordinatesSearchNew from './LocationCoordinatesSearch'
import LocationName from './LocationName'

const LocationSearchBox = ({
  mapRef,
  location,
  setLocation,
  tempLocation,
  setTempLocation,
  error,
  setIsName,
  searchBoxRef,
  isDropDown,
  setIsDropDown,
}) => {

  const [isSearchByName, setIsSearchByName] = useState(true)

  const onSetClick = () => {
    setLocation(tempLocation)
  }

  return (
    <div>
      <div
        className="my-3 flex-grow-1"
        style={{ position: 'relative' }}
        ref={searchBoxRef}
      >
        <div className="d-flex align-items-baseline">
          <h5>Location</h5>
          {/*{location.lat && location.lon && (*/}
            {/*<LocationName location={location} setLocation={setLocation} />*/}
          {/*)}*/}
        </div>
        {isSearchByName ? (
          <AutoCompleteFormNew
            mapRef={mapRef}
            setTempLocation={setTempLocation}
            error={error}
            setIsDropDown={setIsDropDown}
          />
        ) : (
          <CoordinatesSearchNew
            mapRef={mapRef}
            tempLocation={tempLocation}
            setTempLocation={setTempLocation}
            setIsDropDown={setIsDropDown}
            error={error}
          />
        )}
        {isDropDown && (
          <div
            className="padded search-pop-up"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div>
              <Button
                className={`padded-button ${
                  isSearchByName ? 'padded-button-active' : ''
                }`}
                onClick={() => setIsSearchByName(true)}
                aria-pressed="true"
              >
                <span>Location</span>
              </Button>
              <Button
                className={`padded-button ${
                  isSearchByName ? '' : 'padded-button-active'
                }`}
                onClick={() => setIsSearchByName(false)}
                aria-pressed="true"
              >
                <span>Coordinates</span>
              </Button>
            </div>
            <button
              type="button"
              className={`padded-button ${
                location !== tempLocation ? 'padded-button-active' : ''
              }`}
              onClick={onSetClick}
              aria-pressed="true"
              disabled={location === tempLocation}
            >
              <span>Set</span>
            </button>
          </div>
        )}
      </div>
      {location.lat && location.lon && (
        <div className="my-3">
          <LocationName location={location} setLocation={setLocation} />
        </div>
      )}
    </div>
  )
}

export default LocationSearchBox
