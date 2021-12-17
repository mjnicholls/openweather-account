import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'

import { deleteTrigger, getEventsByTriggerId, getTriggers } from '../api/api'
import htmlError from '../pages/CreateTrigger'

const DeleteTrigger = ({ id, userId, setData, close }) => {
  const [events, setEvents] = useState([])

  const [isUpdated, setIsUpdated] = useState(false)

  const confirmDeleteTrigger = () => {
    deleteTrigger(id, userId)
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

  useEffect(() => {
    getEventsByTriggerId(id, userId)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [id, userId])

  return (
    <div>
      <hr />
      {isUpdated ? (
        <>
          <Row>
            <p>Your trigger has been deleted.</p>
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
          <Row>
            {events.length === 0 ? (
              <Col>
                <br />
                <p>Are you sure you want to delete your trigger?</p>
              </Col>
            ) : (
              <Col>
                <br />
                <p>
                  There are {events.length} active events for this trigger. Are
                  you sure you want to delete it?
                </p>
              </Col>
            )}
          </Row>
          <br />

          <Col className="text-end">
            <Button
              className="button-active shadow-none"
              data-dismiss="modal"
              type="button"
              onClick={confirmDeleteTrigger}
            >
              Delete
            </Button>
          </Col>
        </>
      )}
    </div>
  )
}

DeleteTrigger.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
  userId: PropTypes.string,
  setData: PropTypes.func,
}

export default DeleteTrigger
