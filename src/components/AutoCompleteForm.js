import React from 'react'

import '../App.scss'
import classnames from 'classnames/index'
import Autocomplete from 'react-google-autocomplete'
import { Col, Row, FormGroup, Label } from 'reactstrap'

import placeMarker from './placeMarker'

const AutoCompleteForm = ({ mapRef, setLocation, error }) => {
  const onPlaceSelected = (place) => {
    if (mapRef && mapRef.current) {
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
      <Row>
        <Col md="3">
          <Label>Trigger location</Label>
        </Col>
        <Col md="9">
          <FormGroup>
            <Autocomplete
              apiKey="AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY"
              className={error.name ? 'danger-border' : ''}
              style={{ width: '100%' }}
              onPlaceSelected={(place) => {
                onPlaceSelected(place)
              }}
              options={{
                types: ['(regions)'],
              }}
              defaultValue=""
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

export default AutoCompleteForm
