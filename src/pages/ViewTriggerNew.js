/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'

import { ChevronLeft } from 'react-ikonate'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col, Button } from 'reactstrap'

import BeatLoader from '../components/BeatLoader'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import EditableInput from '../components/EditableInput'
import EmailList from '../components/EmailList'
import Map from '../components/Map'
import StatusToggle from '../components/StatusToggle'
import ThumbnailLocation from '../components/ThumbnailLocation'
import TriggerEvents from '../components/TriggerEvents'
import { noBlankErrorMessage } from '../config'
import { notificationText } from '../utils/utils'
import ThumbnailCondition from '../components/ThumbnailCondition'

import { editTrigger } from '../features/triggers/actions'

const selectIsTriggersFetching = (state) => state.triggers.isFetching

const ViewTrigger = () => {
  const { state } = useLocation()
  const { id } = state

  const [error, setError] = useState(null)
  const [tempName, setTempName] = useState('')
  const [tempStatus, setTempStatus] = useState(null)

  const dispatch = useDispatch()

  const isFetching = useSelector(selectIsTriggersFetching)
  const trigger = useSelector((state) => {
    return state.triggers.data.find((trigger) => trigger.id === id)
  })

  const mapRef = useRef(null)

  useEffect(() => {
    if (trigger) {
      setTempName(trigger.name)
      setTempStatus(trigger.status)
    }
  }, [trigger])

  const updateTrigger = () => {
    const data = {
      id,
    }

    if (name !== tempName) {
      if (!tempName.length) {
        setError(noBlankErrorMessage)
        return
      }
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
            <EditableInput content={tempName} setContent={setTempName} error={error} />
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
              onClick={updateTrigger}
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
        {/*<ViewOnlyMap mapRef={mapRef} location={trigger.location} />*/}
        <Map
          mapRef={mapRef}
          mapLocation={trigger.location}
          onClickMap={() => {}}
          isButtonInfoWindow={false}
          isDraggable={false}
        />
      </Col>
    </Row>
  )
}

export default ViewTrigger
