import React, { useEffect, useRef, useState } from 'react'

import { ChevronLeft } from 'react-ikonate'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Button, Col, Label, Row } from 'reactstrap'

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
  const { id } = useLocation().state

  const [error, setError] = useState(null)
  const [tempName, setTempName] = useState('')
  const [tempStatus, setTempStatus] = useState(null)

  const dispatch = useDispatch()

  const isFetching = useSelector(selectIsTriggersFetching)
  const trigger = useSelector((state) => {
    return state.triggers.data.find((item) => item.id === id)
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

    if (trigger.name !== tempName) {
      if (!tempName.length) {
        setError(noBlankErrorMessage)
        return
      }
      data.name = tempName
    }

    if (trigger.status !== tempStatus) {
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
          <Col md="9">
            <EditableInput content={tempName} setContent={setTempName} error={error} />
          </Col>
          <Col md="3" className="text-end">
            <Label>Trigger {tempStatus}</Label>
            <StatusToggle
              tempStatus={tempStatus}
              setTempStatus={setTempStatus}
            />
          </Col>
        </Row>

        <Row>
          <Col className="mb-3">
            <h5>
              <ThumbnailLocation location={trigger.location} />
            </h5>
          </Col>
        </Row>

        <Row>
          <Col className="mb-4">
            <h5>Condition</h5>
            <ThumbnailCondition condition={trigger.condition} />
          </Col>
        </Row>

        <Row>
          <Col className="mb-4">
            <h5>Notify me</h5>
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
