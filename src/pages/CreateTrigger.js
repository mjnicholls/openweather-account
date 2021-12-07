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

import { noBlankErrorMessage } from '../config'

const selectUserId = (state) => state.auth.user_id

const selectTariff = (state) => state.auth.tariff

const CreateTrigger = () => {
  const mapRef = useRef(null)
  const userId = useSelector(selectUserId)

  const myTariff = useSelector(selectTariff)

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

  const [isSet, setIsSet] = useState(false)

  // const [isName, setIsName] = useState(location.name)

  const [whoops, setWhoops] = useState('')

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
        if (err.response) {
          console.log(err.response.data.message)
          setWhoops(err.response.data.message)
          htmlError()
        }
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
        <p>
          Something went wrong on our end. Please make note of the error message
          below and contact us:
        </p>
        <p style={{ color: 'red' }}>{JSON.stringify(whoops).slice(1, -1)}</p>
        <br />
        <Col className="text-end">
          <Button className="button-active shadow-none">Contact</Button>
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
          <Button className="button-active shadow-none">
            To Subscription Plans
          </Button>
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
          <SearchBox
            mapRef={mapRef}
            location={location}
            setLocation={setLocation}
            onChange={(e) => handleChange('location', e.target.value)}
            error={error}
            name={name}
            isSet={isSet}
            setIsSet={setIsSet}
          />
          {isSet ? (
            <TriggerName
              name={name}
              setName={setName}
              location={location}
              error={error}
              isSet={isSet}
              setIsSet={setIsSet}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          ) : null}
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
              <Button
                className="button-neutral shadow-none"
                onClick={goToPreviousPath}
              >
                Cancel
              </Button>
              {(() => {
                switch (myTariff) {
                  case 'free':
                    return data.length >= 3 ? (
                      <Button
                        className="button-active shadow-none"
                        onClick={tariffError}
                      >
                        Create new trigger
                      </Button>
                    ) : (
                      <Button className="button-active shadow-none">
                        {' '}
                        Create trigger
                      </Button>
                    )
                  case 'startup':
                    return data.length >= 5 ? (
                      <Button
                        className="button-active shadow-none"
                        onClick={tariffError}
                      >
                        Create new trigger
                      </Button>
                    ) : (
                      <Button
                        className="button-active shadow-none"
                        onClick={createTrigger}
                      >
                        Create trigger
                      </Button>
                    )
                  case 'developer':
                    return data.length >= 7 ? (
                      <Button
                        className="button-active shadow-none"
                        onClick={tariffError}
                      >
                        Create new trigger
                      </Button>
                    ) : (
                      <Button
                        className="button-active shadow-none"
                        onClick={createTrigger}
                      >
                        Create trigger
                      </Button>
                    )
                  case 'professional':
                    return data.length >= 9 ? (
                      <Button
                        className="button-active shadow-none"
                        onClick={tariffError}
                      >
                        Create new trigger
                      </Button>
                    ) : (
                      <Button
                        className="button-active shadow-none"
                        onClick={createTrigger}
                      >
                        Create trigger
                      </Button>
                    )
                  case 'enterprise':
                    return data.length >= 15 ? (
                      <Button
                        className="button-active shadow-none"
                        onClick={tariffError}
                      >
                        Create new trigger
                      </Button>
                    ) : (
                      <Button
                        className="button-active shadow-none"
                        onClick={createTrigger}
                      >
                        Create trigger
                      </Button>
                    )
                  default:
                    return (
                      <Button
                        className="button-active shadow-none"
                        onClick={createTrigger}
                      >
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
          setIsSet={setIsSet}
        />
      </Col>
    </Row>
  )
}

export default CreateTrigger
