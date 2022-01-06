import React from 'react'

import PropTypes from 'prop-types'
import { EnvelopeAlt } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { conditionToText } from '../utils/utils'
import ThumbnailLocation from './ThumbnailLocation'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const Event = ({ trigger, index }) => {
  const emailsAllowed = useSelector(selectEmailsAllowed)
  const emailsRecipients = trigger.recipients.length

  return (
    <Link
      to={{
        pathname: '/dashboard/trigger',
        id: trigger.id,
      }}
      className="section-link"
    >
      <div className="event" style={{}}>
        <div className="single-event p-4">
          <div>{index + 1}</div>
          <div>
            <h6 className="m-0">{trigger.name}</h6>
            <div className="mt-2">
              <ThumbnailLocation location={trigger.location} />
            </div>
            <span>{conditionToText(trigger.condition)}</span>
          </div>
          {emailsAllowed && (
            <div
              className="d-flex align-items-center subcolor"
              data-toggle="tooltip"
              title={`${emailsRecipients} email${
                emailsRecipients === 1 ? '' : 's'
              } sent`}
            >
              <EnvelopeAlt
                color="#666"
                title={`${emailsRecipients} email${
                  emailsRecipients === 1 ? '' : 's'
                } sent`}
              />
              <span className="ms-1 small-text">{emailsRecipients}</span>
              <span className="ms-1 small-text d-none d-xl-block">
                {` email${emailsRecipients === 1 ? '' : 's'} sent`}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

Event.propTypes = {
  index: PropTypes.number,
  trigger: PropTypes.object,
}

export default Event
