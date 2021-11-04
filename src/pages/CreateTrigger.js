
import React, { useRef, useState } from 'react'

import { Button, Col, Row } from 'reactstrap'

import MyMapComponent from '../components/GoogleMapCreate'
import SearchBox from '../components/SearchBox'
import Condition from '../components/Condition'
import TriggerName from '../components/TriggerName'
import PriorNotifs from '../components/PriorNotifications'
import EmailNotifs from '../components/EmailNotifcation'
import classnames from 'classnames'

const CreateTrigger = () => {
  const mapRef = useRef(null)

  const [location, setLocation] = useState({
    name: '',
    lat: '',
    lon: '',
  })
  const [name, setName] = useState('')

  const [condition, setCondition] = useState({
    variable: 'temp',
    condition: '<',
    value: 0,
    units: 'metric',
  })

  const [days, setDays] = useState(0)

  const [recipients, setRecipients] = useState([])

  const [error, setError] = useState('')

  const noBlankErrorMessage = 'Cannot be blank'


  
  const createTrigger = () => {

    const data = {
      location,
      condition,
      days,
      name, 
      recipients,
      status: true,
      user_id: null
    }

    console.log(data)

    setError({})

    if (location) {
      setError({
        location: noBlankErrorMessage,
      })
    }

    const newError = {}

    if (Object.keys(newError).length) {
      setError(newError) 
    }

  }

  const handleChange = (key, value) => {
    const newLocation = { ...location }
    newLocation[key] = value
    setLocation(newLocation)
  }



  return (
    <>
      <Row>
        <Col md="7">
          <div className="pt-5 pb-5">
            {/*<div className="my-5">*/}
            {/*<h4>Location in state</h4>*/}
            {/*<p><b>Name: </b>{location.name}</p>*/}
            {/*<p><b>Lat: </b>{location.lat}</p>*/}
            {/*<p><b>Lon: </b>{location.lon}</p>*/}
            {/*</div>*/}
            <TriggerName name={name} setName={setName} location={location} />
            <SearchBox
              mapRef={mapRef}
              location={location}
              setLocation={setLocation}
              onChange={(e) => handleChange('location', e.target.value)}
              className={error.location ? 'danger-border' : ''}
            />
                       <div
          className={classnames(
            'invalid-feedback ',
            error.location ? 'd-block' : '',
          )}
        >
          {error.location}
        </div>
            <Condition condition={condition} setCondition={setCondition} />
            <PriorNotifs days={days} setDays={setDays} />
            <EmailNotifs recipients={recipients} setRecipients={setRecipients}/>
            <Row className="search-box">
        <Col md="8">
        </Col>
        <Col md="2">
       <Button>
           Cancel
       </Button>
          </Col>
          <Col md="2">
       <Button 
       className="btn-primary"
       onclick={createTrigger}>
           Create
       </Button>
          </Col>

      </Row>
          </div>
        </Col>
        <Col md="5">
          <MyMapComponent
            mapRef={mapRef}
            location={location}
            setLocation={setLocation}
          />
        </Col>
      </Row>
    </>
  )
}

export default CreateTrigger
