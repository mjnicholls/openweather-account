import React, { useEffect, useState } from 'react'

import { ChevronDown } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'

import { getEvents } from '../api/api'
import humanReadableCondition from '../humanReadableCondition'
import { toDate } from '../utils/dateTime'

import '../App.scss'

const selectUserId = (state) => state.auth.user_id

const Events = () => {
  const userId = useSelector(selectUserId)

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
              <h2>No events for upcoming days.</h2>
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
                  <Col className="mb-0" md="12" mt="20">
                    <Card>
                      <CardBody>
                        <Table className="mb-3">
                          <tbody>
                            {day.triggers.length ? (
                              day.triggers
                                .slice(0, openEventsN)
                                .map((trigger, index) => (
                                  <React.Fragment key={trigger.id}>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>
                                        {' '}
                                        <Link
                                          to={{
                                            pathname: '/trigger',
                                            state: trigger,
                                          }}
                                        >
                                          {trigger.name}
                                        </Link>
                                      </td>
                                      <td>
                                        {humanReadableCondition(
                                          trigger.condition,
                                        ).substring(28)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                      <td className="smaller">
                                        {trigger.location.lat},{' '}
                                        {trigger.location.lon}
                                      </td>
                                      <td className="smaller">
                                        <i>
                                          Notification has been sent to{' '}
                                          {trigger.recipients.length} recipients
                                        </i>
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                ))
                            ) : (
                              <tr>
                                <td>No events</td>
                              </tr>
                            )}
                          </tbody>
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
                              <tbody
                                className="collapse"
                                id={`collapse_${day.day}`}
                              >
                                {day.triggers
                                  .slice(openEventsN)
                                  .map((trigger, index) => (
                                    <React.Fragment key={trigger.id}>
                                      <tr>
                                        <td>{index + openEventsN + 1}</td>
                                        <td>
                                          {' '}
                                          <Link
                                            to={{
                                              pathname: '/trigger',
                                              state: trigger,
                                            }}
                                          >
                                            {trigger.name}
                                          </Link>
                                        </td>
                                        <td>
                                          {humanReadableCondition(
                                            trigger.condition,
                                          ).substring(28)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>&nbsp;</td>
                                        <td className="smaller">
                                          {trigger.location.lat},{' '}
                                          {trigger.location.lon}
                                        </td>
                                        <td className="smaller">
                                          <i>
                                            Notification has been sent to{' '}
                                            {trigger.recipients.length}{' '}
                                            recipients
                                          </i>
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  ))}
                              </tbody>
                            </>
                          )}
                        </Table>
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
