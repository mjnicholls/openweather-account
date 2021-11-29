import React, { useEffect, useState } from 'react'

import { ChevronDown } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'

import { getEvents } from '../api/api'
import { tariff } from '../config'
import humanReadableCondition from '../humanReadableCondition'
import { toDate } from '../utils/dateTime'
import '../App.scss'

const selectUserId = (state) => state.auth.user_id

const Events = () => {
  const userId = useSelector(selectUserId)

  const [data, setData] = useState([])

  const myTariff = tariff.enterprise

  const openEventsN = 3

  useEffect(() => {
    getEvents(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [userId])

  return (
    <>
      <div className="forecast">
        <Row className="search-box">
          <Col>
            <h2>Events</h2>
          </Col>
          <Col className="text-end title">
            <Link to="/triggers">
              <Button className="button-neutral">To triggers</Button>
            </Link>
            <Link to="/create">
              <Button className="button-active">Create new trigger</Button>
            </Link>
          </Col>
        </Row>
        <Row className="search-box">
          {data < 1 ? (
            <Row className="search-box">
              <h3>No events for upcoming days.</h3>
            </Row>
          ) : (
            data.map((day) => (
              <Col md="6" key={day.day}>
                <Row className="search-box">
                  <Col mt="20">
                    <h4>{toDate(day.day)}</h4>
                  </Col>
                  <Col className="text-end">
                    <span className="button-turquoise">
                      {day.triggers.length} events
                    </span>
                  </Col>
                  <Col className="mb-0" md="12" mt="10">
                    <Card>
                      <CardBody>
                        {day.triggers.length ? (
                          day.triggers
                            .slice(0, openEventsN)
                            .map((trigger, index) => (
                              <React.Fragment key={trigger.id}>
                                <div className="row">
                                  <div className="col-md-1 mb-4">
                                    {index + 1}
                                  </div>
                                  <div className="col-md-4 mb-4">
                                    {' '}
                                    <Link
                                      to={{
                                        pathname: '/trigger',
                                        state: trigger,
                                      }}
                                    >
                                      {trigger.name}
                                    </Link>
                                  </div>
                                  <div className="col-md-6 mb-4">
                                    {humanReadableCondition(
                                      trigger.condition,
                                    ).substring(28)}
                                  </div>
                                </div>
                                <div className="row mb-4">
                                  <div className="col-md-1 mb-2">&nbsp;</div>
                                  <div className="col-md-4 mb-2">
                                    {trigger.location.lat},{' '}
                                    {trigger.location.lon}
                                  </div>
                                  {myTariff === 'free' ? (
                                    <div className="col-md-4">&nbsp;</div>
                                  ) : (
                                    <div className="col-md-6 small">
                                      <i>
                                        Notification has been sent to{' '}
                                        {trigger.recipients.length} recipients
                                      </i>
                                    </div>
                                  )}
                                </div>
                              </React.Fragment>
                            ))
                        ) : (
                          <div className="row">
                            <div className="col">
                              <i>No events.</i>
                            </div>
                          </div>
                        )}

                        {day.triggers.length > openEventsN && (
                          <>
                            <a
                              className="button-neutral see-more-collapse"
                              data-toggle="collapse"
                              href={`#collapse_${day.day}`}
                              role="button"
                              aria-expanded="false"
                              aria-controls={`collapse_${day.day}`}
                            >
                              <ChevronDown className="see-more-chevron" />
                            </a>
                            <div
                              className="collapse"
                              id={`collapse_${day.day}`}
                            >
                              {day.triggers
                                .slice(openEventsN)
                                .map((trigger, index) => (
                                  <React.Fragment key={trigger.id}>
                                    <div className="row">
                                      <div>{index + openEventsN + 1}</div>
                                      <div>
                                        {' '}
                                        <Link
                                          to={{
                                            pathname: '/trigger',
                                            state: trigger,
                                          }}
                                        >
                                          {trigger.name}
                                        </Link>
                                      </div>
                                      <div>
                                        {humanReadableCondition(
                                          trigger.condition,
                                        ).substring(28)}
                                      </div>
                                    </div>
                                    <div className="sort">
                                      <div>&nbsp;</div>
                                      <div>
                                        {trigger.location.lat},{' '}
                                        {trigger.location.lon}
                                      </div>
                                      <div>
                                        <i>
                                          Notification has been sent to{' '}
                                          {trigger.recipients.length} recipients
                                        </i>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                ))}
                            </div>
                          </>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            ))
          )}
        </Row>
      </div>
    </>
  )
}

export default Events
