/* eslint-disable */
import React, { useState } from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Button, Col, Row, Input, Label } from 'reactstrap'

import { patchTrigger, getTriggers } from '../api/api'
import '../App.scss'
import { noBlankErrorMessage } from '../config'
import htmlError from '../pages/CreateTrigger'
import StatusToggle from './StatusToggle'

const EditTrigger = ({ userId, id, name, status, setData, close }) => {
  const [error, setError] = useState({})

  const [activeName, setActiveName] = useState(name)

  const [tempStatus, setTempStatus] = useState(status)

  const [isEdited, setIsEdited] = useState(true)

  const [isUpdated, setIsUpdated] = useState(false)

  const confirmEditTrigger = () => {
    setError({})

    const newError = {}

    if (!activeName) {
      newError.activeName = noBlankErrorMessage
    }

    if (Object.keys(newError).length) {
      setError(newError)
      /* eslint-disable-next-line */
      return
    }

    const data = {
      id,
      user_id: userId,
      name,
      status,
    }

    if (name !== activeName) {
      data.name = activeName
    }

    if (status !== tempStatus) {
      data.status = tempStatus
    }

    if (Object.keys(data).length) {
      // call API
    }

    patchTrigger(data)
      .then(() => {
        refreshData()
        setIsUpdated(true)
      })
      // eslint-disable-next-line
      .catch(() => {
        htmlError()
      })
  }

  const refreshData = () => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  return (
    <div>
      {isUpdated ? (
        <>
          <Row>
            <p>Your trigger has been updated.</p>
          </Row>
          <Row>
            <Col className="text-end">
              <Button
                className="button-active shadow-none"
                data-dismiss="modal"
                type="button"
                onClick={close}
              >
                Back to Triggers
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="search-box text-start">
            <Col md="8">
              <Label> Name </Label>
              <Input
                type="text"
                onChange={(e) => {
                  setIsEdited(false)
                  setActiveName(e.target.value)
                }}
                className={error.activeName ? 'danger-border' : ''}
                value={activeName}
                name="name"
              />
              <div
                className={classnames(
                  'invalid-feedback',
                  error.activeName ? 'd-block' : '',
                )}
              >
                {error.activeName}
              </div>
            </Col>
            <Col md="4">
              <Label>{tempStatus === 'on' ? 'Active' : 'Inactive'}</Label>
              <StatusToggle
                tempStatus={tempStatus}
                setTempStatus={setTempStatus}
                setIsEdited={setIsEdited}
              />
            </Col>
          </Row>

          <br />
          <Col className="text-end">
            {tempStatus === status ? (
              <Button
                className="button-active shadow-none"
                data-dismiss="modal"
                type="button"
                onClick={confirmEditTrigger}
                disabled={isEdited}
              >
                Update
              </Button>
            ) : (
              <Button
                className="button-active shadow-none"
                data-dismiss="modal"
                type="button"
                onClick={confirmEditTrigger}
              >
                Update
              </Button>
            )}
          </Col>
        </>
      )}
    </div>
  )
}

EditTrigger.propTypes = {
  id: PropTypes.number,
  status: PropTypes.bool,
  userId: PropTypes.string,
  setData: PropTypes.func,
  close: PropTypes.func,
  name: PropTypes.string,
}

export default EditTrigger
