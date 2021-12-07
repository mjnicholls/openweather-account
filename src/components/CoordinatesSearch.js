import React, { useState } from 'react'

import '../App.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Col, Row, FormGroup, Button, Input } from 'reactstrap'

import { noBlankErrorMessage } from '../config'
import placeMarker from './placeMarker'

const CoordinatesSearch = ({ mapRef, location, setLocation, setIsSet }) => {
  const [lat, setLat] = useState(location.lat)

  const [lng, setLng] = useState(location.lon)

  const [error, setError] = useState({})

  const latRangeError = 'Value cannot be below -90 or above 90'
  const lngRangeError = 'Value cannot be below -180 or above 180'

  const validate = () => {
    setError({})
    let newError = {}

    if (!location.lon && !location.lat) {
      newError = {
        lat: noBlankErrorMessage,
        lng: noBlankErrorMessage,
      }
    }

    if (location.lat && (location.lat < -90 || location.lat > 90)) {
      newError = {
        ...newError,
        lat: latRangeError,
      }
    }

    if (location.lon && (location.lon < -180 || location.lon > 180)) {
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

  const onSetLocationClick = () => {
    if (validate()) {
      /* eslint-disable-next-line */
      const pos = new google.maps.LatLng(location.lat, location.lon)
      if (mapRef && mapRef.current) {
        /* eslint-disable-next-line */
        placeMarker(pos, mapRef.current.map_)

        setLocation({
          lat: location.lat,
          lon: location.lon,
          name: 'Custom location',
        })
        setIsSet(true)
      }
    }
  }

  return (
    <>
      <Row className="mt-3">
        <Col className="mb-2">
          <h6>Search location by coordinates</h6>
        </Col>
      </Row>

      <Row className="search-fox">
        <Col md="1">Lat</Col>
        <Col md="4">
          <Input
            type="number"
            className={error.lat ? 'danger-border' : ''}
            value={location.lat}
            onChange={(e) => {
              setLocation({ ...location, lat: parseFloat(e.target.value) })
            }}
          />

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
        <Col md="4">
          <FormGroup>
            <Input
              type="number"
              className={error.lng ? 'danger-border' : ''}
              value={location.lon}
              onChange={(e) => {
                setLocation({ ...location, lon: parseFloat(e.target.value) })
              }}
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
        <Col md="1">
          <Button
            className="button-active shadow-none"
            onClick={onSetLocationClick}
          >
            Set
          </Button>
        </Col>
      </Row>
    </>
  )
}

CoordinatesSearch.propTypes = {
  location: PropTypes.object,
  setLocation: PropTypes.func,
  mapRef: PropTypes.func,
}

export default CoordinatesSearch
