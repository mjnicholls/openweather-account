import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { getEventsByTriggerId } from '../api/api'
import { toDate } from '../utils/dateTime'
import BeatLoader from './BeatLoader'
import EventsPerDay from './EventsPerDay'

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
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h5>Upcoming events</h5>
        <EventsPerDay number={events.length} />
      </div>

      <div>
        {isLoading ? (
          <BeatLoader />
        ) : events.length ? (
          <ul style={{ paddingTop: '10px' }}>
            {events.map((event) => (
              <li key={event.id}>{toDate(event.date)}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

TriggerEvents.propTypes = {
  triggerId: PropTypes.string,
}

export default TriggerEvents
