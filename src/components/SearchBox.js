import React, { useState } from 'react'

import { Col, Row } from 'reactstrap'

import CoordinatesSearch from './CoordinatesSearch'
import AutoCompleteForm from './AutoCompleteForm'
import TabsSelector from './TabsSelector'
import '../App.scss'

const tabsOptions = [
  { id: 'location', label: 'Location' },
  { id: 'coordinates', label: 'Coordinates' },
]

const SearchBox = ({ mapRef, location, setLocation, error }) => {
  const [activeTab, setActiveTab] = useState(tabsOptions[0])
  // only logic and html for coordinates search
  return (
    <>
      <Row className="search-box">
        {activeTab.id === 'location' ? (
          <AutoCompleteForm mapRef={mapRef} setLocation={setLocation} error={error} />
        ) : (
          <CoordinatesSearch
            mapRef={mapRef}
            setLocation={setLocation}
            location={location}
          />
        )}
        <Col md="3"></Col>
        <Col md="5">
          <TabsSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={tabsOptions}
          />
        </Col>
      </Row>
    </>
  )
}

export default SearchBox
