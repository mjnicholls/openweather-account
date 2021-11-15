/*eslint-disable*/
import React, { useEffect, useState, useTable } from 'react'

import { useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import '../App.scss'
import { Link } from 'react-router-dom'
import { getTriggers } from '../api/api'
import humanReadableCondition from '../humanReadableCondition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
// import AgroPagination from '../agro-components/AgroPagination'

import '../App.scss'

const selectUserId = (state) => state.auth.user_id

const ForecastedEvents = () => {
  const userId = useSelector(selectUserId)
  const [data, setData] = useState([])

  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    getTriggers(userId)
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
          <Col md="6">
            <Row className="search-box">
              <Col mt="20">
                <h4>27 October 2021</h4>
              </Col>
              <Col>
                <Button className="button-turquoise">5 Events</Button>
              </Col>
            </Row>
            <Row>
              <Col className="mb-0" md="12" mt="20">
                <Card>
                  <CardBody>
                    <Table className="mb-3">
                      <tbody>
                        {data.map(
                          (trigger, index) =>
                            trigger.status !== 'deleted' && (
                              <>
                                <tr>
                                  <td>{index + 1}</td>

                                  <td>
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
                            ),
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <a
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="text-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="bottom"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                />
              </a>
              <p className="collapse" id="collapseExample">
                <p>test</p>
              </p>
            </Row>
          </Col>
          <Col md="6">
            <Row className="search-box">
              <Col mt="20">
                <h4>27 October 2021</h4>
              </Col>
              <Col>
                <Button className="button-turquoise">5 Events</Button>
              </Col>
            </Row>
            <Row>
              <Col className="mb-0" md="12" mt="20">
                <Card>
                  <CardBody>
                    <Table className="mb-3">
                      <tbody>
                        {data.map(
                          (trigger, index) =>
                            trigger.status !== 'deleted' && (
                              <>
                                <tr>
                                  <td>{index + 1}</td>

                                  <td>
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
                            ),
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ForecastedEvents
