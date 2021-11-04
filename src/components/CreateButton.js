/*eslint-disable*/
import React, { useState } from 'react'
import { Col, Row, FormGroup, Label, Input, Button } from 'reactstrap'
import Select from 'react-select'
import '../App.scss'

const CreateButton = () => {
  return (
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
}

export default CreateButton
