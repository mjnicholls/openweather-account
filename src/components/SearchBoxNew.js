/* eslint-disable */
import React, { useState } from 'react'

import { Button } from 'reactstrap'

import AutoCompleteFormNew from './AutoCompleteFormNew'
import CoordinatesSearchNew from './CoordinatesSearchNew'

const SearchBoxNew = ({
  mapRef,
  location,
  setLocation,
  error,
  name,
  setName,
  isName,
  setIsName,
  isSet,
  setIsSet,
}) => {
  const [isSearchByName, setIsSearchByName] = useState(true)
  const [isDropDown, setIsDropDown] = useState(false)

  return (
    <div className="my-3">
      {isSearchByName ? (
        <AutoCompleteFormNew
          mapRef={mapRef}
          setLocation={setLocation}
          error={error}
          location={location}
          setIsName={setIsName}
          isName={isName}
          name={name}
          setName={setName}
          isSet={isSet}
          setIsSet={setIsSet}
          isDropDown={isDropDown}
          setIsDropDown={setIsDropDown}
        />
      ) : (
        <CoordinatesSearchNew
          mapRef={mapRef}
          setLocation={setLocation}
          location={location}
          name={name}
          setName={setName}
          isSet={isSet}
          setIsSet={setIsSet}
        />
      )}
      {isDropDown && (
        <div className="padded">
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
      )}
    </div>
  )
}

export default SearchBoxNew
