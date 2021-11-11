import React, { useEffect, useRef, useState } from 'react'

import { Row, Col, Input, Label, Button } from 'reactstrap'
import { useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { Edit, Delete } from 'react-ikonate'
import humanReadableCondition from '../humanReadableCondition'
import ViewOnlyMap from '../components/GoogleMapViewOnly'
import '../App.scss'
import DeleteTriggerCard from '../components/DeleteTriggerCard'

const noBlankErrorMessage = 'Cannot be blank'

const ViewTrigger = () => {
  const { state } = useLocation()

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
    const data = {}

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
  }

  return (
    <>
      <Row className="trigger-card">
        <Col md="7">
          <h2>Trigger Card</h2>
          <Row className="search-box">
            {isEditName ? (
              <>
                <Col md="4">
                  <Label>Trigger Name</Label>
                </Col>
                <Col md="4" key={name}>
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
                <Col md="1" className="icons moveCentre">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    onClick={() => saveName()}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col md="4">
                  <Label>Trigger Name</Label>
                </Col>
                <Col md="4" key={name} className="moveCentre">
                  <p>{activeName}</p>
                </Col>
                <Col md="1" className="icons moveCentre">
                  <Edit
                    onClick={() => {
                      setIsEditName(true)
                    }}
                  />
                </Col>
              </>
            )}

            <Col md="2">
              <label className="switch">
                <input
                  type="checkbox"
                  onClick={() => setTempStatus(tempStatus ? 'false' : 'true')}
                />
                <span className="slider round"></span>
              </label>
            </Col>
          </Row>

          <Row className="search-box">
            <Col md="4">
              <Label>Location</Label>
            </Col>

            <Col md="8">
              <Label type="text" value={location} className="cardContent">
                {location.name} ({location.lat}, {location.lon})
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col md="4">
              <Label>Trigger Condition</Label>
            </Col>

            <Col md="8">
              <Label type="text" value={condition} className="cardContent">
                {humanReadableCondition(condition).substring(27)}
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col md="4">
              <Label>Prior Notifications</Label>
            </Col>

            <Col md="8">
              <Label type="text" value={days} className="cardContent">
                Up to {days} {days === 1 ? 'day' : 'days'} before the event
                starts
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col md="4">
              <Label>Email recipients</Label>
            </Col>

            <Col md="8">
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

          <Col md="12">
            <h3>Events List</h3>
          </Col>
          <Row className="search-box">
            <Col md="4">
              <Label>Active Events</Label>
            </Col>

            <Col md="8">
              <Label type="text" className="cardContent">
                27 October 2021
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col md="4">
              <Label>Archive</Label>
            </Col>

            <Col md="8">
              <Label type="text" className="cardContent">
                27 September 2021
              </Label>
            </Col>
          </Row>
          <Row className="search-box">
            <Col md="9">
              <Link to="/trigger-list">
                <Button className="button-active">Back</Button>
              </Link>
            </Col>
            <Col md="3">
              <DeleteTriggerCard />
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
