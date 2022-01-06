import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap'

import { toDate } from '../utils/dateTime'
import Event from './Event'
import EventsPerDay from './EventsPerDay'

const Day = ({ day }) => {
  const openEventsN = 3

  const [isOpen, setIsOpen] = useState(false)

  const toggleEvents = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Card className="mb-5 trigger-card">
      <CardHeader className="d-flex align-items-center justify-content-between">
        <h3 className="mb-0">{toDate(day.day)}</h3>
        <EventsPerDay
          number={day.triggers.length}
          isOpen={isOpen}
          onClick={day.triggers.length > openEventsN ? toggleEvents : null}
        />
      </CardHeader>
      <CardBody>
        {day.triggers.length ? (
          day.triggers
            .slice(0, openEventsN)
            .map((trigger, index) => (
              <Event trigger={trigger} index={index} key={trigger.id} />
            ))
        ) : (
          <div className="m-3">
            <p>No events</p>
          </div>
        )}

        {day.triggers.length > openEventsN && (
          <Collapse isOpen={isOpen}>
            {day.triggers.slice(openEventsN).map((trigger, index) => (
              <Event
                trigger={trigger}
                index={index + openEventsN}
                key={trigger.id}
              />
            ))}
          </Collapse>
        )}
      </CardBody>
    </Card>
  )
}

Day.propTypes = {
  day: PropTypes.object,
}

export default Day
