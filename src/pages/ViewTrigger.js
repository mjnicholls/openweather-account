/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Button, Col, Label, Row } from 'reactstrap'

import BeatLoader from '../components/BeatLoader'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import EditableInput from '../components/EditableInput'
import EmailList from '../components/EmailNotificationsView'
import Map from '../components/Map'
import StatusToggle from '../components/StatusToggle'
import ThumbnailLocation from '../components/ThumbnailLocation'
import TriggerEvents from '../components/TriggerEvents'
import { noBlankErrorMessage } from '../config'
import { editTrigger } from '../features/triggers/actions'
import { conditionToText, notificationText } from '../utils/utils'
import { ChevronLeft } from 'react-ikonate'

const selectIsTriggersFetching = (state) => state.triggers.isFetching

const ViewTrigger = () => {
  const history = useHistory()
  const { id } = useLocation()

  if (!id) {
    history.push('/dashboard/triggers')
  }
  const trigger = useSelector((state) =>
    state.triggers.data.find((item) => item.id === id),
  )

  const [error, setError] = useState(null)
  const [tempName, setTempName] = useState('')
  const [tempStatus, setTempStatus] = useState(null)

  const dispatch = useDispatch()

  const isFetching = useSelector(selectIsTriggersFetching)

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

  const deleteTriggerCallback = () => {
    history.push('/dashboard/triggers')
  }

  return isFetching ? (
    <BeatLoader />
  ) : (
    <div className="page-container">
      <Row className="h-100">
        <Col md="7" className="page-padding">
          {/*<Row>*/}
          {/*<Col>*/}
          {/*<Link role="button" to="/dashboard/triggers" style={{position: "absolute", top: "0.5rem"}}>*/}
          {/*<div className="navigation-link">*/}
          {/*<ChevronLeft fontSize="2rem" />*/}
          {/*To all triggers*/}
          {/*</div>*/}
          {/*</Link>*/}
          {/*</Col>*/}
          {/*</Row>*/}
          <div>
            <Row>
              <Col xs="9">
                <Row className="first-row">
                  <Col>
                    <EditableInput
                      content={tempName}
                      setContent={setTempName}
                      error={error}
                      tagName="h2"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-5">
                    <ThumbnailLocation location={trigger.location} />
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-4">
                    <h5>Condition</h5>
                    <span>{conditionToText(trigger.condition)}</span>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-4">
                    <h5>Notifications</h5>
                    <span>{notificationText(trigger.days)}</span>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-5">
                    <EmailList recipients={trigger.recipients} />
                  </Col>
                </Row>
              </Col>
              <Col xs="3" className="text-end">
                <Label>Trigger {tempStatus}</Label>
                <StatusToggle
                  tempStatus={tempStatus}
                  setTempStatus={setTempStatus}
                />
              </Col>
            </Row>
            <Row>
              <Col className="mb-5">
                <TriggerEvents triggerId={id} />
              </Col>
            </Row>
          </div>

          <div className="space-placeholder">&nbsp;</div>

          <Row>
            <Col>
              <Link role="button" to="/dashboard/triggers">
                <div className="navigation-link">
                  <ChevronLeft fontSize="2rem" />
                  To all triggers
                </div>
              </Link>
            </Col>
            <Col className="text-end">
              <DeleteTriggerCard
                id={id}
                className="button-neutral"
                callback={deleteTriggerCallback}
              >
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
          {/* <ViewOnlyMap mapRef={mapRef} location={trigger.location} /> */}
          <Map
            mapRef={mapRef}
            mapLocation={trigger.location}
            onClickMap={() => {}}
            isButtonInfoWindow={false}
            isDraggable={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ViewTrigger
