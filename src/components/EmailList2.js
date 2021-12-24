import React from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const selectLimits = (state) => state.auth.limits.email_recipients

const EmailList = ({ recipients }) => {
  const emailsAllowed = useSelector(selectLimits)

  return emailsAllowed ? (
    <div style={{ maxWidth: '500px' }}>
      <h5>Email recipients</h5>
      {recipients.length ? (
        recipients.map((email) => (
          <span className="item-view" key={email}>
            {email}
          </span>
        ))
      ) : (
        <p>None</p>
      )}
    </div>
  ) : null
}

EmailList.propTypes = {
  recipients: PropTypes.arrayOf(PropTypes.string),
}

export default EmailList
