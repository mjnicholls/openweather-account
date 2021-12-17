import React, { useState } from 'react'

import classNames from 'classnames/index'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'

import AutoCompleteForm from './AutoCompleteForm'
import CoordinatesSearch from './CoordinatesSearch'

import '../App.scss'

const SearchBox = ({
  mapRef,
  location,
  setLocation,
  error,
  name,
  setName,
  isName,
  setIsName,
  isSet,
  setIsSet,
}) => {
  const [activeTab, setActiveTab] = useState('location')

  return (
    <div className="mt-3">
      <h6 className="">
        {' '}
        Search location by {activeTab === 'location' ? 'name' : 'coordinates'}
      </h6>
      {activeTab === 'location' ? (
        <AutoCompleteForm
          mapRef={mapRef}
          setLocation={setLocation}
          error={error}
          location={location}
          setIsName={setIsName}
          isName={isName}
          name={name}
          setName={setName}
          isSet={isSet}
          setIsSet={setIsSet}
        />
      ) : (
        <CoordinatesSearch
          mapRef={mapRef}
          setLocation={setLocation}
          location={location}
          name={name}
          setName={setName}
          isSet={isSet}
          setIsSet={setIsSet}
        />
      )}
      <Row className="mt-3 text-end">
        <Col className="text-end">
          <Button
            className={`shadow-none ${
              activeTab === 'location' ? 'button-active' : 'button-neutral'
            }`}
            onClick={() => setActiveTab('location')}
            aria-pressed="true"
          >
            <span>Location</span>
          </Button>
          <Button
            className={`shadow-none ${
              activeTab === 'location' ? 'button-neutral' : 'button-active'
            }`}
            onClick={() => setActiveTab('coordinates')}
            aria-pressed="true"
          >
            <span>Coordinates</span>
          </Button>
        </Col>
      </Row>
    </div>
  )
}

SearchBox.propTypes = {
  location: PropTypes.object,
  setLocation: PropTypes.func,
  mapRef: PropTypes.object,
  error: PropTypes.object,
  name: PropTypes.string,
  setName: PropTypes.bool,
  isName: PropTypes.object,
  setIsName: PropTypes.bool,
  isSet: PropTypes.bool,
  setIsSet: PropTypes.func,
}

export default SearchBox
