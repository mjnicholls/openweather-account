import React from 'react'

import PropTypes from 'prop-types'
import { Ellypsis } from 'react-ikonate'
import { Card, CardBody, CardHeader } from 'reactstrap'

import { toDate } from '../utils/dateTime'
import Event from './Event'
import NumberEventsBadge from './EventsPerDayCount'
import '../App.scss'

const Day = ({ day }) => {
  const openEventsN = 3

  return (
    <Card className="mb-5">
      <CardHeader>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ paddingTop: '8pt', paddingBottom: '8pt' }}
        >
          <h3 className="mb-0">{toDate(day.day)}</h3>
          <NumberEventsBadge number={day.triggers.length} />
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {day.triggers.length ? (
          day.triggers
            .slice(0, openEventsN)
            .map((trigger, index) => (
              <Event trigger={trigger} index={index} key={trigger.id} />
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
              className="link-flat see-more-collapse d-inline-flex align-items-end flex-grow-0 ms-0"
              data-toggle="collapse"
              href={`#collapse_${day.day}`}
              role="button"
              aria-expanded="false"
              aria-controls={`collapse_${day.day}`}
            >
              <span>See more&nbsp;</span>
              <Ellypsis />
            </a>
            <div className="collapse" id={`collapse_${day.day}`}>
              {day.triggers.slice(openEventsN).map((trigger, index) => (
                <Event
                  trigger={trigger}
                  index={index + openEventsN}
                  key={trigger.id}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </CardBody>
    </Card>
  )
}

Day.propTypes = {
  day: PropTypes.object,
}

export default Day
