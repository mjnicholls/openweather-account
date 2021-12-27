import React from 'react'

import { Close, EnvelopeAlt } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap'

import BeatLoader from '../components/BeatLoader'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import EditTriggerCard from '../components/EditTriggerCard'
import ThumbnailCondition from '../components/ThumbnailCondition'
import ThumbnailLocation from '../components/ThumbnailLocation'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients
const selectTriggers = (state) => state.triggers

const Triggers = () => {
  const emailsAllowed = useSelector(selectEmailsAllowed)
  const { isFetching, error, data } = useSelector(selectTriggers)
  const history = useHistory()
  const handleCreateClick = () => history.push('/dashboard/triggers/create')

  const handleTriggerLink = (e, trigger) => {
    if (
      !e.target.classList.contains('edit') ||
      !e.target.parent.classList.contains('edit')
    ) {
      history.push({ pathname: '/dashboard/trigger', state: trigger.id })
    }
  }

  return (
    <div className="page-container">
      <Row className="first-row">
        <Col>
          <h2>Triggers</h2>
        </Col>
        <Col className="text-end title">
          <Link
            to="/dashboard/events"
            role="button"
            className="button-neutral shadow-none"
          >
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
        <Card className="trigger-card">
          <CardHeader style={{fontWeight: "bold", paddingRight: 0, paddingLeft: 0}} className="d-lg-flex d-none">
            <Row className="w-100 mx-0">
              <Col lg="1">&nbsp;</Col>
              <Col>Name</Col>
              <Col lg="3">Condition</Col>
              <Col lg="2">Location</Col>
              <Col lg="1">Notify</Col>
              {emailsAllowed && (
                <Col lg="1" className="email">Emails</Col>
              )}
              <Col lg="1">Status</Col>
              <Col lg="1">&nbsp;</Col>
            </Row>
          </CardHeader>
          <CardBody>
          {data.map(
            (trigger, index) =>
              trigger.status !== 'deleted' && (
                <button
                  type="button"
                  key={trigger.id}
                  onClick={(e) => handleTriggerLink(e, trigger)}
                  className="remove-default-button-style w-100"
                >
                  <Row className="trigger-item mx-0 w-100" >
                    <Col
                      lg="1"
                      className="d-lg-none text-end text-nowrap edit"
                    >
                      <EditTriggerCard
                        id={trigger.id}
                        name={trigger.name}
                        status={trigger.status}
                      />

                      <DeleteTriggerCard
                        id={trigger.id}
                        className="remove-default-button-style"
                        callback={() => {}}
                      >
                        <Close color="#48484a" />
                      </DeleteTriggerCard>
                    </Col>

                    <Col lg="1">{index + 1}</Col>
                    <Col><b>{trigger.name}</b></Col>
                    <Col lg="3">
                      <ThumbnailCondition condition={trigger.condition} />
                      {/* {conditionToText(trigger.condition)} */}
                    </Col>
                    <Col lg="2">
                      <ThumbnailLocation
                        location={trigger.location}
                        showIcon={false}
                      />
                    </Col>
                    <Col lg="1">
                      {trigger.days} {trigger.days === 1 ? 'day' : 'days'}
                    </Col>
                    {emailsAllowed && (
                      <Col lg="1" className="text-nowrap">
                        <EnvelopeAlt /> {trigger.recipients.length}
                      </Col>
                    )}
                    <Col
                      lg="1"
                      style={{
                        color: trigger.status === 'on' ? 'green' : 'red',
                      }}
                    >
                      {trigger.status.charAt(0).toUpperCase() +
                        trigger.status.slice(1)}
                    </Col>

                    <Col lg="1" className="d-lg-flex d-none text-nowrap">
                      <div>
                        <EditTriggerCard
                          id={trigger.id}
                          name={trigger.name}
                          status={trigger.status}
                        />
                      </div>
                      <div>
                        <DeleteTriggerCard
                          callback={() => {}}
                          className="remove-default-button-style edit"
                          id={trigger.id}
                        >
                          <Close color="#48484a" />
                        </DeleteTriggerCard>
                      </div>
                    </Col>
                  </Row>
                </button>
              ),
          )}
          </CardBody>
        </Card>
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
