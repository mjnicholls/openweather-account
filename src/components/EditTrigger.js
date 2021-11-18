import React, { useState, useEffect } from 'react'

import { Button, Col, Row, Input, Label } from 'reactstrap'

import { patchTrigger, getTriggers } from '../api/api'

import '../App.scss'
import classnames from 'classnames'
const noBlankErrorMessage = 'Cannot be blank'

const EditTrigger = ({ userId, id, name, status }) => {
  console.log('status', status)
  const [error, setError] = useState({})

  const [activeName, setActiveName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)
  /* eslint-disable-next-line */

  const confirmEditTrigger = () => {
    const refreshPage = () => {
      window.location.reload(true)
    }

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

    /* eslint-disable-next-line */
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
    console.log('saving', data)

    patchTrigger(data)
      .then(() => {
        console.log('data')
        refreshPage()
      })
      // eslint-disable-next-line
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <hr />

      <Row className="search-box">
        <Col md="8">
          <Label> Name </Label>
          <Input
            type="text"
            onChange={(e) => {
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
        <Col md="4" className="editStatus">
          <label className="switch">
            {/* eslint-disable-next-line */}
            <input
              type="checkbox"
              checked={tempStatus === 'on'}
              onChange={() => setTempStatus(tempStatus === 'on' ? 'off' : 'on')}
            />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>

      <br />
      <Col className="text-end">
        <Button
          className="button-active"
          data-dismiss="modal"
          type="button"
          onClick={confirmEditTrigger}
        >
          Update
        </Button>
      </Col>
    </div>
  )
}

export default EditTrigger
