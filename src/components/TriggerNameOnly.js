import React from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

import '../App.scss'

const TriggerNameOnly = ({ name, setName, error }) => (
  <>
    <Input
      type="text"
      onChange={(e) => setName(e.target.value)}
      className={`input-marketplace ${error.name ? 'danger-border' : ''}`}
      placeholder="Enter trigger name"
    />
    <div
      className={classNames('invalid-feedback ', error.name ? 'd-block' : '')}
    >
      {error.name}
    </div>
  </>
)

TriggerNameOnly.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
}

export default TriggerNameOnly
