import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Col, Row, Input } from 'reactstrap'

import { noBlankErrorMessage } from '../config'
import '../App.scss'

const TriggerNameOnly = ({ name, setName }) => {


  const [error, setError] = useState('')


  const validationName = () => {
    setError({})
    let newError = {}
    if (name === '') {
      newError = {
        name: noBlankErrorMessage,
      }
    }

    if (Object.keys(newError).length) {
      setError(newError)
      return false
    }

    return true
  }

  const onNameChange = (e) => {
    validationName(name)
    setName(e.target.value)
  }



  return (
    <Row className="mb-4 mt-3">
      <Col className="mb-3">
        <h6>Trigger Name</h6>
          <div className="d-flex align-items-center">
            <Input
              type="text"
              onChange={onNameChange}
              className={error.name ? 'danger-border' : ''}
              style={{ width: '250px' }}
            />
          </div>
      </Col>
    </Row>

    /*
    <Row className="search-fox">
      <Col className="mb-3">
        <h6>Trigger name</h6>
        <FormGroup>
          <Input
            type="text"
            value={name}
            onChange={onNameChange}
            className={error.name ? 'danger-border' : ''}
          />

          <div
            className={classnames(
              'invalid-feedback ',
              error.name ? 'd-block' : '',
            )}
          >
            {error.name}
          </div>
        </FormGroup>
      </Col>
    </Row>
  )

            */
  )
}

TriggerNameOnly.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
}

export default TriggerNameOnly
