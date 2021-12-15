/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { ChevronDown } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Row, Col, Button } from 'reactstrap'

import { getEvents } from '../api/api'
import { toDate } from '../utils/dateTime'
import '../App.scss'
import Event from '../components/Event'
import EventOld from '../components/EventOld'
import EventPlaceholder from '../components/EventPlaceholder'

const selectUserId = (state) => state.auth.user_id

const Events = () => {
  const userId = useSelector(selectUserId)

  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState([])

  const openEventsN = 3

  useEffect(() => {
    setIsLoading(true)
    getEvents(userId)
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
    <div>
      <Row className="search-box">
        <Col>
          <h2>Events</h2>
        </Col>
        <Col className="text-end title">
          <Link to="/triggers">
            <Button className="button-neutral shadow-none">To triggers</Button>
          </Link>
          <Link to="/create">
            <Button className="button-active shadow-none">
              Create new trigger
            </Button>
          </Link>
        </Col>
      </Row>
      {isLoading ? (
        <>
          <Row className="search-box">
            <Col className="mb-0" md="6" mt="10">
              <EventPlaceholder />
            </Col>
            <Col className="mb-0" md="6" mt="10">
              <EventPlaceholder />
            </Col>
          </Row>
          <Row className="search-box">
            <Col className="mb-0" md="6" mt="10">
              <EventPlaceholder />
            </Col>
            <Col className="mb-0" md="6" mt="10">
              <EventPlaceholder />
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          {data.map((day) => (
            <React.Fragment key={day.day}>
              <Col md="6">
                <Row>
                  <Col className="mb-0" md="12" mt="10">
                    <Card className="mb-5 event-card">
                      <CardHeader>
                        <h3 className="mb-0">{toDate(day.day)}</h3>
                        <span
                          className={`ms-3 ${
                            day.triggers.length
                              ? 'button-orange'
                              : 'button-turquoise'
                          }`}
                        >
                          {day.triggers.length} events
                        </span>
                      </CardHeader>
                      <CardBody>
                        {day.triggers.length ? (
                          day.triggers
                            .slice(0, openEventsN)
                            .map((trigger, index) => (
                              <Event
                                trigger={trigger}
                                index={index}
                                key={trigger.id}
                              />
                            ))
                        ) : (
                          <div className="row">
                            <div className="col">
                              <i>No events.</i>
                            </div>
                          </div>
                        )}

                        {day.triggers.length > openEventsN && (
                          <React.Fragment key={day.triggers.recipients}>
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
                                  <EventOld
                                    trigger={trigger}
                                    index={index + openEventsN}
                                    key={trigger.id}
                                  />
                                ))}
                            </div>
                          </React.Fragment>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      )}
    </div>
  )
}

export default Events
