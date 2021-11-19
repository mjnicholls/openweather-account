import React, { useEffect, useState } from 'react'

import { ArrowDown } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { getEvents } from '../api/api'
import humanReadableCondition from '../humanReadableCondition'
import { toDate } from '../utils/dateTime'

import '../App.scss'

const selectUserId = (state) => state.auth.user_id

const ForecastedEvents = () => {
  const userId = useSelector(selectUserId)

  const [isOpen, setIsOpen] = useState({})
  const [data, setData] = useState([])

  const openEventsN = 3

  const handleClick = (day) => {
    const newIsOpen = { ...isOpen }
    newIsOpen[day] = !newIsOpen[day]
    setIsOpen(newIsOpen)
    console.log(newIsOpen)
  }

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
            <h2>Forecasted Events</h2>
          </Col>
          <Col className="text-end title">
            <Link to="/trigger-list">
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
          ) : data.map((day) => (
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
                          {day.triggers.length ?
                            day.triggers.slice(0, openEventsN).map((trigger, index) =>
                              (<React.Fragment key={trigger.id}>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    {' '}
                                    <Link
                                      to={{
                                        pathname: '/view-trigger',
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
                            )) : <tr><td>No events</td></tr>
                          }

                          {day.triggers.length > openEventsN && (
                            <>
                            <tr>
                              <td className="text-center" colSpan={3}>
                                <a
                                    data-toggle="collapse"
                                    href={`#collapse${day.day}`}
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls={`collapse${day.day}`}
                                    // onClick={() => handleClick(day.day)}
                                  >
                                    <ArrowDown
                                      style={{
                                        transform: isOpen[day.day]
                                          ? 'rotate(180deg)'
                                          : 'none',
                                      }}
                                    />
                                  </a>
                              </td>
                            </tr>
                            <div
                              className="collapse"
                              id={`#collapse${day.day}`}
                            >
                            {day.triggers.slice(openEventsN).map((trigger, index) => (
                              <tbody key={trigger.id}>
                                <tr>
                                  <td>{index + openEventsN + 1}</td>
                                  <td>
                                    {' '}
                                    <Link
                                      to={{
                                        pathname: '/view-trigger',
                                        state: trigger,
                                      }}
                                    >
                                      {trigger.name}
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>))}
                            </div>
                            </>)}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            ))
          }
        </Row>
      </div>
    </>
  )
}

export default ForecastedEvents
