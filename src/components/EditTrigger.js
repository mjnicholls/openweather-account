import React, { useState, useEffect } from 'react'

import { Button, Col, Row, Input, Label } from 'reactstrap'

import { patchTrigger, getTriggers } from '../api/api'

import '../App.scss'
import classnames from 'classnames'

import { noBlankErrorMessage } from '../config'

import ReactBSAlert from 'react-bootstrap-sweetalert'

import htmlError from '../pages/CreateTrigger'

const EditTrigger = ({ userId, id, name, status, setData, close }) => {
  const [error, setError] = useState({})

  const [activeName, setActiveName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)

  const [alert, setAlert] = React.useState(null)
  /* eslint-disable-next-line */

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
        refreshData()
        updateAlert()
      })
      // eslint-disable-next-line
      .catch((error) => {
        console.log(error)
        htmlError()
      })
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const updateAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Trigger Updated!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <br />
        <p>Your trigger has been updated.</p>
        <Row className="search-box">
          <Col className="text-end">
            <Button className="button-neutral" onClick={close}>
              Back to all triggers
            </Button>
          </Col>
        </Row>
      </ReactBSAlert>,
    )
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
      <hr />
      {alert}
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
