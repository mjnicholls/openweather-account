/* eslint-disable */

import React, { useState } from 'react'
import '../App.scss'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import Autocomplete from 'react-google-autocomplete'
import placeMarker from './placeMarker'
import classnames from 'classnames'


const AutoCompleteForm = ({ mapRef, setLocation }) => {
  

  const [name, setName] = useState('')
  const [error, setError] = useState({})
  const noBlankErrorMessage = "Cannot be blank"


const onPlaceSelected = (place) => {
  if (mapRef && mapRef.current) {

    setLocation({
        name: place.formatted_address,
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng()
      })

    placeMarker(
      place.geometry.location,
      mapRef.current.map_,
      place.formatted_address,
    )
  }

  setError({})

  if (name) {
    setError({
      name: noBlankErrorMessage,
    })
    return
  }
}

  return (
   <div>
        <Row className="search-box">
            <Col md="4">
            <Label>Trigger location</Label>
          </Col>
          <Col md="8">
            <FormGroup>

              <Autocomplete
                apiKey="AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY"
                style={{ width: '80%' }}
                onPlaceSelected={(place) => {
                  onPlaceSelected(place)
                }}
                options={{
                  types: ['(regions)'],
                  componentRestrictions: { country: 'gb' },
                }}
                defaultValue=""
                className={error.name ? 'danger-border' : ''}

              />
            </FormGroup>

            <div
              className={classnames(
                'invalid-feedback ',
                error.name ? 'd-block' : '',
              )}
            >
              {error.name}
            </div>
            </Col>


        </Row>

     </div>
  )

}

export default AutoCompleteForm
