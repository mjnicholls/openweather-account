import React from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

import '../App.scss'

const TriggerNameOnly = ({ name, setName, error }) => (
  <>
    <h6>Trigger name</h6>
    <div className="container-main">
      <Input
        type="text"
        onChange={(e) => setName(e.target.value)}
        className={error.name ? 'danger-border' : ''}
      />
      <div
        className={classNames('invalid-feedback ', error.name ? 'd-block' : '')}
      >
        {error.name}
      </div>
    </div>
  </>
)

TriggerNameOnly.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
}

export default TriggerNameOnly
