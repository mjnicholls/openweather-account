import React from 'react'

import { EnvelopeAlt } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { conditionToText, notificationText } from '../utils/utils'
import ThumbnailCondition from './ThumbnailCondition'
import ThumbnailLocation from './ThumbnailLocation'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const Event = ({ trigger, index }) => {
  const emailsAllowed = useSelector(selectEmailsAllowed)
  const emailsRecipients = trigger.recipients.length

  return (
    <div  style={{ borderBottom: '1px solid #f2f2f2' }}>
      <div className="single-event p-4">
        <div>{index + 1}</div>
        <div>
          <Link
            to={{
              pathname: '/dashboard/trigger',
              state: trigger,
            }}
          >
            <h6 className="m-0">{trigger.name}</h6>
          </Link>
          <div className="mt-2">
            <ThumbnailLocation location={trigger.location} />
          </div>
          <span>{conditionToText(trigger.condition)}</span>
        </div>
        {emailsAllowed && (
          <div
            className="d-flex align-items-center"
            data-toggle="tooltip"
            title={`${emailsRecipients} email${
              emailsRecipients === 1 ? '' : 's'
            } sent`}
          >
            <EnvelopeAlt
              color="#48484a"
              title={`${emailsRecipients} email${
                emailsRecipients === 1 ? '' : 's'
              } sent`}
            />
            <span className="ms-1 small-text">
              {`${emailsRecipients} email${
                emailsRecipients === 1 ? '' : 's'
              } sent`}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Event
