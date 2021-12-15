import React, { useEffect, useRef, useState } from 'react'

import { css } from '@emotion/react'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { ChevronDown, Edit } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import BeatLoader from 'react-spinners/ClipLoader'
import { Row, Col, Input, Button } from 'reactstrap'

import { patchTrigger, getEventsByTriggerId } from '../api/api'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import ViewOnlyMap from '../components/GoogleMapViewOnly'
import StatusToggle from '../components/StatusToggle'
import { noBlankErrorMessage } from '../config'
import { conditionToText } from '../utils/conditionText'
import '../App.scss'
import { toDate } from '../utils/dateTime'

const selectUserId = (state) => state.auth.user_id

const selectTariff = (state) => state.auth.tariff

const ViewTrigger = () => {
  const { state } = useLocation()

  const userId = useSelector(selectUserId)
  const myTariff = useSelector(selectTariff)

  const { condition, days, id, location, name, recipients, status } = state

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

  const mapRef = useRef(null)

  const openEventsN = 3

  const [error, setError] = useState('')
  const [isEditName, setIsEditName] = useState(false)
  const [activeName, setActiveName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)
  const [isEdited, setIsEdited] = useState(true)
  const [whoops, setWhoops] = useState('')

  console.log('isEdited', isEdited)

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
          if (err.response) {
            console.log(err.response.data.message)
            setWhoops(err.response.data.message)
            htmlError()
          }
        })
    }
    console.log('saving', data)
  }

  const [events, setEvents] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getEventsByTriggerId(id, userId)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id, userId])

  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const updateAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Trigger Updated"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        customClass="bs-alerts"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <br />
        <p>Your trigger has been updated.</p>

        <Col className="text-end">
          <Link to="/triggers">
            <Button className="button-active shadow-none">
              Back to all triggers
            </Button>
          </Link>
        </Col>
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
          <Button className="button-active shadow-none">Contact</Button>
        </Col>
      </ReactBSAlert>,
    )
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
          <BeatLoader
            color={color}
            loading={isLoading}
            css={override}
            size={15}
          />
          <BeatLoader
            color={color}
            loading={isLoading}
            css={override}
            size={15}
          />
        </div>
      ) : (
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
                          setIsEdited(false)
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
                  {tempStatus === 'on' ? (
                    <h6>Trigger On</h6>
                  ) : (
                    <h6>Trigger Off</h6>
                  )}

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
                  <p>{conditionToText(condition)}</p>
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
                    {recipients.length === 0 ? (
                      <p>None</p>
                    ) : (
                      <>
                        {Object.keys(recipients).map((recip) => (
                          <>
                            <p key={recip}>{recipients.slice(0, 3)[recip]}</p>
                          </>
                        ))}
                      </>
                    )}
                    {recipients.length > openEventsN && (
                      <>
                        <a
                          data-toggle="collapse"
                          href="#collapseEmails"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseEmails"
                          className="button-neutral shadow-none see-more-collapse "
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
                      </>
                    )}
                  </Col>
                </Row>
              )}
              <br />
              <Col>
                <h3>Events List</h3>
              </Col>

              <Row>
                <Col className="mb-3">
                  {events.length === 0 ? (
                    <h6 className="mb-2">No Active Events</h6>
                  ) : (
                    <h6 className="mb-2">Active Events</h6>
                  )}
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
                    <Button className="button-neutral shadow-none">Back</Button>
                  </Link>
                </Col>
                <Col className="text-end">
                  <DeleteTriggerCard id={id} userId={userId} />
                  {tempStatus === status ? (
                    <Button
                      className="button-active shadow-none"
                      style={{ marginLeft: '5px' }}
                      onClick={saveMethod}
                      disabled={isEdited}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="button-active shadow-none"
                      style={{ marginLeft: '5px' }}
                      onClick={saveMethod}
                    >
                      Save
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md="5">
              <ViewOnlyMap mapRef={mapRef} location={location} />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ViewTrigger
