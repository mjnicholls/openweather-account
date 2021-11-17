/* eslint-disable */
import React from 'react'

import { Button, Col, Row } from 'reactstrap'
import { deleteTrigger } from '../api/api'

//const selectTrigger = (state) => state.trigger.id

const DeleteTrigger = ({ id, userId }) => {
  const confirmDeleteTrigger = () => {
    deleteTrigger(id, userId).then(() => {
      console.log('deleted')
    })

    close()
  }

  return (
    <>
      <hr />
      <Row>
        <Col>
          <br />
          <p>Are you sure you want to delete your trigger?</p>
        </Col>

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
