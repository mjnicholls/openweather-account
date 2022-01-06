import React from 'react'

import PropTypes from 'prop-types'
import { ChevronDown, Error } from 'react-ikonate'

const EventsPerDay = ({ number, isOpen, onClick }) => (
  <button
    type="button"
    className={`align-items-center ${
      number ? 'button-orange' : 'button-turquoise'
    }`}
    style={{ border: 'none', display: 'inline-flex' }}
    onClick={onClick}
    disabled={!onClick}
  >
    {number > 0 && <Error style={{ marginRight: '4pt', color: '#ffffff' }} />}
    <span>
      {number} event{number === 1 ? '' : 's'}&nbsp;
    </span>
    {onClick && (
      <ChevronDown
        style={{
          color: '#ffffff',
          transform: isOpen ? 'rotate(180deg)' : 'none',
        }}
      />
    )}
  </button>
)

EventsPerDay.propTypes = {
  number: PropTypes.number,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
}

export default EventsPerDay
