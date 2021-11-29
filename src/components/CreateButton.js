import React from 'react'

import { Col, Row, Button } from 'reactstrap'
import '../App.scss'

const CreateButton = () => (
  <>
    <Row className="search-box">
      <Col md="8"></Col>
      <Col md="2">
        <Button>Cancel</Button>
      </Col>
      <Col md="2">
        <Button>Create</Button>
      </Col>
    </Row>
  </>
)

export default CreateButton
