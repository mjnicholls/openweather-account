import React from 'react'

import PropTypes from 'prop-types'
import Select from 'react-select'

import { owmSelectorStyle } from '../utils/styles'
import EmailNotifications from './EmailNotifcations'

const Notifications = ({ days, setDays, recipients, setRecipients }) => {
  const options = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
  ]

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h5>Notifications: </h5>
      </div>
      {/* <Label>Up to</Label> */}
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
      <EmailNotifications
        recipients={recipients}
        setRecipients={setRecipients}
      />
    </>
  )
}

Notifications.propTypes = {
  days: PropTypes.number,
  setDays: PropTypes.func,
}

export default Notifications
