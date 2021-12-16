import React, { useEffect, useState } from 'react'

import { Ellypsis } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Row, Col, Button } from 'reactstrap'

import { getEvents } from '../api/api'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import Event from '../components/Event'
import EventOld from '../components/EventOld'
import EventPlaceholder from '../components/EventPlaceholder'
import { toDate } from '../utils/dateTime'
import '../App.scss'
import NumberEventsBadge from '../components/NumberEventsBadge'

const selectUserId = (state) => state.auth.user.id

const Events = () => {
  const userId = useSelector(selectUserId)
  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState([])

  const openEventsN = 3
  const contentLoader = 4

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
      <Row className="py-5">
        <Col>
          <h2 className="m-0 p-0">Events</h2>
        </Col>
        <Col className="text-end title">
          <Link to="/triggers">
            <Button className="button-neutral shadow-none">To triggers</Button>
          </Link>
          <CreateNewTriggerButton />
        </Col>
      </Row>

      {isLoading ? (
        <>
          <Row>
            {[...Array(contentLoader)].map(() => (
              <Col className="my-3" md="6" mt="10">
                <EventPlaceholder />
              </Col>
            ))}
          </Row>
        </>
      ) : data.length ? (
        <Row>
          {data.map((day) => (
            <React.Fragment key={day.day}>
              <Col md="6">
                <Row>
                  <Col className="mb-0" md="12" mt="10">
                    <Card className="mb-5 event-card">
                      <CardHeader>
                        <h3 className="mb-0">{toDate(day.day)}</h3>
                        <NumberEventsBadge number={day.triggers.length} />
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
                              className="link-flat see-more-collapse d-inline-flex align-items-end flex-grow-0 ms-0"
                              data-toggle="collapse"
                              href={`#collapse_${day.day}`}
                              role="button"
                              aria-expanded="false"
                              aria-controls={`collapse_${day.day}`}
                            >
                              <span>See more&nbsp;</span>
                              <Ellypsis />
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
      ) :
      <Row>
        <Col>
          <h4>No events</h4>
        </Col>
      </Row>

      }
    </div>
  )
}

export default Events
