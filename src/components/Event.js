import React from 'react'

import { EnvelopeAlt } from 'react-ikonate'
import { Link } from 'react-router-dom'

import { conditionToText } from '../utils/conditionText'
import TriggerLocation from './TriggerLocation'

const Event = ({ trigger, index }) => {

  const emailsSent = trigger.recipients.length

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <Link
          to={{
            pathname: '/trigger',
            state: trigger,
          }}
        >
          <h6 className="m-0">
            {index + 1}. {trigger.name}
          </h6>
        </Link>
        {emailsSent > 0 && (
          <div
            className="d-flex align-items-center"
            data-toggle="tooltip"
            title={`${emailsSent} email${emailsSent > 1 ? 's' : ''} sent`}
          >
            <EnvelopeAlt
              color="#48484a"
              title={`${emailsSent} email${emailsSent > 1 ? 's' : ''} sent`}
            />
            <span
              style={{
                // color: '#78CBBF',
                fontSize: '0.9rem',
                // fontWeight: 'bold',
              }}
              className="ms-1"
            >
              {`${emailsSent} email${emailsSent > 1 ? 's' : ''} sent`}
            </span>
          </div>
        )}
      </div>
      <TriggerLocation location={trigger.location} />
      <div>
        <span>{conditionToText(trigger.condition)}</span>
      </div>
    </div>
  )
}

export default Event
