import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { Error } from 'react-ikonate'
import { useSelector } from 'react-redux'

import { getEventsByTriggerId } from '../api/api'
import { toDate } from '../utils/dateTime'
import BeatLoader from './BeatLoader'

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
        <button
          type="button"
          disabled
          className="d-flex align-items-center button-orange"
          style={{ border: 'none' }}
        >
          <Error style={{ marginRight: '5px' }} />
          {events.length} upcoming event
          {events.length === 1 ? '' : 's'}
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="d-flex align-items-center button-turquoise"
          style={{ border: 'none' }}
        >
          No active events
        </button>
      )}

      <div style={{ minHeight: '100px' }}>
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
