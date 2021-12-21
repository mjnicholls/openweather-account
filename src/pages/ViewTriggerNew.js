/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'

import { ChevronLeft, Edit } from 'react-ikonate'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col, Input, Button } from 'reactstrap'

import BeatLoader from '../components/BeatLoader'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import EmailList from '../components/EmailList'
import ViewOnlyMap from '../components/GoogleMapViewOnly'
import StatusToggle from '../components/StatusToggle'
import ThumbnailLocation from '../components/ThumbnailLocation'
import TriggerEvents from '../components/TriggerEvents'
import { noBlankErrorMessage } from '../config'
import { notificationText } from '../utils/utils'
import '../App.scss'
import ThumbnailCondition from '../components/ThumbnailCondition'

import { editTrigger } from '../features/triggers/actions'

const selectIsTriggersFetching = (state) => state.triggers.isFetching

const ViewTrigger = () => {
  const { state } = useLocation()

  const dispatch = useDispatch()
  const { id } = state
  const isFetching = useSelector(selectIsTriggersFetching)
  const trigger = useSelector((state) => {
    return state.triggers.data.find((trigger) => trigger.id === id)
  })
  const mapRef = useRef(null)

  const [error, setError] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [tempName, setTempName] = useState(null)
  const [tempStatus, setTempStatus] = useState(null)

  useEffect(() => {
    if (trigger) {
      setTempName(trigger.name)
      setTempStatus(trigger.status)
    }
  }, [trigger])

  const validationName = () => {
    setError(null)
    if (name === '') {
      setError(noBlankErrorMessage)
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
    setIsEditMode(false)
    validationName(tempName)
  }

  const saveMethod = () => {
    const data = {
      id,
    }

    if (name !== tempName) {
      data.name = tempName
    }

    if (status !== tempStatus) {
      data.status = tempStatus
    }
    dispatch(editTrigger(data))
  }

  return isFetching ? (
    <BeatLoader />
  ) : (
    <div>
      <Row>
        <Col md="7">
          <Row>
            <Col className="mt-3">
              <Link role="button" to="/dashboard/triggers">
                <div className="navigation-link">
                  <ChevronLeft fontSize="2rem" />
                  To all triggers
                </div>
              </Link>
            </Col>
          </Row>
          <Row className="my-4">
            <Col md="10">
              {isEditMode ? (
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    onChange={(e) => {
                      setTempName(e.target.value)
                    }}
                    onKeyDown={onKeyDown}
                    className={error ? 'danger-border' : ''}
                    value={tempName}
                    style={{ width: '250px' }}
                  />
                </div>
              ) : (
                <h2 className="m-0 p-0">
                  {tempName}
                  <Edit
                    className="ms-1"
                    onClick={() => {
                      setIsEditMode(true)
                    }}
                    fontSize="20pt"
                    border={1}
                  />
                </h2>
              )}
            </Col>
            <Col md="2" className="text-end">
              <h6>Trigger {tempStatus}</h6>
              <StatusToggle
                tempStatus={tempStatus}
                setTempStatus={setTempStatus}
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <h6>
                <ThumbnailLocation location={trigger.location} />
              </h6>
            </Col>
          </Row>

          <Row>
            <Col className="mb-4">
              <h6 className="m-0">Condition</h6>
              <ThumbnailCondition condition={trigger.condition} />
            </Col>
          </Row>

          <Row>
            <Col className="mb-4">
              <h6 className="m-0">Notify me</h6>
              <span>{notificationText(trigger.days)}</span>
            </Col>
          </Row>

          <Row>
            <Col className="mb-5">
              <EmailList recipients={trigger.recipients} />
            </Col>
          </Row>

          <Row>
            <Col className="mb-5">
              <TriggerEvents triggerId={id} />
            </Col>
          </Row>
          <Row className="container-main">
            <Col className="text-end">
              <DeleteTriggerCard id={id} className="button-neutral">
                Delete
              </DeleteTriggerCard>
              <Button
                className="button-active shadow-none"
                style={{ marginLeft: '5px' }}
                onClick={saveMethod}
                disabled={
                  trigger.status === tempStatus && trigger.name === tempName
                }
              >
                Update
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md="5">
          <ViewOnlyMap mapRef={mapRef} location={trigger.location} />
        </Col>
      </Row>
    </div>
  )
}

export default ViewTrigger
