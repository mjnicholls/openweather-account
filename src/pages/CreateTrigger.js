import React, { useEffect, useRef, useState } from 'react'

import { Col, Row } from 'reactstrap'

import MyMapComponent from '../components/GoogleMapCreate'
import SearchBox from '../components/SearchBox'
import Condition from '../components/Condition'

const CreateTrigger = () => {

  const mapRef = useRef(null)

  const [location, setLocation] = useState({
    name: '',
    lat: 0,
    lon: 0,
  })
  const [name, setName] = useState('')
  const [isNameEdited, setIsNameEdited] = useState(false)
  const [condition, setCondition] = useState({
    variable: 'temp',
    condition: '<',
    value: 0,
    units: 'metric'
  })




  const onNameChange = (e) => {
    setIsNameEdited(true)
    setName(e.target.value)
  }


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
            <input
              value={name}
              onChange={onNameChange}
            />
            <SearchBox mapRef={mapRef} setLocation={setLocation} />
            {/*<AutoCompleteForm mapRef={mapRef} setLocation={setLocation}/>*/}
            <Condition condition={condition} setCondition={setCondition} />
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
