/*eslint-disable*/
import React, { useEffect, useState } from 'react'

import {useSelector} from 'react-redux'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import '../App.scss'
import { Link } from 'react-router-dom'
import { getEvents } from '../api/api'
import humanReadableCondition from '../humanReadableCondition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { toDate } from '../utils/dateTime'
// import AgroPagination from '../agro-components/AgroPagination'

import '../App.scss'

const selectUserId = (state) => state.auth.user_id

const ForecastedEvents = () => {

  const userId = useSelector(selectUserId)

  const [isOpen, setIsOpen] = useState({})
  const [data, setData] = useState([])

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
          {data.map((day) => {
            return (
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
                            {day.triggers.slice(0, 3).map((trigger, index) =>
                              day.triggers.length !== 0 ? (
                                <>
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
                                    <td></td>
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
                                </>
                              ) : (
                                <>
                                  <tr>
                                    <td>No events.</td>
                                  </tr>
                                </>
                              ),
                            )}
                          </tbody>
                          {day.triggers.length > 3 && (
                            <a
                              data-toggle="collapse"
                              href="#collapseExample"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                              className="text-end"
                              onClick={() => handleClick(day.day)}
                            >
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                className="text-end"
                                style={{
                                  transform: isOpen[day.day]
                                    ? 'rotate(180deg)'
                                    : 'none',
                                }}
                              />
                            </a>
                          )}
                          {isOpen[day.day] &&
                            day.triggers.slice(3).map((trigger, index) => (
                              <>
                                <tbody
                                  className="collapse"
                                  id="collapseExample"
                                >
                                  <tr>
                                    <td>{index + 4}</td>
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
                                    <td></td>
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
                                </tbody>
                              </>
                            ))}
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}

export default ForecastedEvents
