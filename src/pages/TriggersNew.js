/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import { getTriggers } from '../api/api'
import '../App.scss'
import BeatLoader from '../components/BeatLoader'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import DeleteTriggerCardX from '../components/DeleteTriggerCardX'
import EditTriggerCard from '../components/EditTriggerCard'
import ThumbnailCondition from '../components/ThumbnailCondition'
import ThumbnailLocation from '../components/ThumbnailLocation'

const selectUserId = (state) => state.auth.user.id
const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const Triggers = () => {
  const userId = useSelector(selectUserId)
  const emailsAllowed = useSelector(selectEmailsAllowed)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

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
            To events
          </Link>
          <CreateNewTriggerButton triggerNumber={data.length} />
        </Col>
      </Row>

      {isLoading ? (
        <BeatLoader />
      ) : data.length ? (
        <>
          <Row className="triggers-bold d-flex d-sm-none">
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
                <Row className="triggers-new">
                  <React.Fragment key={trigger.id}>
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
                    <Col md="3" className="text-nowrap">
                      <ThumbnailCondition condition={trigger.condition} />
                      {/* {conditionToText(trigger.condition)} */}
                    </Col>
                    <Col md="3">
                      <ThumbnailLocation
                        location={trigger.location}
                        showIcon={false}
                      />
                    </Col>
                    <Col md="1" className="text-nowrap">
                      {trigger.days} {trigger.days === 1 ? 'day' : 'days'}
                    </Col>
                    {emailsAllowed && <Col>{trigger.recipients.length}</Col>}
                    <Col
                      md="1"
                      style={{
                        color: trigger.status === 'on' ? 'green' : 'red',
                      }}
                    >
                      {trigger.status.charAt(0).toUpperCase() +
                        trigger.status.slice(1)}
                    </Col>

                    <Col md="1">
                      <EditTriggerCard
                        id={trigger.id}
                        userId={userId}
                        data={data}
                        setData={setData}
                        name={trigger.name}
                        status={trigger.status}
                      />
                      {'  '}
                      <DeleteTriggerCardX
                        id={trigger.id}
                        userId={userId}
                        data={data}
                        setData={setData}
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                      />
                    </Col>
                  </React.Fragment>
                </Row>
              ),
          )}
        </>
      ) : (
        <Row>
          <Col>
            <p>
              <b>No triggers.</b>
            </p>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default Triggers
