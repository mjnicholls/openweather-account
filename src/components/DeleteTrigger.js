import React from 'react'

import { Button, Col, Row } from 'reactstrap'
import { deleteTrigger } from '../api/api'

const DeleteTrigger = ({ close, id }) => {
  const confirmDeleteTrigger = () => {
    const data = {
      id,
    }

    deleteTrigger(data).then(() => {
      console.log('deleted')
    })

    close()
  }

  return (
    <div>
      <hr />
      <Row>
        <Col>
          <br />
          <p>Are you sure you want to delete your trigger?</p>
        </Col>
      </Row>
      <br />
      <div className="footer">
        <Button
          className="btn-danger"
          color="danger"
          data-dismiss="modal"
          type="button"
          onClick={confirmDeleteTrigger}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default DeleteTrigger
