import React, { useRef, useState } from 'react'

import { Col, Row } from 'reactstrap'

import AutoCompleteForm from '../components/AutoCompleteForm'
import MyMapComponent from '../components/GoogleMapCreate'
import SearchBox from '../components/SearchBox'

const CreateTrigger = () => {

  const mapRef = useRef(null)

  const [location, setLocation] = useState({
    name: '',
    lat: 0,
    lon: 0,
  })
  const [condition, setCondition] = useState({})

  return (
    <>
      <Row>
        <Col md="7">
          <div className="pt-5">

            <div className="my-5">
              <h4>Location in state</h4>
              <p><b>Name: </b>{location.name}</p>
              <p><b>Lat: </b>{location.lat}</p>
              <p><b>Lon: </b>{location.lon}</p>
            </div>
            <SearchBox mapRef={mapRef} setLocation={setLocation} />
            {/*<AutoCompleteForm mapRef={mapRef} setLocation={setLocation}/>*/}
          </div>
        </Col>
        <Col md="5">
          <MyMapComponent mapRef={mapRef} location={location} setLocation={setLocation}/>
        </Col>
      </Row>
    </>
  )
}

export default CreateTrigger
