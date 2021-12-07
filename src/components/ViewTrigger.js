import React, { useEffect, useRef, useState } from 'react'

import { ArrowDown, Edit, Ok } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col, Input, Label, Button } from 'reactstrap'

import { patchTrigger, getEventsByTriggerId, getTriggers } from '../api/api'
import { noBlankErrorMessage } from '../config'
import humanReadableCondition from '../humanReadableCondition'
import '../App.scss'
import { toDate } from '../utils/dateTime'
import DeleteTriggerCard from './DeleteTriggerCard'
import ViewOnlyMap from './GoogleMapViewOnly'

const selectUserId = (state) => state.auth.user_id

const ViewTrigger = () => {
  const { state } = useLocation()

  const userId = useSelector(selectUserId)
  const { condition, days, id, location, name, recipients, status } = state

  const mapRef = useRef(null)

  const [error, setError] = useState('')
  const [isEditName, setIsEditName] = useState(false)
  const [activeName, setActiveName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)
  const [isOpen, setIsOpen] = useState()

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

  const saveMethod = () => {
    /* eslint-disable-next-line */
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

  const [events, setEvents] = useState([])

  useEffect(() => {
    getEventsByTriggerId(id, userId)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [id, userId])

  return (
    <>
      <Row className="trigger-card mb-3">
        <Col md="7">
          <h2>Trigger Card</h2>
          <Row className="search-box">
            <Col>
              <Label>Trigger Name</Label>
            </Col>
            {isEditName ? (
              <>
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
                  <Ok onClick={() => saveName()} />
                </Col>
              </>
            ) : (
              <>
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
                <input
                  type="checkbox"
                  checked={tempStatus === 'on'}
                  onChange={() =>
                    setTempStatus(tempStatus === 'on' ? 'off' : 'on')
                  }
                />
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
                  <ArrowDown
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
                {events.map((triggers) => (
                  <>
                    <p>{toDate(triggers.date)}</p>
                  </>
                ))}
              </Label>
            </Col>
          </Row>

          <Row className="search-box">
            <Col className="text-left">
              <Link to="/triggers">
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
