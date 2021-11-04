import React, { useState } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import '../App.scss'

const PriorNotifs = () => {
  const [days, setDays] = useState(0)
  
  const priors = [
    { value: 0, label: '0'},
    { value: 1, label: '1'},
    { value: 2, label: '2'},
    { value: 3, label: '3'},
  ]


  const handleChange = (key, value) => {
    const newDays = { ...days }
    newDays[key] = value
    setDays(newDays)
  }



  return (
    <>
      <Row className="search-box">
        <Col md="3">
          <Label>Prior Notifications</Label>
        </Col>
        <Col md="2">
          <p className="centered">Up to</p>
          </Col>
        <Col md="2">
          <FormGroup>
            <Select
              onChange={(option) => handleChange('priors', option.value)}
              classNamePrefix="react-select"
              options={priors}
              value={priors.find((el) => el.value === days)}
            />
          </FormGroup>
        </Col>
        <Col md="4">

        <p className="centered">days before an event starts</p>

        </Col>
      </Row>
    </>
  )
}

export default PriorNotifs
