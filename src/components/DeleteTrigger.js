/* eslint-disable */
import React, { useState, useEffect } from 'react'

import { Button, Col, Row } from 'reactstrap'
import { deleteTrigger } from '../api/api'
import { getEventsByTriggerId, getTriggers } from '../api/api'

//const selectTrigger = (state) => state.trigger.id

const DeleteTrigger = ({ close, id, userId }) => {
  const confirmDeleteTrigger = () => {
    deleteTrigger(id, userId).then(() => {
      getTriggers(id, userId)
    })
    close()
  }

  const [events, setEvents] = useState([])

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
    <>
      <hr />
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
              There are {events.length} active events for this trigger. Are you
              sure you want to delete it?
            </p>
          </Col>
        )}
      </Row>
      <br />

      <Col className="text-end">
        <Button
          className="button-active"
          data-dismiss="modal"
          type="button"
          onClick={confirmDeleteTrigger}
        >
          Delete
        </Button>
      </Col>
    </>
  )
}

export default DeleteTrigger
