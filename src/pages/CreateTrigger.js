import React, { useRef, useState } from 'react'

import { Button, Col, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import GoogleMapCreate from '../components/GoogleMapCreate'
import SearchBox from '../components/SearchBox'
import Condition from '../components/Condition'
import TriggerName from '../components/TriggerName'
import PriorNotifs from '../components/PriorNotifications'
import EmailNotifs from '../components/EmailNotifcation'
import '../App.scss'
import { postTrigger } from '../api/api'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import CreateTriggerCard from '../components/CreateTriggerCard'
import { noBlankErrorMessage } from '../config'

const selectUserId = (state) => state.auth.user_id

const CreateTrigger = () => {
  const mapRef = useRef(null)
  const userId = useSelector(selectUserId)

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

  const [error, setError] = useState({})

  const history = useHistory()

  const goToPreviousPath = () => {
    history.goBack()
  }

  const createTrigger = () => {
    const data = {
      location,
      condition,
      days,
      name,
      recipients,
      status: 'on',
      user_Id: userId,
    }

    setError({})

    const newError = {}

    if (!name) {
      newError.name = noBlankErrorMessage
    }
    if (!location.lat || !location.lon || !location.name) {
      newError.location = noBlankErrorMessage
    }

    if (Object.keys(newError).length) {
      setError(newError)
      return
    }

    postTrigger(data)
      .then(() => {
        htmlAlert()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (key, value) => {
    const newLocation = { ...location }
    newLocation[key] = value
    setLocation(newLocation)
  }

  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Delete Trigger?"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <CreateTriggerCard close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  return (
    <Row>
      <Col md="7">
        {alert}
        <h2>Create Trigger</h2>
        <div className="pt-5 pb-5">
          <TriggerName
            name={name}
            setName={setName}
            location={location}
            error={error}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <SearchBox
            mapRef={mapRef}
            location={location}
            setLocation={setLocation}
            onChange={(e) => handleChange('location', e.target.value)}
            error={error}
          />
          <Condition condition={condition} setCondition={setCondition} />
          <PriorNotifs days={days} setDays={setDays} />
          <EmailNotifs recipients={recipients} setRecipients={setRecipients} />
          <Row className="search-box">
            <Col className="text-end">
              <Button className="button-neutral" onClick={goToPreviousPath}>
                Cancel
              </Button>
              <Button className="button-active" onClick={createTrigger}>
                Create trigger
              </Button>
            </Col>
          </Row>
        </div>
      </Col>
      <Col md="5">
        <GoogleMapCreate
          mapRef={mapRef}
          location={location}
          setLocation={setLocation}
        />
      </Col>
    </Row>
  )
}

export default CreateTrigger
