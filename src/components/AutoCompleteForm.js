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


<<<<<<< HEAD
const AutoCompleteForm = () => (
  <Col md="7">
=======


const AutoCompleteForm = ({ mapRef }) => {

  const onPlaceSelected = (place) => {
    console.log(place)
    if (mapRef && mapRef.current) {
      placeMarker(place.geometry.location, mapRef.current.map_, place.address_components[0].long_name)
    }
  }

  return (<Col md="7">
>>>>>>> 2e10ee89cdc0f207573205e841a15f11098c26a5
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
