import React from 'react'

import '../App.scss'
import classnames from 'classnames/index'
import PropTypes from 'prop-types'
import Autocomplete from 'react-google-autocomplete'

import placeMarker from './placeMarker'

const AutoCompleteForm = ({
  mapRef,
  location,
  setLocation,
  error,
  setIsSet,
  isDropDown,
  setIsDropDown,
}) => {
  const onPlaceSelected = (place) => {
    if (
      mapRef &&
      mapRef.current &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      setLocation({
        name: place.formatted_address,
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
      })

      placeMarker(
        place.geometry.location,
        // eslint-disable-next-line
        mapRef.current.map_,
      )
    }
  }

  const onFocus = () => {
    setIsDropDown(true)
  }

  return (
    <>
      <Autocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
        className={`input-marketplace ${error.location ? 'danger-border' : ''}`}
        onPlaceSelected={(place) => {
          onPlaceSelected(place)
          setIsSet(true)
        }}
        // onChange={(e) => {
        //   setLocation({ ...location, name: e.target.value })
        // }}
        onFocus={onFocus}
        // value={location.name}
        placeholder="Enter location"
      />
      <div
        className={classnames(
          'invalid-feedback ',
          error.location ? 'd-block' : '',
        )}
      >
        {error.location}
      </div>
    </>
  )
}

AutoCompleteForm.propTypes = {
  setLocation: PropTypes.func,
  error: PropTypes.object,
  mapRef: PropTypes.object,
}

export default AutoCompleteForm
