import React, { useRef, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

import { postTrigger, getTriggers } from '../api/api'
import Condition from '../components/Condition'
import CreateTriggerCard from '../components/CreateTriggerCard'
import EmailNotifs from '../components/EmailNotifcation'
import GoogleMapCreate from '../components/GoogleMapCreate'
import PriorNotifs from '../components/PriorNotifications'
import SearchBox from '../components/SearchBox'
import TriggerName from '../components/TriggerName'
import '../App.scss'

import ReactBSAlert from 'react-bootstrap-sweetalert'

import { noBlankErrorMessage, tariff } from '../config'

const selectUserId = (state) => state.auth.user_id

const CreateTrigger = () => {
  const mapRef = useRef(null)
  const userId = useSelector(selectUserId)

  const myTariff = tariff.enterprise

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
      user_id: userId,
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
        htmlError()
      })
  }

  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Trigger Created!"
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

  const htmlError = () => {
    setAlert(
      <ReactBSAlert
        title="Whoops!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <br />
        <p>Something went wrong. Please contact us for help:</p>
        <br />
        <Col className="text-end">
          <Button className="button-active">Contact</Button>
        </Col>
      </ReactBSAlert>,
    )
  }

  const tariffError = () => {
    setAlert(
      <ReactBSAlert
        title="Sorry!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <br />
        <p>
          You have reached the maximum number of triggers available with your
          subscription plan.
        </p>
        <br />
        <Col className="text-end">
          <Button className="button-active">To Subscription Plans</Button>
        </Col>
      </ReactBSAlert>,
    )
  }

  const [data, setData] = useState([])

  useEffect(() => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
        console.log('data')
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [userId])

  const handleChange = (key, value) => {
    const newLocation = { ...location }
    newLocation[key] = value
    setLocation(newLocation)
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
          {myTariff === 'free' ? (
            <Row></Row>
          ) : (
            <EmailNotifs
              recipients={recipients}
              setRecipients={setRecipients}
            />
          )}
          <Row className="mt-4">
            <Col className="text-end">
              <Button className="button-neutral" onClick={goToPreviousPath}>
                Cancel
              </Button>
              {(() => {
                switch (myTariff) {
                  case 'free':
                    return data.length >= 3 ? (
                      <Button className="button-active" onClick={tariffError}>
                        Create new trigger
                      </Button>
                    ) : (
                      <Button className="button-active"> Create trigger</Button>
                    )
                  case 'startup':
                    return data.length >= 5 ? (
                      <Button className="button-active" onClick={tariffError}>
                        Create new trigger
                      </Button>
                    ) : (
                      <Button className="button-active" onClick={createTrigger}>
                        Create trigger
                      </Button>
                    )
                  case 'developer':
                    return data.length >= 7 ? (
                      <Button className="button-active" onClick={tariffError}>
                        Create new trigger
                      </Button>
                    ) : (
                      <Button className="button-active" onClick={createTrigger}>
                        Create trigger
                      </Button>
                    )
                  case 'professional':
                    return data.length >= 9 ? (
                      <Button className="button-active" onClick={tariffError}>
                        Create new trigger
                      </Button>
                    ) : (
                      <Button className="button-active" onClick={createTrigger}>
                        Create trigger
                      </Button>
                    )
                  case 'enterprise':
                    return data.length >= 15 ? (
                      <Button className="button-active" onClick={tariffError}>
                        Create new trigger
                      </Button>
                    ) : (
                      <Button className="button-active" onClick={createTrigger}>
                        Create trigger
                      </Button>
                    )
                  default:
                    return (
                      <Button className="button-active" onClick={createTrigger}>
                        Create trigger
                      </Button>
                    )
                }
              })()}
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
