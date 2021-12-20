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
  searchBoxRef,
  isDropDown,
  setIsDropDown,
}) => {
  const [isSearchByName, setIsSearchByName] = useState(true)

  return (
    <div className="my-3" style={{ position: 'relative' }} ref={searchBoxRef}>
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
          isDropDown={isDropDown}
          setIsDropDown={setIsDropDown}
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
  )
}

export default SearchBoxNew
