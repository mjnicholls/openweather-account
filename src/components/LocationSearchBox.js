/* eslint-disable */

import React, { useState } from 'react'

import { Button } from 'reactstrap'

import AutoCompleteFormNew from './LocationAutoCompleteSearch'
import CoordinatesSearchNew from './LocationCoordinatesSearch'
import LocationName from './LocationName'
import EditableInput from './EditableInput'

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

  return (
    <div>
      <div
        className="my-3 flex-grow-1"
        style={{ position: 'relative' }}
        ref={searchBoxRef}
      >
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
            <Button
              className={`padded-button ${
                isSearchByName ? 'padded-button-active' : ''
              }`}
              onClick={() => setIsSearchByName(true)}
              aria-pressed="true"
            >
              <span>Set</span>
            </Button>
          </div>
        )}
      </div>
      {location.lat && location.lon && (
        <div className="my-3">
          <LocationName location={location} setLocation={setLocation} />
          {/*<EditableInput content={location.name} setContent={(val) => {setLocation({...location, name: val})}}/>*/}
        </div>
      )}
    </div>
  )
}

export default LocationSearchBox
