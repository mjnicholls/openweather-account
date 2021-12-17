import React, { useRef, useState } from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Edit } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col, Input, Button } from 'reactstrap'

import { patchTrigger } from '../api/api'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import EmailList from '../components/EmailList'
import ErrorModal from '../components/ErrorModal'
import ViewOnlyMap from '../components/GoogleMapViewOnly'
import StatusToggle from '../components/StatusToggle'
import ThumbnailLocation from '../components/ThumbnailLocation'
import EventList from '../components/TriggerEvents'
import { noBlankErrorMessage } from '../config'
import { notificationText } from '../utils/utils'
import '../App.scss'
import ThumbnailCondition from '../components/ThumbnailCondition'

const selectUserId = (state) => state.auth.user.id

const ViewTrigger = () => {
  const { state } = useLocation()

  const userId = useSelector(selectUserId)

  const { condition, days, id, location, name, recipients, status } = state

  const mapRef = useRef(null)

  const [error, setError] = useState('')
  const [isEditName, setIsEditName] = useState(false)
  const [activeName, setActiveName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)
  const [isEdited, setIsEdited] = useState(true)
  const [whoops, setWhoops] = useState('')
  const [alert, setAlert] = React.useState(null)

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
            errorAlert()
          }
        })
    }
  }

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
      >
        <br />
        <p>Your trigger has been updated.</p>

        <Col className="text-end">
          <Link
            to="/dashboard/triggers"
            className="button-active shadow-none"
            role="button"
          >
            Back to all triggers
          </Link>
        </Col>
      </ReactBSAlert>,
    )
  }

  const errorAlert = () => {
    setAlert(
      <ErrorModal setWhoops={setWhoops} whoops={whoops} close={hideAlert} />,
    )
  }
  return (
    <div>
      {alert}
      <Row>
        <Col md="7">
          <Row className="pt-5">
            <Col md="7">
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
                  <h2 className="m-0 p-0">{activeName}</h2>
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
              <h6>Trigger {tempStatus}</h6>
              <StatusToggle
                tempStatus={tempStatus}
                setTempStatus={setTempStatus}
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <ThumbnailLocation location={location} />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <h6>An event is generated when</h6>
              <ThumbnailCondition condition={condition} />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <h6>Notify me</h6>
              <span>{notificationText(days)}</span>
            </Col>
          </Row>

          <EmailList recipients={recipients} />

          <EventList triggerId={id} />

          <Row className="search-box">
            <Col className="text-left">
              <Link to="/dashboard/triggers">
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
    </div>
  )
}

export default ViewTrigger
