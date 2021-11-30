import React, { useState } from 'react'

import { Button, Col, Row, Input, Label } from 'reactstrap'

import { patchTrigger, getTriggers } from '../api/api'

import '../App.scss'
import classnames from 'classnames'

import { noBlankErrorMessage } from '../config'

import ReactBSAlert from 'react-bootstrap-sweetalert'

import htmlError from '../pages/CreateTrigger'
import StatusToggle from './StatusToggle'

import PropTypes from 'prop-types'

const EditTrigger = ({ userId, id, name, status, setData, close }) => {
  const [error, setError] = useState({})

  const [activeName, setActiveName] = useState(name)
  const [tempStatus, setTempStatus] = useState(status)
  const [isEdited, setIsEdited] = useState(true)

  const [alert, setAlert] = React.useState(null)

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
            <Button className="button-neutral shadow-none" onClick={close}>
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
        <Col md="4" className="editStatus">
          <StatusToggle
            tempStatus={tempStatus}
            setTempStatus={setTempStatus}
            setIsEdited={setIsEdited}
          />
        </Col>
      </Row>

      <br />
      <Col className="text-end">
        <Button
          className="button-active shadow-none"
          data-dismiss="modal"
          type="button"
          onClick={confirmEditTrigger}
          disabled={isEdited}
        >
          Update
        </Button>
      </Col>
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
