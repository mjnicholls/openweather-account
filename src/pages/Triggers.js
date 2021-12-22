import React from 'react'

import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import '../App.scss'
import BeatLoader from '../components/BeatLoader'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import DeleteTriggerCardX from '../components/DeleteTriggerCard'
import EditTriggerCard from '../components/EditTriggerCard'
import ThumbnailCondition from '../components/ThumbnailCondition'
import ThumbnailLocation from '../components/ThumbnailLocation'

import { Bell, Close, EnvelopeAlt } from 'react-ikonate'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients
const selectTriggers = (state) => state.triggers

const Triggers = () => {
  const emailsAllowed = useSelector(selectEmailsAllowed)
  const { isFetching, error, data } = useSelector(selectTriggers)
  const history = useHistory()
  const handleCreateClick = () => history.push('/dashboard/triggers/create')

  return (
    <div className="triggertest">
      <Row className="py-5">
        <Col>
          <h2 className="m-0 p-0">Triggers</h2>
        </Col>
        <Col className="text-end title">
          <Link
            to="/dashboard/events"
            role="button"
            className="button-neutral shadow-none"
          >
            {/* <Bell /> */}
            To events
          </Link>
          <CreateNewTriggerButton createFunc={handleCreateClick} />
        </Col>
      </Row>

      {isFetching ? (
        <BeatLoader />
      ) : // TODO error container
      error ? (
        <div>{error}</div>
      ) : data.length ? (
        <>
          <Row className="triggers-bold d-none d-lg-flex">
            <Col className="col-md-auto">&nbsp;</Col>
            <Col md="2">Name</Col>
            <Col md="3">Condition</Col>
            <Col md="3">Location</Col>
            <Col md="1">Notify</Col>
            {emailsAllowed && (
              <Col md="1" className="email">
                Emails
              </Col>
            )}
            <Col colSpan={1}>&nbsp;</Col>
          </Row>

          {data.map(
            (trigger, index) =>
              trigger.status !== 'deleted' && (
                <Row className="triggers-new" key={trigger.id}>
                  <Col md="1" className="d-md-flex d-lg-none text-end">
                    <EditTriggerCard
                      id={trigger.id}
                      name={trigger.name}
                      status={trigger.status}
                    />

                    <DeleteTriggerCardX
                      id={trigger.id}
                      className="remove-default-button-style"
                    >
                      <Close color="#48484a" />
                    </DeleteTriggerCardX>
                  </Col>
                  <Col className="col-md-auto">{index + 1}</Col>
                  <Col md="2">
                    <Link
                      to={{
                        pathname: '/dashboard/trigger',
                        state: trigger,
                      }}
                    >
                      {trigger.name}
                    </Link>
                  </Col>
                  <Col md="3">
                    <ThumbnailCondition condition={trigger.condition} />
                    {/* {conditionToText(trigger.condition)} */}
                  </Col>
                  <Col md="3">
                    <ThumbnailLocation
                      location={trigger.location}
                      showIcon={false}
                    />
                  </Col>
                  <Col md="1">
                    {trigger.days} {trigger.days === 1 ? 'day' : 'days'}
                  </Col>
                  {emailsAllowed && (
                    <Col className="text-nowrap">
                      <EnvelopeAlt /> {trigger.recipients.length}
                    </Col>
                  )}
                  <Col
                    md="1"
                    style={{
                      color: trigger.status === 'on' ? 'green' : 'red',
                    }}
                  >
                    {trigger.status.charAt(0).toUpperCase() +
                      trigger.status.slice(1)}
                  </Col>

                  <Col md="1" className="d-lg-flex d-none text-nowrap">
                    <EditTriggerCard
                      id={trigger.id}
                      name={trigger.name}
                      status={trigger.status}
                    />
                    <DeleteTriggerCardX
                      id={trigger.id}
                      className="remove-default-button-style"
                    >
                      <Close color="#48484a" />
                    </DeleteTriggerCardX>
                  </Col>
                </Row>
              ),
          )}
        </>
      ) : (
        <Row>
          <Col>
            <p>
              <b>No triggers</b>
            </p>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default Triggers
