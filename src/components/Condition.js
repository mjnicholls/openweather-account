import React from 'react'

import PropTypes from 'prop-types'
import Select from 'react-select'
import { Col, Row, Label } from 'reactstrap'

import { variables, units, conditions } from '../config'
import { owmSelectorStyle } from '../utils/styles'
import { conditionToTextLong } from '../utils/utils'

const Condition = ({ condition, setCondition }) => {
  const handleChange = (key, value) => {
    const newCondition = { ...condition }
    newCondition[key] = value
    setCondition(newCondition)
  }

  return (
    <div className="padding-col">
      <Row>
        <Col className="mb-1">
          <h5>Trigger condition</h5>
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <Label>Weather parameter</Label>
          <Select
            value={variables.find((el) => el.value === condition.variable)}
            onChange={(option) => handleChange('variable', option.value)}
            classNamePrefix="react-select"
            options={variables}
            styles={owmSelectorStyle}
          />
        </Col>
        <Col md="6">
          <Label>Condition</Label>
          <Select
            value={conditions.find((el) => el.value === condition.condition)}
            onChange={(option) => handleChange('condition', option.value)}
            classNamePrefix="react-select"
            options={conditions}
            styles={owmSelectorStyle}
          />
        </Col>
        <Col md="6">
          <Label>Level</Label>
          <input
            type="number"
            onChange={(e) => handleChange('value', parseFloat(e.target.value))}
            value={condition.value}
            className="owm-selector w-100"
          />
        </Col>
        <Col>
          <Label>Units</Label>
          <Select
            classNamePrefix="react-select"
            value={units.find((el) => el.value === condition.units)}
            onChange={(option) => handleChange('units', option.value)}
            options={units}
            styles={owmSelectorStyle}
          />
        </Col>
      </Row>
      <span className="human-readable">{conditionToTextLong(condition)}</span>
    </div>
  )
}

Condition.propTypes = {
  condition: PropTypes.object,
  setCondition: PropTypes.func,
}

export default Condition
