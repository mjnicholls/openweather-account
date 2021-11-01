/* eslint-disable */

import React from 'react'
import '../App.scss'
import { Button, Col, Row, Form, FormGroup, Label } from 'reactstrap'
import Autocomplete from 'react-google-autocomplete'

import placeMarker from './placeMarker'

// https://www.npmjs.com/package/react-google-autocomplete

const AutoCompleteForm = ({ mapRef }) => {
  const onPlaceSelected = (place) => {
    console.log(place)
    if (mapRef && mapRef.current) {
      //const lat = place.geometry.location.lat();
      // const lng = place.geometry.location.lng();
      placeMarker(
        place.geometry.location,
        mapRef.current.map_,
        place.formatted_address,
      )
    }
  }

  const onLocationSelected = (place) => {
    console.log(place)
    if (mapRef && mapRef.current) {
      //const lat = place.geometry.location.lat();
      // const lng = place.geometry.location.lng();
      placeMarker(
        place.geometry.location,
        mapRef.current.map_,
        place.formatted_address,
      )
    }
  }

  return (
    <Col md="7">
      <Row className="search-header">
        <h1 className="head">Triggers</h1>
      </Row>
      <Row className="search-box">
        <Form>
          <FormGroup>
            <Label>Trigger location</Label>
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
              defaultValue="London"
            />
          </FormGroup>
          <FormGroup>
            <Label>Trigger coordinates</Label>

            {/* TODO check why fields data is not being sent
     //TODO create conditional for 2 buttons*/}
            <Autocomplete
              apiKey="AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY"
              style={{ width: '80%' }}
              onLocationSelected={(place) => {
                onLocationSelected(place)
              }}
              options={{
                fields: ['geometry.location'],
                componentRestrictions: { location: 'gb' },
              }}
              defaultValue="9, 9"
            />
          </FormGroup>
          <FormGroup>
            <Label>Trigger options</Label>
            <Button>By location</Button>
            <Button>By coordinates</Button>
          </FormGroup>
        </Form>
      </Row>
    </Col>
  )
}

export default AutoCompleteForm
