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
              isSet={isSet}
              setIsSet={setIsSet}
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
              isSet={isSet}
              setIsSet={setIsSet}
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
