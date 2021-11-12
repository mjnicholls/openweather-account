import React, { useState } from 'react'

import { Button, Col, Row } from 'reactstrap'

import CoordinatesSearch from './CoordinatesSearch'
import AutoCompleteForm from './AutoCompleteForm'
import '../App.scss'
import classNames from 'classnames/index'

const SearchBox = ({ mapRef, location, setLocation, error }) => {
  const [activeTab, setActiveTab] = useState('location')
  // only logic and html for coordinates search
  return (
    <>
      <Row className="search-box">
        <Col>
          {activeTab === 'location' ? (
            <AutoCompleteForm
              mapRef={mapRef}
              setLocation={setLocation}
              error={error}
            />
          ) : (
            <CoordinatesSearch
              mapRef={mapRef}
              setLocation={setLocation}
              location={location}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col className="text-end move-up">
          <Button
            size="sm"
            className={classNames('button-neutral', {
              active: activeTab === 'location',
            })}
            onClick={() => setActiveTab('location')}
            aria-pressed="true"
          >
            <span>Location</span>
          </Button>
          <Button
            size="sm"
            className={classNames('button-active', {
              active: activeTab === 'coordinates',
            })}
            onClick={() => setActiveTab('coordinates')}
            aria-pressed="true"
          >
            <span>Coordinates</span>
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default SearchBox
