import React, { useEffect, useRef, useState } from 'react'

import { ChevronDown, Edit } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { useLocation, Link, useHistory } from 'react-router-dom'
import { Row, Col, Input, Label, Button } from 'reactstrap'

import { patchTrigger, getEventsByTriggerId } from '../api/api'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import ViewOnlyMap from '../components/GoogleMapViewOnly'
import StatusToggle from '../components/StatusToggle'
import { noBlankErrorMessage, tariff } from '../config'
import humanReadableCondition from '../humanReadableCondition'
import '../App.scss'
import { toDate } from '../utils/dateTime'

import ReactBSAlert from 'react-bootstrap-sweetalert'

const selectUserId = (state) => state.auth.user_id

const ViewTrigger = () => {
  const { state } = useLocation()

  const userId = useSelector(selectUserId)
  const { condition, days, id, location, name, recipients, status } = state

  const myTariff = tariff.enterprise
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
        .then(() => {
          updateAlert()
        })
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

  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const updateAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Trigger Updated!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <br />
        <p>Your trigger has been updated.</p>
        <Row className="search-box">
          <Col className="text-end">
            <Link to="/triggers">
              <Button className="button-active">Back to all triggers</Button>
            </Link>
          </Col>
        </Row>
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
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
              <StatusToggle
                tempStatus={tempStatus}
                setTempStatus={setTempStatus}
              />
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

          <Row>
            <Col className="mb-3">
              <h6>Prior Notifications</h6>
              <p>
                Up to {days} {days === 1 ? 'day' : 'days'} before the event
                starts
              </p>
            </Col>
          </Row>

          {myTariff === 'free' ? (
            <Row>&nbsp;</Row>
          ) : (
            <Row>
              <Col className="mb-3">
                <h6>Email recipients</h6>
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
              </Col>
            </Row>
          )}
          <br />
          <Col>
            <h3>Events List</h3>
          </Col>

          <Row>
            <Col className="mb-3">
              <h6 className="mb-2">Active Events</h6>
              {events.map((triggers) => (
                <>
                  <p className="mt-1">{toDate(triggers.date)}</p>
                </>
              ))}
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
