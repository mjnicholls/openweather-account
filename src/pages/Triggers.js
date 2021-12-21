import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col, Table } from 'reactstrap'

import '../App.scss'
import BeatLoader from '../components/BeatLoader'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import DeleteTriggerCardX from '../components/DeleteTriggerCard'
import EditTriggerCard from '../components/EditTriggerCard'
import ThumbnailCondition from '../components/ThumbnailCondition'
import ThumbnailLocation from '../components/ThumbnailLocation'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients
const selectTriggers = (state) => state.triggers

const Triggers = () => {
  const emailsAllowed = useSelector(selectEmailsAllowed)
  const { isFetching, error, data } = useSelector(selectTriggers)

  return (
    <div>
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
            To events
          </Link>
          <CreateNewTriggerButton triggerNumber={data.length} />
        </Col>
      </Row>

      {isFetching ? (
        <BeatLoader />
      ) : // TODO error container
      error ? (
        <div>{error}</div>
      ) : data.length ? (
        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card className="mb-5">
              <CardBody className="p-0">
                <Table className="mb-3 material-table table-responsive">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Name</th>
                      <th>Condition</th>
                      <th>Location</th>
                      <th>Notify</th>
                      {emailsAllowed && <th className="email">Emails</th>}
                      <th colSpan={3}>&nbsp;</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map(
                      (trigger, index) =>
                        trigger.status !== 'deleted' && (
                          <tr key={trigger.id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: '/dashboard/trigger',
                                  state: trigger,
                                }}
                              >
                                {trigger.name}
                              </Link>
                            </td>
                            <td className="text-nowrap">
                              <ThumbnailCondition
                                condition={trigger.condition}
                              />
                              {/* {conditionToText(trigger.condition)} */}
                            </td>
                            <td>
                              <ThumbnailLocation
                                location={trigger.location}
                                showIcon={false}
                              />
                            </td>
                            <td className="text-nowrap">
                              {trigger.days}{' '}
                              {trigger.days === 1 ? 'day' : 'days'}
                            </td>
                            {emailsAllowed && (
                              <td>{trigger.recipients.length}</td>
                            )}
                            <td
                              style={{
                                color:
                                  trigger.status === 'on' ? 'green' : 'red',
                              }}
                            >
                              {trigger.status.charAt(0).toUpperCase() +
                                trigger.status.slice(1)}
                            </td>

                            <td>
                              <EditTriggerCard
                                id={trigger.id}
                                name={trigger.name}
                                status={trigger.status}
                              />
                            </td>
                            <td>
                              <DeleteTriggerCardX id={trigger.id} />
                            </td>
                          </tr>
                        ),
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
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
