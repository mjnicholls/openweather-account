import React from 'react'

import classnames from 'classnames/index'
import PropTypes from 'prop-types'
import Autocomplete from 'react-google-autocomplete'

import placeMarker from '../utils/placeMarker'

const AutoCompleteForm = ({
  mapRef,
  setTempLocation,
  error,
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
      setTempLocation({
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
        className={`owm-selector w-100 ${
          error.location ? 'danger-border' : ''
        }`}
        onPlaceSelected={(place) => {
          onPlaceSelected(place)
        }}
        onFocus={onFocus}
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
  setTempLocation: PropTypes.func,
  error: PropTypes.object,
  mapRef: PropTypes.object,
}

export default AutoCompleteForm
