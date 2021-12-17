/*eslint-disable*/
import React from 'react'
import '../App.scss'
import classnames from 'classnames/index'
import PropTypes from 'prop-types'
import Autocomplete from 'react-google-autocomplete'
import { Col, Row, FormGroup } from 'reactstrap'
import placeMarker from './placeMarker'

const AutoCompleteForm = ({
  mapRef,
  location,
  setLocation,
  error,
  setIsSet,
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

  return (
    <div>
      <Row className="search-fox">
        <Col className="mb-2">
          <FormGroup>
            <Autocomplete
              apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
              className={error.location ? 'danger-border' : ''}
              onPlaceSelected={(place) => {
                onPlaceSelected(place)
                setIsSet(true)
              }}
              options={{
                types: ['(regions)'],
              }}
              onChange={(e) => {
                setLocation({ ...location, name: e.target.value })
              }}
              value={location.name}
            />
          </FormGroup>
          <div
            className={classnames(
              'invalid-feedback ',
              error.location ? 'd-block' : '',
            )}
          >
            {error.location}
          </div>
        </Col>
      </Row>
    </div>
  )
}

AutoCompleteForm.propTypes = {
  setLocation: PropTypes.func,
  error: PropTypes.object,
  mapRef: PropTypes.object,
}

export default AutoCompleteForm
