import React, { useRef, useState, useEffect } from 'react'

import { css } from '@emotion/react'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'
import { Button, Col, Row } from 'reactstrap'

import { postTrigger, getTriggers } from '../api/api'
import Condition from '../components/Condition'
import CreateTriggerCard from '../components/CreateTriggerCard'
import EmailNotifs from '../components/EmailNotifcation'
import GoogleMapCreate from '../components/GoogleMapCreate'
import PriorNotifs from '../components/PriorNotifications'
import SearchBox from '../components/SearchBox'
import TriggerName from '../components/TriggerName'
import TriggerNameOnly from '../components/TriggerNameOnly'
import '../App.scss'
import { noBlankErrorMessage } from '../config'

const selectUserId = (state) => state.auth.user.id

const selectLimits = (state) => state.auth.limits

const CreateTrigger = () => {
  const mapRef = useRef(null)

  const refreshPage = () => {
    window.location.reload(true)
  }

  const userId = useSelector(selectUserId)

  const myLimits = useSelector(selectLimits)

  const [isLoading, setIsLoading] = useState(true)

  const color = '#EB6E4B'

  const override = css`
    display: inline-block;
    margin: 0 auto;
    border-color: #eb6e4b;
    margin-top: 150px;
    margin-bottom: 100px;
    margin-right: 15px;
  `

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

  const [isClicked, setIsClicked] = useState(false)

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
        title="Trigger Created"
        onConfirm={() => refreshPage()}
        onCancel={() => refreshPage()}
        showConfirm={false}
        showCloseButton
        customClass="bs-alerts"
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
        customClass="bs-alerts"
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
          <Button className="button-active shadow-none" href="mailto:info@openweathermap.org">Contact</Button>
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
        customClass="bs-alerts"
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
    setIsLoading(true)
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
        console.log('data')
      })
      .catch((err) => {
        console.log('error', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  const handleChange = (key, value) => {
    const newLocation = { ...location }
    newLocation[key] = value
    setLocation(newLocation)
  }

  return (
    <>
      {isLoading ? (
        <div className="loader text-center">
          <BeatLoader
            color={color}
            loading={isLoading}
            css={override}
            size={15}
          />
        </div>
      ) : (
        <Row>
          <Col md="7">
            {alert}
            <h2>Create Trigger</h2>
            <div className="pt-5 pb-5">
            <TriggerNameOnly
                  name={name}
                  setName={setName}
                  location={location}
                  error={error}
                  isSet={isSet}
                  setIsSet={setIsSet}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
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
              {myLimits.email_recipients === false ? null : (
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

                  {data.length >= myLimits.max_triggers ? (
                    <Button
                      className="button-active shadow-none"
                      onClick={tariffError}
                    >
                      Create trigger
                    </Button>
                  ) : (
                    <Button
                      className="button-active shadow-none"
                      onClick={createTrigger}
                    >
                      Create trigger
                    </Button>
                  )}
                  {/*
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
                */}
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
              setIsClicked={setIsClicked}
              isClicked={isClicked}
            />
          </Col>
        </Row>
      )}
    </>
  )
}

export default CreateTrigger
