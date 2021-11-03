/* eslint-disable */
import React, { useState } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import '../App.scss'
import classnames from 'classnames'
import humanReadableCondition from '../humanReadableCondition'
import { variables, units, conditions } from '../config'

const Condition = ({ condition, setCondition }) => {
 
  const handleChange = (key, value) => {
    let newCondition = { ...condition }
    newCondition[key] = value
    setCondition(newCondition)
  }

  return (
    <>
      <Row className="search-box">
        <Col md="3">
          <Label>Trigger condition</Label>
        </Col>
        <Col md="5">
          <Label className="conditions">Weather parameter</Label>
          <FormGroup>
            <Select
              value={variables.find((el) => el.value === condition.variable)}
              onChange={(option) => handleChange('variable', option.value)}
              classNamePrefix="react-select"
              options={variables}
            />
          </FormGroup>
          <Label className="conditions">Condition</Label>
          <FormGroup>
            <Select
              value={conditions.find((el) => el.value === condition.condition)}
              onChange={(option) => handleChange('condition', option.value)}
              classNamePrefix="react-select"
              options={conditions}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <Label className="conditions">Level</Label>
          <FormGroup>
            <Input
              type="number"
              onChange={(e) => handleChange('value', e.target.value)}
              value={condition.value}
            />
          </FormGroup>
          <Label className="conditions">Units</Label>
          <FormGroup>
            <Select
              classNamePrefix="react-select"
              value={units.find((el) => el.value === condition.units)}
              onChange={(option) => handleChange('units', option.value)}
              options={units}
            />
          </FormGroup>
        </Col>
        <div className="human-readable">
          {humanReadableCondition(condition)}
        </div>
      </Row>

   
    </>
  )
}

export default Condition
