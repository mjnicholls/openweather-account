/* eslint-disable */
import React, { useState } from 'react'

import { Col, Row } from 'reactstrap'

import CoordinatesSearch from './CoordinatesSeacrh'
import AutoCompleteForm from './AutoCompleteForm'
import TabsSelector from './TabsSelector'

const tabsOptions = [
    { id: 'location', label: 'Location' },
    { id: 'coordinates', label: 'Coordinates' },
  ]


const SearchBox = ({mapRef, setLocation}) => {

  const [activeTab, setActiveTab] = useState(tabsOptions[0])
  // only logic and html for coordinates search
  return <>
    <Row className="search-box">
      { activeTab.id === 'location' ?
        <AutoCompleteForm mapRef={mapRef} setLocation={setLocation}/> :
        <CoordinatesSearch mapRef={mapRef} setLocation={setLocation}/>
      }
        <Col>
          <TabsSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={tabsOptions}
            className="tabs"
          />
        </Col>
      </Row>
  </>
}

export default SearchBox