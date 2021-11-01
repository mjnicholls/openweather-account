/* eslint-disable */

import React, { useState } from 'react'
import '../App.scss'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import Autocomplete from 'react-google-autocomplete'
import TabsSelector from './TabsSelector'
import placeMarker from './placeMarker'
import classnames from 'classnames'


// https://www.npmjs.com/package/react-google-autocomplete

const AutoCompleteForm = ({ mapRef }) => {
  
  const tabsOptions = [
    { id: 'location', label: 'Location' },
    { id: 'coordinates', label: 'Coordinates' },
  ]

  const [activeTab, setActiveTab] = useState(tabsOptions[0])
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [name, setName] = useState('')
  const [error, setError] = useState({})
  const noBlankErrorMessage = "Cannot be blank"
  const latRangeError = "Value cannot be below -90 or above 90"
  const lngRangeError = "Value cannot be below -180 or above 180"

 // Search by Coordinates



  const onKeyDownFunc = (e) => {
    if (e.keyCode === 13) {

      let pos = new google.maps.LatLng(lat, lng);
      console.log("pos", pos)
      if (mapRef && mapRef.current) {
        placeMarker(pos, mapRef.current.map_)
      }
      // enter == submit
    } else {
      setLng(e.target.value)
    }

    
  setError({})
  
  if (!lng && !lat) {
    setError({
      lat: noBlankErrorMessage,
      lng: noBlankErrorMessage,
    })
    return
  }

  if (name) {
    setError({
      name: noBlankErrorMessage,
    })
    return
  }

  if (lat < -90) {
    setError({
      lat: latRangeError,
    })
    return
  }

  if (lat > 90) {
    setError({
      lat: latRangeError,
    })
    return
  }

  if (lng < -180) {
    setError({
      lng: lngRangeError,
    })
    return
  }

  if (lng > 180) {
    setError({
      lng: lngRangeError,
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
        <h1 className="head">Triggers</h1>
      </Row>

      {activeTab.id === 'location' ? (
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
      ) : (


        <Row className="search-box">
            <Col md="4">
            <Label>Trigger coordinates</Label>
          </Col>
          
          <Col md="1">Lat</Col>
          <Col md="3">
            <FormGroup>
       
              <Input type="number"
                className={error.lat ? 'danger-border' : ''}
                     value={lat}
                     onChange={e => {setLat(e.target.value)}}
              />
            </FormGroup>

            <div
              className={classnames(
                'invalid-feedback ',
                error.lat ? 'd-block' : '',
              )}
            >
              {error.lat}
            </div>
          </Col>
          <Col md="1">Lng</Col>
          <Col md="3">
            <FormGroup>
              <Input
                type="number"
                className={error.lng ? 'danger-border' : ''}
                value={lng}
                onChange={e => {setLng(e.target.value)}}
                onKeyDown={e => {onKeyDownFunc(e)}}
    
              />
            </FormGroup>

            <div
              className={classnames(
                'invalid-feedback ',
                error.lng ? 'd-block' : '',
              )}
            >
              {error.lng}
            </div>

  
          </Col>
        </Row>
   )}
      
     
      
      <Row className="search-box">
    
        <Col>
          <TabsSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={tabsOptions}
            className="tabs"
          />
        </Col>
      </Row>
    </Col>
  )
}

export default AutoCompleteForm
