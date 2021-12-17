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
import LocationName from '../components/LocationName'
import PriorNotifs from '../components/PriorNotifications'
import SearchBox from '../components/SearchBox'
// import SearchBoxNew from '../components/SearchBoxNew'
import TriggerNameOnly from '../components/TriggerNameOnly'
import '../App.scss'
import { noBlankErrorMessage } from '../config'
import ErrorModal from '../components/ErrorModal'

const selectUserId = (state) => state.auth.user.id

const selectLimits = (state) => state.auth.limits

const CreateTrigger = () => {
  const mapRef = useRef(null)

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
          setWhoops(err.response.data.message)
          errorAlert()
        }
      })
  }

  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(<CreateTriggerCard close={hideAlert} />)
  }

  const errorAlert = () => {
    setAlert(
      <ErrorModal setWhoops={setWhoops} whoops={whoops} close={hideAlert} />,
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
    <div>
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
              <TriggerNameOnly name={name} setName={setName} error={error} />
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
              {isSet ? <LocationName location={location} /> : null}
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
                      Create
                    </Button>
                  )}
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
    </div>
  )
}

export default CreateTrigger
