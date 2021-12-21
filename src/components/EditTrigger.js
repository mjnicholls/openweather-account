/* eslint-disable */
import React, { useState } from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { Button, Col, Row, Input, Label } from 'reactstrap'

import '../App.scss'
import { editTrigger } from '../features/triggers/actions'
import { noBlankErrorMessage } from '../config'
import StatusToggle from './StatusToggle'

const EditTrigger = ({ id, name, status, close }) => {
  const [tempName, setTempName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const confirmEditing = () => {
    setError(null)
    if (!tempName) {
      setError(noBlankErrorMessage)
      return
    }
    const data = { id }

    if (name !== tempName) {
      data.name = tempName
    }

    if (status !== tempStatus) {
      data.status = tempStatus
    }

    dispatch(editTrigger(data))
    close()
  }

  return (
    <div>
      <Row className="container-main text-start">
        <Col md="8">
          <Label> Name </Label>
          <Input
            type="text"
            onChange={(e) => {
              setTempName(e.target.value)
            }}
            className={error ? 'danger-border' : ''}
            value={tempName}
            name="name"
          />
          <div
            className={classnames('invalid-feedback', error ? 'd-block' : '')}
          >
            {error}
          </div>
        </Col>

        <Col md="4">
          <Label>{tempStatus === 'on' ? 'Active' : 'Inactive'}</Label>
          <StatusToggle tempStatus={tempStatus} setTempStatus={setTempStatus} />
        </Col>
      </Row>

      <br />
      <Row>
        <Col className="text-end">
          <Button
            className="button-active shadow-none"
            data-dismiss="modal"
            type="button"
            onClick={confirmEditing}
            disabled={tempStatus === status && name === tempName}
          >
            Update
          </Button>
        </Col>
      </Row>
    </div>
  )
}

EditTrigger.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  close: PropTypes.func,
}

export default EditTrigger
