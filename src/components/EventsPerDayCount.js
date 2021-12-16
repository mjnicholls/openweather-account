import React from 'react'

import PropTypes from 'prop-types'
import { Error } from 'react-ikonate'

const EventsPerDayCount = ({ number }) => (
  <div
    className={`ms-3 d-flex-inline align-items-center ${
      number ? 'button-orange' : 'button-turquoise'
    }`}
    style={{ cursor: 'auto' }}
  >
    {number > 0 && <Error color="#ffffff" style={{ marginRight: '4pt' }} />}
    <span>
      {number} event{number > 1 ? 's' : ''}
    </span>
  </div>
)

EventsPerDayCount.propTypes = {
  number: PropTypes.number,
}

export default EventsPerDayCount
