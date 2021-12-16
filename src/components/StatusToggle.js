import React from 'react'

import PropTypes from 'prop-types'

const StatusToggle = ({ tempStatus, setTempStatus }) => {

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={tempStatus === 'on'}
        onChange={() => {
          setTempStatus(tempStatus === 'on' ? 'off' : 'on')
        }}
      />
      <span className="slider round"></span>
    </label>)
}

StatusToggle.propTypes = {
  tempStatus: PropTypes.string,
  setTempStatus: PropTypes.func,
}

export default StatusToggle
