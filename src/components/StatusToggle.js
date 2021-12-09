import React from 'react'

import PropTypes from 'prop-types'

const StatusToggle = ({ tempStatus, setTempStatus, setIsEdited }) => (
  <label className="switch">
    <input
      type="checkbox"
      checked={tempStatus === 'on'}
      onChange={() => {
        setTempStatus(tempStatus === 'on' ? 'off' : 'on')
        // setIsEdited(false)
      }}
    />
    <span className="slider round"></span>
  </label>
)

StatusToggle.propTypes = {
  tempStatus: PropTypes.bool,
  setTempStatus: PropTypes.func,
  // setIsEdited: PropTypes.bool,
}

export default StatusToggle
