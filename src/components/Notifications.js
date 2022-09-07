import React from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Select from 'react-select'

import { owmSelectorStyle } from '../utils/styles'
import EmailNotifications from './EmailNotifcations'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const options = [
  { value: 3, label: '3' },
  { value: 2, label: '2' },
  { value: 1, label: '1' },
  { value: 0, label: '0' },
]

const Notifications = ({ days, setDays, recipients, setRecipients }) => {
  const emailsAllowed = useSelector(selectEmailsAllowed)




  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h5>Notifications</h5>
      </div>
      <div className="d-flex align-items-center">
        <Select
          onChange={(option) => setDays(parseFloat(option.value))}
          classNamePrefix="react-select"
          options={options}
          value={options.find((el) => el.value === 'days')}
          defaultValue={options[0]}
          styles={owmSelectorStyle}
        />
        <span>
          &nbsp;&nbsp;day{days === 1 ? '' : 's'}
          &nbsp;before an event starts
        </span>
      </div>

      <p className="human-readable">
        You will be notified{' '}
        {days === 0
          ? 'on the day of the event'
          : `if the event occurs in ${days} day${
              days === 1 ? '' : 's'
            } or earlier`}
      </p>
      <br />

      {emailsAllowed && (
        <EmailNotifications
          recipients={recipients}
          setRecipients={setRecipients}
        />
      )}
    </>
  )
}

Notifications.propTypes = {
  days: PropTypes.number,
  setDays: PropTypes.func,
  recipients: PropTypes.arrayOf(PropTypes.string),
  setRecipients: PropTypes.func,
}

export default Notifications
