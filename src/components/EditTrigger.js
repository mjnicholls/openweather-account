import React, { useState } from 'react'

import { Button, Col, Row, Input, Label } from 'reactstrap'
import { patchTrigger } from '../api/api'
import '../App.scss'

const EditTrigger = ({ close, userId, id }) => {
  const [name, setName] = useState()
  const [status, setStatus] = useState()

  const confirmEditTrigger = () => {
    const data = {
      id,
      user_id: userId,
      name,
      status,
    }

    patchTrigger(data)
      .then(() => {
        console.log('data')
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

      <Row className="search-box">
        <Col md="8">
          <Label> Name </Label>
          <Input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Col>
        <Col md="4" className="editStatus">
          <label className="switch">
            <input type="checkbox" onClick={() => setStatus()} />
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
