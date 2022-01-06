import React from 'react'

import { Close, EnvelopeAlt } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap'

import BeatLoader from '../components/BeatLoader'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import DeleteTriggerCard from '../components/DeleteTriggerCard'
import EditTriggerCard from '../components/EditTriggerCard'
import ThumbnailLocation from '../components/ThumbnailLocation'
import { conditionToText } from '../utils/utils'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients
const selectTriggers = (state) => state.triggers

const Triggers = () => {
  const emailsAllowed = useSelector(selectEmailsAllowed)
  const { isFetching, error, data } = useSelector(selectTriggers)
  const history = useHistory()
  const handleCreateClick = () => history.push('/dashboard/triggers/create')

  return (
    <div className="page-container page-padding">
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
          <CardHeader
            style={{ fontWeight: 'bold', paddingRight: 0, paddingLeft: 0 }}
            className="d-lg-flex d-none"
          >
            <Row className="w-100 mx-0">
              <Col lg="11">
                <Row>
                  <Col lg="1">&nbsp;</Col>
                  <Col>Name</Col>
                  <Col lg="3">Condition</Col>
                  <Col lg="2">Location</Col>
                  <Col lg="1">Notify</Col>
                  {emailsAllowed && (
                    <Col lg="1" className="email">
                      Emails
                    </Col>
                  )}
                  <Col lg="1">Status</Col>
                </Row>
              </Col>
              <Col lg="1">&nbsp;</Col>
            </Row>
          </CardHeader>
          <CardBody>
            {data.map(
              (trigger, index) =>
                trigger.status !== 'deleted' && (
                  <Row className="trigger-item mx-0 w-100" key={trigger.id}>
                    <Col lg="1" className="d-lg-none text-end text-nowrap edit">
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
                    <Col lg="11">
                      <Link
                        role="button"
                        to={{ pathname: '/dashboard/trigger', id: trigger.id }}
                        className="remove-default-button-style w-100"
                        state={trigger.id}
                      >
                        <Row>
                          <Col lg="1">{index + 1}</Col>
                          <Col>
                            <b>{trigger.name}</b>
                          </Col>
                          <Col lg="3">{conditionToText(trigger.condition)}</Col>
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
                        </Row>
                      </Link>
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
                ),
            )}
          </CardBody>
        </Card>
      ) : (
        <Row>
          <Col>
            <p>
              Here you will find the list of all your created triggers. To
              create a trigger, please follow to the{' '}
              <Link to="/dashboard/triggers/create" className="link-flat">
                New trigger
              </Link>{' '}
              section.
            </p>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default Triggers
