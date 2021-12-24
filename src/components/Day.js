import React from 'react'

import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader } from 'reactstrap'

import { toDate } from '../utils/dateTime'
import Event from './Event'
import EventsPerDay from './EventsPerDay'

const Day = ({ day }) => {
  const openEventsN = 3
  const collapseId =
    day.triggers.length > openEventsN ? `collapse_${day.day}` : null
  const borderRadius = '8pt' // TODO move to css
  return (
    <Card className="mb-5" style={{ borderRadius }}>
      <CardHeader
        style={{
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ paddingTop: '8pt', paddingBottom: '8pt' }}
        >
          <h3 className="mb-0">{toDate(day.day)}</h3>
          <EventsPerDay number={day.triggers.length} seeMoreLink={collapseId} />
        </div>
      </CardHeader>
      <CardBody
        className="p-0"
        style={{
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
      >
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
          <>
            <div className="collapse" id={collapseId}>
              {day.triggers.slice(openEventsN).map((trigger, index) => (
                <Event
                  trigger={trigger}
                  index={index + openEventsN}
                  key={trigger.id}
                />
              ))}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}

Day.propTypes = {
  day: PropTypes.object,
}

export default Day
