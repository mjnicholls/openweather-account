/* eslint-disable */
import React from 'react'

import { Button, Col, Row } from 'reactstrap'
import { deleteTrigger } from '../api/api'

const DeleteTrigger = ({ close, params }) => {
  const confirmDeleteTrigger = () => {

    

    deleteTrigger(params).then(() => {
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
