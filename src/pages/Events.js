import React, { useEffect, useState } from 'react'

import ContentLoader from 'react-content-loader'
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
    <>
      {isLoading ? (
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
            <Col className="mb-0" md="6" mt="10">
              <Card>
                <CardBody>
                  <ContentLoader
                    speed={2}
                    width={400}
                    height={160}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...isLoading}
                  >
                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                    <circle cx="20" cy="20" r="20" />
                  </ContentLoader>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-0" md="6" mt="10">
              <Card>
                <CardBody>
                  <ContentLoader
                    speed={2}
                    width={400}
                    height={160}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...isLoading}
                  >
                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                    <circle cx="20" cy="20" r="20" />
                  </ContentLoader>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="search-box">
            <Col className="mb-0" md="6" mt="10">
              <Card>
                <CardBody>
                  <ContentLoader
                    speed={2}
                    width={400}
                    height={160}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...isLoading}
                  >
                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                    <circle cx="20" cy="20" r="20" />
                  </ContentLoader>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-0" md="6" mt="10">
              <Card>
                <CardBody>
                  <ContentLoader
                    speed={2}
                    width={400}
                    height={160}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...isLoading}
                  >
                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                    <circle cx="20" cy="20" r="20" />
                  </ContentLoader>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
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
              <React.Fragment key={day.day}>
                <Col md="6">
                  <Row className="search-box">
                    <Col mt="20">
                      <h4>
                        {toDate(day.day)}
                        {day.triggers.length >= 1 ? (
                          <span
                            style={{ marginLeft: '20px' }}
                            className="button-orange"
                            key={day.triggers.length}
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
                                    <div className="col-md-1 mb-2">
                                      {index + 1}
                                    </div>
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
                                    <div className="col-md-4 mb-2"></div>
                                    {myTariff === 'free' ? (
                                      <div className="col-md-4">&nbsp;</div>
                                    ) : (
                                      <div className="col-md-6 small">
                                        {trigger.recipients.length === 0 ? (
                                          ''
                                        ) : (
                                          <i>
                                            Notification has been sent to{' '}
                                            {trigger.recipients.length}{' '}
                                            recipient
                                            {trigger.recipients.length === 1
                                              ? ''
                                              : 's'}
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
                                    <React.Fragment key={trigger.rect}>
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
                                        <div className="col-md-1 mb-2">
                                          &nbsp;
                                        </div>
                                        <div className="col-md-4 mb-2">
                                          {trigger.location.name}
                                        </div>
                                        <div className="col-md-6 mb-2 small">
                                          <i>
                                            Notification has been sent to{' '}
                                            {trigger.recipients.length}{' '}
                                            recipient
                                            {trigger.recipients.length === 1
                                              ? ''
                                              : 's'}
                                          </i>
                                        </div>
                                      </div>
                                    </React.Fragment>
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
        </div>
      )}
    </>
  )
}

export default Events
