import React, { useEffect, useRef, useState } from 'react'

import { ChevronDown, Edit } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { useLocation, Link, useHistory } from 'react-router-dom'
import { Row, Col, Input, Label, Button } from 'reactstrap'

import { patchTrigger, getEventsByTriggerId } from '../api/api'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import ViewOnlyMap from '../components/GoogleMapViewOnly'
import { noBlankErrorMessage } from '../config'
import humanReadableCondition from '../humanReadableCondition'
import '../App.scss'
import { toDate } from '../utils/dateTime'

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

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      saveName()
    }
  }

  const saveName = () => {
    setIsEditName(false)
    validationName(activeName)
  }

  const saveMethod = () => {
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
      patchTrigger(data)
        .then(() => {})
        .catch((err) => {
          console.log(err)
        })
    }
    console.log('saving', data)
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
      <Row className="trigger-card">
        <Col md="7">
          <h2>Trigger Card</h2>
          <Row>
            <Col className="mb-3">
              <h6>Trigger Name</h6>
              {isEditName ? (
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    onChange={(e) => {
                      setActiveName(e.target.value)
                    }}
                    onKeyDown={onKeyDown}
                    className={error.name ? 'danger-border' : ''}
                    value={activeName}
                    style={{ width: '250px' }}
                  />
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <span>{activeName}</span>
                  <Edit
                    className="ms-3"
                    onClick={() => {
                      setIsEditName(true)
                    }}
                  />
                </div>
              )}
            </Col>
            <Col className="text-end mb-3">
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

          <Row>
            <Col className="mb-3">
              <h6>Location</h6>
              <p>
                {location.name} ({location.lat}, {location.lon})
              </p>
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <h6>Trigger Condition</h6>
              <p>{humanReadableCondition(condition).substring(27)}</p>
            </Col>
          </Row>

          <Row className="mb-3">
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
                  href="#collapseEmails"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseEmails"
                  className="button-neutral see-more-collapse "
                >
                  <ChevronDown className="see-more-chevron" />
                </a>
                <p className="collapse mt-3" id="collapseEmails">
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
