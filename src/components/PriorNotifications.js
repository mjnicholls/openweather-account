import React from 'react'

import Select from 'react-select'
import { Col, Row, FormGroup, Label } from 'reactstrap'
import '../App.scss'

const PriorNotifs = ({ days, setDays }) => {
  const priors = [
    { value: 'None', label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
  ]

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
              onChange={(option) => setDays(option.value)}
              classNamePrefix="react-select"
              options={priors}
              value={priors.find((el) => el.value === days)}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <p className="centered">
            day{days === 1 ? '' : 's'}
            &nbsp;before an event starts
          </p>
        </Col>
      </Row>
    </>
  )
}

export default PriorNotifs
