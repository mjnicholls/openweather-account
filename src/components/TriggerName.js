import React, { useEffect, useState } from 'react'

import classnames from 'classnames'
import { Edit } from 'react-ikonate'
import { Col, Row, FormGroup, Input } from 'reactstrap'

import { noBlankErrorMessage } from '../config'
import '../App.scss'

import PropTypes from 'prop-types'

const TriggerName = ({ location, name, setName }) => {
  const [isEditName, setIsEditName] = useState(false)

  const [error, setError] = useState('')

  const [activeName, setActiveName] = useState(name)

  const [isNameEdited, setIsNameEdited] = useState(false)

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
    setIsNameEdited(true)
    validationName(name)
    setName(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      saveName()
    }
  }

  const saveName = () => {
    setIsEditName(false)
  }

  useEffect(() => {
    if (!isNameEdited && location.lat && location.lon) {
      const newName = `${location.name} (${location.lat.toFixed(
        2,
      )}, ${location.lon.toFixed(2)})`
      setName(newName)
    }
  }, [location, isNameEdited])

  return (
    <Row className="mb-4 mt-3">
      <Col className="mb-3">
        <h6>Trigger Name</h6>
        {isEditName ? (
          <div className="d-flex align-items-center">
            <Input
              type="text"
              onChange={onNameChange}
              onKeyDown={onKeyDown}
              className={error.name ? 'danger-border' : ''}
              value={name}
              style={{ width: '250px' }}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <span>{name}</span>
            <Edit
              className="ms-3"
              onClick={() => {
                setIsEditName(true)
              }}
            />
          </div>
        )}
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

TriggerName.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
  location: PropTypes.string,
}

export default TriggerName
