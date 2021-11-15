import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Input, Label, Button } from 'reactstrap'
import { useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Edit } from 'react-ikonate'
import humanReadableCondition from '../humanReadableCondition'
import ViewOnlyMap from '../components/GoogleMapViewOnly'
import '../App.scss'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import { patchTrigger } from '../api/api'

const noBlankErrorMessage = 'Cannot be blank'

const selectUserId = (state) => state.auth.user_id

const ViewTrigger = () => {
  const { state } = useLocation()

  const userId = useSelector(selectUserId)

  const { condition, days, id, location, name, recipients, status } = state

  const data = {
    id: 1,
    condition: {
      condition: '>',
      units: 'metric',
      value: 20,
      variable: 'temp',
    },
    days: 3,
    name: 'Trigger 1',
    recipients: ['email1', 'email2', 'email3', 'email4', 'email5', 'email6'],
    status: false,
    location: {
      name: 'Paris',
      lat: 40.4,
      lon: 28.8,
    },
    user_id: 1,
  }

  // const { condition, days, id, location, name, recipients, status } = data

  const mapRef = useRef(null)

  const [error, setError] = useState('')

  const [isEditName, setIsEditName] = useState(false)

  const validationName = () => {
    setError({})
    let newError = {}

    if (name === '') {
      newError = {
        name: noBlankErrorMessage,
      }
    }

    if (Object.keys(newError).length) {
      setError(newError)
      return false
    }

    return true
  }

  const saveName = () => {
    setIsEditName(false)
    validationName(activeName)
  }

  const [activeName, setActiveName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)
  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    console.log('tempStatus', tempStatus)
  }, [tempStatus])

  const saveMethod = () => {
    /*eslint-disable-next-line*/
    const data = {
      id,
      user_id: userId,
      name,
      status,
    }

    if (name !== activeName) {
      data.name = activeName
    }

    if (status !== tempStatus) {
      data.status = tempStatus
    }

    if (Object.keys(data).length) {
      // call API
    }
    console.log('saving', data)

    patchTrigger(data)
      .then(() => {
        console.log('data')
      })
      // eslint-disable-next-line
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Row className="trigger-card">
        <Col md="7">
          <h2>Trigger Card</h2>
          <Row className="search-box">
            {isEditName ? (
              <>
                <Col>
                  <Label>Trigger Name</Label>
                </Col>
                <Col key={name}>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setActiveName(e.target.value)
                    }}
                    className={error.name ? 'danger-border' : ''}
                    value={activeName}
                    name="name"
                  />
                </Col>
                <Col className="icons moveCentre">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    onClick={() => saveName()}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <Label>Trigger Name</Label>
                </Col>
                <Col key={name} className="moveCentre">
                  <p>{activeName}</p>
                </Col>
                <Col className="icons moveCentre">
                  <Edit
                    onClick={() => {
                      setIsEditName(true)
                    }}
                  />
                </Col>
              </>
            )}

            <Col>
              <label className="switch">
                <input type="checkbox" onClick={() => setTempStatus()} />
                <span className="slider round"></span>
              </label>
            </Col>
          </Row>

          <Row className="search-box">
            <Col>
              <Label>Location</Label>
            </Col>

            <Col>
              <Label type="text" value={location} className="cardContent">
                {location.name} ({location.lat}, {location.lon})
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col>
              <Label>Trigger Condition</Label>
            </Col>

            <Col>
              <Label type="text" value={condition} className="cardContent">
                {humanReadableCondition(condition).substring(27)}
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col>
              <Label>Prior Notifications</Label>
            </Col>

            <Col>
              <Label type="text" value={days} className="cardContent">
                Up to {days} {days === 1 ? 'day' : 'days'} before the event
                starts
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col>
              <Label>Email recipients</Label>
            </Col>

            <Col>
              <Label type="text" className="cardContent">
                {Object.keys(recipients).map((recip) => (
                  <>
                    <p key={recip}>{recipients.slice(0, 3)[recip]}</p>
                  </>
                ))}
                <a
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  className="test"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="bottom"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  />
                </a>
                <p className="collapse" id="collapseExample">
                  {Object.keys(recipients).map((recip) => (
                    <>
                      <p key={recip}>{recipients.slice(3)[recip]}</p>
                    </>
                  ))}
                </p>
              </Label>
            </Col>
          </Row>

          <Col>
            <h3>Events List</h3>
          </Col>
          <Row className="search-box">
            <Col>
              <Label>Active Events</Label>
            </Col>

            <Col>
              <Label type="text" className="cardContent">
                27 October 2021
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col>
              <Label>Archive</Label>
            </Col>

            <Col>
              <Label type="text" className="cardContent">
                27 September 2021
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col className="text-left">
              <Link to="/trigger-list">
                <Button className="button-neutral">Back</Button>
              </Link>
            </Col>
            <Col className="text-end">
              <DeleteTriggerCard id={id} userId={userId} />
              <Button
                className="button-active"
                style={{ marginLeft: '5px' }}
                onClick={saveMethod}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md="5">
          <ViewOnlyMap mapRef={mapRef} location={location} />
        </Col>
      </Row>
    </>
  )
}

export default ViewTrigger