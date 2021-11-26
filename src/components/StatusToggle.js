import React from 'react'

const StatusToggle = ({ tempStatus, setTempStatus }) => (
  <label className="switch">
    {/* eslint-disable-next-line */}
      <input
      type="checkbox"
      checked={tempStatus === 'on'}
      onChange={() => setTempStatus(tempStatus === 'on' ? 'off' : 'on')}
    />
    <span className="slider round"></span>
  </label>
)

export default StatusToggle
