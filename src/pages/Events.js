import React, { useEffect, useState } from 'react'

import { ChevronDown } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col, Button } from 'reactstrap'

import { getEvents } from '../api/api'
import humanReadableCondition from '../humanReadableCondition'
import { toDate } from '../utils/dateTime'
import '../App.scss'

const selectUserId = (state) => state.auth.user_id

const selectTariff = (state) => state.auth.tariff

const Events = () => {
  const userId = useSelector(selectUserId)
  const myTariff = useSelector(selectTariff)

  const [data, setData] = useState([])

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
              <Button className="button-neutral shadow-none">
                To triggers
              </Button>
            </Link>
            <Link to="/create">
              <Button className="button-active shadow-none">
                Create new trigger
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="search-box">
          {data.map((day) => (
            <Col md="6" key={day.day}>
              <Row className="search-box">
                <Col mt="20">
                  <h4>
                    {toDate(day.day)}
                    {day.triggers.length >= 1 ? (
                      <span
                        style={{ marginLeft: '20px' }}
                        className="button-orange"
                      >
                        {day.triggers.length} events
                      </span>
                    ) : (
                      <span
                        style={{ marginLeft: '20px' }}
                        className="button-turquoise"
                      >
                        {day.triggers.length} events
                      </span>
                    )}
                  </h4>
                </Col>

                <Col></Col>
                <Col className="mb-0" md="12" mt="10">
                  <Card>
                    <CardBody>
                      {day.triggers.length ? (
                        day.triggers
                          .slice(0, openEventsN)
                          .map((trigger, index) => (
                            <React.Fragment key={trigger.id}>
                              <div className="row">
                                <div className="col-md-1 mb-2">{index + 1}</div>
                                <div className="col-md-4 mb-2">
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
                                <div className="col-md-6 mb-2">
                                  {humanReadableCondition(
                                    trigger.condition,
                                  ).substring(28)}
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-md-1 mb-2">&nbsp;</div>
                                <div className="col-md-4 mb-2">
                                  {trigger.location.name}
                                </div>
                                {myTariff === 'free' ? (
                                  <div className="col-md-4">&nbsp;</div>
                                ) : (
                                  <div className="col-md-6 small">
                                    {trigger.recipients.length === 0 ? (
                                      ''
                                    ) : (
                                      <i>
                                        Notification has been sent to{' '}
                                        {trigger.recipients.length} recipients
                                      </i>
                                    )}
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
                          <div className="collapse" id={`collapse_${day.day}`}>
                            {day.triggers
                              .slice(openEventsN)
                              .map((trigger, index) => (
                                <React.Fragment key={trigger.id}>
                                  <div className="row">
                                    <div className="col-md-1 mb-2">
                                      {index + openEventsN + 1}
                                    </div>
                                    <div className="col-md-4 mb-2 text-align-left">
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
                                    <div className="col-md-6 mb-2">
                                      {humanReadableCondition(
                                        trigger.condition,
                                      ).substring(28)}
                                    </div>
                                  </div>
                                  <div className="row mb-4">
                                    <div className="col-md-1 mb-2">&nbsp;</div>
                                    <div className="col-md-4 mb-2">
                                      {trigger.location.name}
                                    </div>
                                    <div className="col-md-6 mb-2 small">
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
          ))}
        </Row>
      </div>
    </>
  )
}

export default Events
