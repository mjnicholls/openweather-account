/* eslint-disable */

import React, { useState } from 'react'
import '../App.scss'
import { Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import Autocomplete from 'react-google-autocomplete'
import TabsSelector from './TabsSelector'
import placeMarker from './placeMarker'


// https://www.npmjs.com/package/react-google-autocomplete

const AutoCompleteForm = ({ mapRef }) => {
  
  const tabsOptions = [
    { id: 'location', label: 'Location' },
    { id: 'coordinates', label: 'Coordinates' },
  ]

  const [activeTab, setActiveTab] = useState(tabsOptions[0])
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState({})
  const noBlankErrorMessage = "Cannot be blank"


 // Search by Coordinates

 const checkCoordinates = () => {

  setError({})
  
  if (!lng && !lat & !name) {
    setError({
      name: noBlankErrorMessage,
      lat: noBlankErrorMessage,
      lng: noBlankErrorMessage,
    })
    return
  }
}


const onPlaceSelected = (place) => {
  console.log(place)
  if (mapRef && mapRef.current) {
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
        <h1 className="head">Triggers:</h1>
      </Row>

      {activeTab.id === 'location' ? (
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
                defaultValue=""
                className={error.name ? 'danger-border' : ''}
                
              />
            </FormGroup>
          </Form>
        </Row>
      ) : (


        <Row className="search-box">
          <Col>
            <Label>Trigger location</Label>
          </Col>
          <Col>
         
            <FormGroup>
            <Label>Lat</Label>
              <Input type="text"
              className={error.lat ? 'danger-border' : ''}
              />
            </FormGroup>
          </Col>
          <Col>
            <Label>Lng</Label>
            <FormGroup>
              <Input
                type="text"
                value=""
                className={error.lng ? 'danger-border' : ''}
                
              />
            </FormGroup>
  
          </Col>
        </Row>
   )}
      
     
      
      <Row className="search-box">
    
        <Col>
          <TabsSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={tabsOptions}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default AutoCompleteForm
