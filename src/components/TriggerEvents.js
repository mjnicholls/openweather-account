import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { Error } from 'react-ikonate'
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
      {isLoading ? (
        <h6>Upcoming events</h6>
      ) : events.length ? (
        <EventsPerDay number={events.length} seeMoreLink={null} />

        // <h6>
        //   <Error /> {events.length} upcoming event
        //   {events.length === 1 ? '' : 's'}
        // </h6>

      ) : (
        <h6>No active events</h6>
      )}

      <div style={{ minHeight: '100px' }}>
        {isLoading ? (
          <BeatLoader />
        ) : events.length ? (
          <ul>
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
