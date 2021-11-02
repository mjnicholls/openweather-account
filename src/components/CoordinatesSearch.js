/* eslint-disable */
import React, { useState } from 'react'
import '../App.scss'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import placeMarker from './placeMarker'
import classnames from 'classnames'


const CoordinatesSearch = ({ mapRef, setLocation }) => {

  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [error, setError] = useState({})
  const noBlankErrorMessage = "Cannot be blank"
  const latRangeError = "Value cannot be below -90 or above 90"
  const lngRangeError = "Value cannot be below -180 or above 180"


   const onKeyDownFunc = (e) => {
    if (e.keyCode === 13) {
      // TODO run checks before placing marker
      let pos = new google.maps.LatLng(lat, lng);
      if (mapRef && mapRef.current) {
        placeMarker(pos, mapRef.current.map_)
      }
      setLocation({
        name: "Custom Location",
        lat: parseFloat(lat),
        lon: parseFloat(lng)
      })
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

  return (
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
  
    )
}

export default CoordinatesSearch