/*eslint-disable*/
import React, { useEffect, useState, useTable } from 'react'

import { useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import '../App.scss'
import { Link } from 'react-router-dom'
import { getTriggers, getEvents } from '../api/api'
import humanReadableCondition from '../humanReadableCondition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
// import AgroPagination from '../agro-components/AgroPagination'

import '../App.scss'

const selectUserId = (state) => state.auth.user_id

const ForecastedEvents = () => {
  const userId = useSelector(selectUserId)
  const [data, setData] = useState([])

  const [isOpen, setIsOpen] = useState({})

  const handleClick = (day) => {
    const newIsOpen = {...isOpen}
    newIsOpen[day] = !newIsOpen[day]
    setIsOpen(newIsOpen)
    console.log(newIsOpen)
  }

  useEffect(() => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [userId])

  /*
  const eventSchema = {
    day: new Date(),
    triggers: [
      {
        name,
        user_id: userId,
        condition: {
          variable,
          condition,
          units,
          value,
        },
        days,
        recipients,
        location,
        status,
        id,
      },
    ],
  }
  */

  const events = [
    {
      day: 1637064000,
      triggers: [
        {
          name: 'EMAILS',
          user_id: 'some_id',
          condition: {
            variable: 'temp',
            condition: '<',
            units: 'metric',
            value: 100.0,
          },
          days: 4,
          recipients: ['email3', 'email2', 'email1', 'email4'],
          location: { lat: 0.0, lon: 0.0, name: 'Equator' },
          status: 'on',
          id: '6192abe07bd13aaf3c5c81d1',
        },
        {
          name: 'WIND',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
        {
          name: 'WIND',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
        {
          name: 'WINDOWWS',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
      ],
    },
    {
      day: 1637323200,
      triggers: [
        {
          name: 'EMAILS',
          user_id: 'some_id',
          condition: {
            variable: 'temp',
            condition: '<',
            units: 'metric',
            value: 100.0,
          },
          days: 4,
          recipients: ['email3', 'email2', 'email1', 'email4'],
          location: { lat: 0.0, lon: 0.0, name: 'Equator' },
          status: 'on',
          id: '6192abe07bd13aaf3c5c81d1',
        },
        {
          name: 'WINDOW',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
      ],
    },
    {
      day: 1637236800,
      triggers: [
        {
          name: 'EMAILS',
          user_id: 'some_id',
          condition: {
            variable: 'temp',
            condition: '<',
            units: 'metric',
            value: 100.0,
          },
          days: 4,
          recipients: ['email3', 'email2', 'email1', 'email4'],
          location: { lat: 0.0, lon: 0.0, name: 'Equator' },
          status: 'on',
          id: '6192abe07bd13aaf3c5c81d1',
        },
        {
          name: 'WINDOW',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
      ],
    },
    {
      day: 1637150400,
      triggers: [
        {
          name: 'EMAILS',
          user_id: 'some_id',
          condition: {
            variable: 'temp',
            condition: '<',
            units: 'metric',
            value: 100.0,
          },
          days: 4,
          recipients: ['email3', 'email2', 'email1', 'email4'],
          location: { lat: 0.0, lon: 0.0, name: 'Equator' },
          status: 'on',
          id: '6192abe07bd13aaf3c5c81d1',
        },
        {
          name: 'WINDDAS',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
        {
          name: 'WINDDAS',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
        {
          name: 'WINDDAS',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
        {
          name: 'WINDDAS',
          user_id: 'some_id',
          condition: {
            variable: 'wind',
            condition: '>',
            units: 'metric',
            value: 0.0,
          },
          days: 4,
          recipients: ['email4', 'email2', 'email5', 'email1', 'email3'],
          location: { lat: -2.45649, lon: 2.45649, name: 'Somewhere' },
          status: 'on',
          id: '6192b76234fbe0c4cde6508b',
        },
      ],
    },
  ]

  return (
    <>
      <div className="forecast">
        <Row className="search-box">
          <Col>
            <h2>Forecasted Events</h2>
          </Col>
          <Col className="text-end title">
            <Link to="/">
              <Button className="button-neutral">
                List of Forecasted Events
              </Button>
            </Link>
            <Link to="/create">
              <Button className="button-active">Create new trigger</Button>
            </Link>
          </Col>
        </Row>
        <Row className="search-box">
          {events.map((day) => {
            return (
                <Col md="6" key={day.day}>
                  <Row className="search-box">
                    <Col mt="20">
                      <h4>Date: {day.day}</h4>
                    </Col>
                    <Col>
                      <Button className="button-turquoise">
                        {day.triggers.length} Events
                      </Button>
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
                            {day.triggers.length > 3 && <a
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
                              </a>}
                            {isOpen[day.day] && day.triggers.slice(3).map((trigger, index) => (
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
