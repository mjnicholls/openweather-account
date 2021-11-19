/* eslint-disable */
import React, { useState, useEffect } from 'react'

import { Button, Col, Row } from 'reactstrap'
import { deleteTrigger } from '../api/api'
import { getEventsByTriggerId, getTriggers } from '../api/api'

//const selectTrigger = (state) => state.trigger.id

const CreateTriggerCard = ({ close, id, userId }) => {
  return (
    <>
      <hr />

      <br />

      <Col className="text-end">
        <Button
          className="button-active"
          data-dismiss="modal"
          type="button"
          onClick={close}
        >
          To All Triggers
        </Button>
        <Button
          className="button-active"
          data-dismiss="modal"
          type="button"
          onClick={close}
        >
          Create New Trigger
        </Button>
      </Col>
    </>
  )
}

export default CreateTriggerCard
