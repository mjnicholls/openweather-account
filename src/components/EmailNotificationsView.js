import React from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const selectLimits = (state) => state.auth.limits.email_recipients

const EmailNotificationsView = ({ recipients }) => {
  const emailsAllowed = useSelector(selectLimits)

  return emailsAllowed ? (
    <div style={{ maxWidth: '500px' }}>
      <h5>Email recipients</h5>
      {recipients.length ? (
        recipients.map((email) => (
          <span className="item" key={email}>
            {email}
          </span>
        ))
      ) : (
        <p>None</p>
      )}
    </div>
  ) : null
}

EmailNotificationsView.propTypes = {
  recipients: PropTypes.arrayOf(PropTypes.string),
}

export default EmailNotificationsView
