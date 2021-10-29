/* eslint-disable */

import React from 'react'
import '../App.scss'
import {
  Col,
  Row,
  Form,
  FormGroup,
} from 'reactstrap'
import Autocomplete from 'react-google-autocomplete'

import { placeMarker } from './mapBase'

// https://www.npmjs.com/package/react-google-autocomplete




const AutoCompleteForm = ({ mapRef }) => {

  const onPlaceSelected = (place) => {
    console.log(place)
    if (mapRef && mapRef.current) {
      // lat = place.geometry.location.lat(),
      placeMarker(place.geometry.location, mapRef.current.map_, place.formatted_address)
    }
  }

  return (<Col md="7">
    <Row className="search-header">
      <h1>Header</h1>
    </Row>
    <Row className="search-box">
      <Form>
        <FormGroup>
          <Autocomplete
            apiKey="AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY"
            style={{ width: '90%' }}
            onPlaceSelected={(place) => {
              onPlaceSelected(place)
            }}
            options={{
              types: ['(regions)'],
              componentRestrictions: { country: 'gb' },
            }}
            defaultValue="London"

          />
        </FormGroup>
      </Form>
    </Row>
  </Col>)
}


export default AutoCompleteForm
