import React, { useState } from 'react'

import { Button, Col, Row, Input } from 'reactstrap'

import AutoCompleteForm from './AutoCompleteForm'
import CoordinatesSearch from './CoordinatesSearch'

import '../App.scss'
import classNames from 'classnames/index'
import PropTypes from 'prop-types'

const SearchBox = ({
  mapRef,
  location,
  setLocation,
  error,
  name,
  setName,
  isName,
  setIsName,
}) => {
  const [activeTab, setActiveTab] = useState('location')

  return (
    <>
      {activeTab === 'location' ? (
        <Row className="search-fox">
          <Col>
            <AutoCompleteForm
              mapRef={mapRef}
              setLocation={setLocation}
              error={error}
              location={location}
              setIsName={setIsName}
              isName={isName}
              name={name}
              setName={setName}
            />
          </Col>
          <Row className="mt-1 text-end">
            <Col className="text-end">
              <Button
                size="sm"
                className={classNames('button-active shadow-none', {
                  active: activeTab === 'location',
                })}
                onClick={() => setActiveTab('location')}
                aria-pressed="true"
              >
                <span>Location</span>
              </Button>
              <Button
                size="sm"
                className={classNames('button-neutral shadow-none', {
                  active: activeTab === 'coordinates',
                })}
                onClick={() => setActiveTab('coordinates')}
                aria-pressed="true"
              >
                <span>Coordinates</span>
              </Button>
            </Col>
          </Row>
        </Row>
      ) : (
        <Row className="search-fox">
          <Col>
            <CoordinatesSearch
              mapRef={mapRef}
              setLocation={setLocation}
              location={location}
              name={name}
              setName={setName}
            />
          </Col>
          <Row className="mt-3 text-end">
            <Col className="text-end">
              <Button
                size="sm"
                className={classNames('button-neutral shadow-none', {
                  active: activeTab === 'location',
                })}
                onClick={() => setActiveTab('location')}
                aria-pressed="true"
              >
                <span>Location</span>
              </Button>
              <Button
                size="sm"
                className={classNames('button-active shadow-none', {
                  active: activeTab === 'coordinates',
                })}
                onClick={() => setActiveTab('coordinates')}
                aria-pressed="true"
              >
                <span>Coordinates</span>
              </Button>
            </Col>
          </Row>
        </Row>
      )}
    </>
  )
}

SearchBox.propTypes = {
  location: PropTypes.string,
  setLocation: PropTypes.func,
  mapRef: PropTypes.string,
  error: PropTypes.func,
}

export default SearchBox
