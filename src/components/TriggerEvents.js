import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'

import { getEventsByTriggerId } from '../api/api'
import BeatLoader from './BeatLoader'
import EventThumbnail from './ThumbnailEvent'

const selectUserId = (state) => state.auth.user.id

const TriggerEvents = ({ triggerId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])

  const userId = useSelector(selectUserId)

  useEffect(() => {
    setIsLoading(true)
    if (triggerId) {
      getEventsByTriggerId(triggerId, userId)
        .then((res) => {
          setEvents(res.data)
        })
        .catch((err) => {
          console.log('error', err)
          // TODO set error getting events
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [triggerId, userId])

  return (
    <div className="my-5">
      <Row>
        <Col>
          <h3>Upcoming events</h3>
        </Col>
      </Row>
      <Row style={{ minHeight: '100px' }}>
        <Col>
          {isLoading ? (
            <BeatLoader />
          ) : events.length ? (
            events.map((event) => (
              <EventThumbnail key={event.id} dt={event.date} />
            ))
          ) : (
            <h6 className="mb-2">No active events</h6>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default TriggerEvents
