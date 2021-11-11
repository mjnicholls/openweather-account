import React from 'react'

import { Button, Col, Row } from 'reactstrap'
import { patchTrigger } from '../api/api'


const EditTrigger = ({ close }) => {
  const confirmEditTrigger = () => {
    const data = {
      id: '618ba9ef3355472c2628b52a',
      name: 'big trigger',
      user_id: 1,
      status: 'off',
    }

    patchTrigger(data)
      .then(() => {
        console.log('data', data)
      })
      // eslint-disable-next-line
      .catch((error) => {
        console.log(error)
      })

    close()
  }

  return (
    <div>
      <hr />
      <Row>
        <Col>
          <br />
          <p>Update your trigger</p>
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
