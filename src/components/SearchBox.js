import React, { useState } from 'react'

import { Button, Col, Row } from 'reactstrap'

import AutoCompleteForm from './AutoCompleteForm'
import CoordinatesSearch from './CoordinatesSearch'

import '../App.scss'
import classNames from 'classnames/index'

const SearchBox = ({ mapRef, location, setLocation, error }) => {
  const [activeTab, setActiveTab] = useState('location')
  // only logic and html for coordinates search
  return (
    <>
      {activeTab === 'location' ? (
        <Row className="search-box">
          <Col>
            <AutoCompleteForm
              mapRef={mapRef}
              setLocation={setLocation}
              error={error}
            />
          </Col>
          <Row className="mt-3 text-end">
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
<<<<<<< HEAD
               <Row className="mt-3 text-end">
               <Col className="text-end move-up">
                 <Button
                   size="sm"
                   className={classNames('button-active', {
                     active: activeTab === 'location',
                   })}
                   onClick={() => setActiveTab('location')}
                   aria-pressed="true"
                 >
                   <span>Location</span>
                 </Button>
                 <Button
                   size="sm"
                   className={classNames('button-neutral', {
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
            <Row className="search-box">
            <Col>
=======
          </Row>
        </Row>
      ) : (
        <Row className="search-box">
          <Col>
>>>>>>> cbd9a34d95fb6c43d11ab1ed2ca5035a3a18278f
            <CoordinatesSearch
              mapRef={mapRef}
              setLocation={setLocation}
              location={location}
            />
          </Col>
          <Row className="mt-3 text-end">
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
        </Row>
      )}
    </>
  )
}

export default SearchBox
