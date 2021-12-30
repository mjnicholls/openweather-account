import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import { getEvents } from '../api/api'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import Day from '../components/Day'
import DayPlaceholder from '../components/DayPlaceholder'

const selectUserId = (state) => state.auth.user.id
const selectTriggers = (state) => state.triggers

const Events = () => {
  const userId = useSelector(selectUserId)
  const { isFetching, error, data } = useSelector(selectTriggers)
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])
  const history = useHistory()
  const handleCreateClick = () => history.push('/dashboard/triggers/create')

  const contentLoader = 4

  useEffect(() => {
    setIsLoading(true)
    getEvents(userId)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  const PlaceholderWords = () => {
    let res = null
    if (!isFetching) {
      if (data.length) {
        res = <p>No forecasted events for the next 3 days</p>
      } else {
        res = (
          <>
            {/*<p><b>No events</b></p>*/}
            <p>
              Here you will find notifications if the conditions of the triggers
              you created will be met.
            </p>
            <p>
              Please{' '}
              <Link to="/dashboard/triggers/create" className="link-flat">
                create a trigger
              </Link>{' '}
              so that we can notify you if the specified weather events are
              predicted in the future for any chosen location on the globe.
            </p>
          </>
        )
      }
    }
    return res
  }

  return (
    <div className="page-container page-padding">
      <Row className="first-row">
        <Col>
          <h2>Events</h2>
        </Col>
        <Col className="text-end title">
          <Link
            role="button"
            to="/dashboard/triggers"
            className="button-neutral"
          >
            To triggers
          </Link>
          <CreateNewTriggerButton createFunc={handleCreateClick} />
        </Col>
      </Row>

      {isLoading ? (
        <>
          <Row>
            {[...Array(contentLoader)].map((_, index) => (
              // eslint-disable-next-line
              <Col key={index} className="my-3" md="6" mt="10">
                <DayPlaceholder />
              </Col>
            ))}
          </Row>
        </>
      ) : events.length ? (
        <Row>
          {events.map((day) => (
            <Col md="6" className="mb-0" key={day.day}>
              <Day day={day} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <PlaceholderWords />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default Events
