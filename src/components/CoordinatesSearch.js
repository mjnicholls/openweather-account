import React, { useState } from 'react'
import '../App.scss'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import placeMarker from './placeMarker'
import classnames from 'classnames'

const CoordinatesSearch = ({ mapRef, location, setLocation }) => {
  const [lat, setLat] = useState(location.lat)
  const [lng, setLng] = useState(location.lon)
  const [error, setError] = useState({})
  const noBlankErrorMessage = 'Cannot be blank'
  const latRangeError = 'Value cannot be below -90 or above 90'
  const lngRangeError = 'Value cannot be below -180 or above 180'

  const validate = () => {
    setError({})
    let newError = {}

    if (!lng && !lat) {
      newError = {
        lat: noBlankErrorMessage,
        lng: noBlankErrorMessage,
      }
    }

    // if (lat && typeof lat !== "number") {
    //   newError = {
    //     lat: notANumberError,
    //     ...newError,
    //
    //   }
    // }
    // if (lng && typeof lng !== "number") {
    //   newError = {
    //     lng: notANumberError,
    //     ...newError,
    //   }
    // }

    if (lat && (lat < -90 || lat > 90)) {
      newError = {
        ...newError,
        lat: latRangeError,
      }
    }

    if (lng && (lng < -180 || lng > 180)) {
      newError = {
        ...newError,
        lng: lngRangeError,
      }
    }
    if (Object.keys(newError).length) {
      setError(newError)
      return false
    }

    return true
  }

  const submit = () => {
    if (validate()) {
      /* eslint-disable-next-line */
      const pos = new google.maps.LatLng(lat, lng)
      if (mapRef && mapRef.current) {
        /* eslint-disable-next-line */
        placeMarker(pos, mapRef.current.map_)
        setLocation({
          name: 'Custom Location',
          lat: parseFloat(lat),
          lon: parseFloat(lng),
        })
      }
    }
  }

  const onKeyDownLon = (e) => {
    if (e.keyCode === 13) {
      submit()
    } else {
      setLng(e.target.value)
    }
  }

  const onKeyDownLat = (e) => {
    if (e.keyCode === 13) {
      if (lng) {
        submit()
      }
    }
  }

  return (
    <Row>
      <Col md="3">
        <Label>Trigger coordinates</Label>
      </Col>

      <Col md="1">Lat</Col>
      <Col md="3">
        <FormGroup>
          <Input
            type="number"
            className={error.lat ? 'danger-border' : ''}
            value={lat}
            onChange={(e) => {
              setLat(e.target.value)
            }}
            onKeyDown={onKeyDownLat}
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
            onChange={(e) => {
              setLng(e.target.value)
            }}
            onKeyDown={onKeyDownLon}
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
