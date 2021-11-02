/* eslint-disable */
import React, { useState } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import '../App.scss'
import classnames from 'classnames'


const Condition = ({ condition, setCondition }) => {
  
  const [error, setError] = useState({})
  const noBlankErrorMessage = "Cannot be blank"

  const variables = [
    { value: 'temp', label: 'Air temperature' },
    { value: 'wind', label: 'Wind speed' },
    { value: 'rain', label: 'Precipitation' },
  ]

  const units = [
    { value: 'metric', label: '°C, m/s' },
    { value: 'imperial', label: '°F, mph' },
  ]

  const conditions = [
    { value: 'lessthan', label: '<' },
    { value: 'morethan', label: '>' },
  ]


const validate = () => {
    setError({})

    const newError = {
      variable: condition.variable,
      condition: condition.condition,
      value: condition.value,
      units: condition.units,
    }

    if (newError) {
      setError({
        variable: noBlankErrorMessage,
        condition: noBlankErrorMessage,
        value: noBlankErrorMessage,
        units: noBlankErrorMessage,
      })
      if (Object.keys(newError).length) {
        setError(newError)
        return false
    }
  }
}
    
    

  return (
    <Row className="search-box">
      <Col>
        <Label>Trigger condition</Label>
      </Col>
      <Col>
        <Label className="conditions">Weather parameter</Label>
        <FormGroup>
          <Select
            classNamePrefix="react-select"
            options={variables}
            className={error ? 'danger-border react-select info mb-3' : ''}
          />
        </FormGroup>
        <div
              className={classnames(
                'invalid-feedback ',
                error ? 'd-block' : '',
              )}
            >
              {error}
            </div>
      </Col>
      <Col>
        <Label className="conditions">Condition</Label>
        <FormGroup>
          <Select
            className={error ? 'danger-border react-select info mb-3' : ''}
            classNamePrefix="react-select"
            options={conditions}
          />
        </FormGroup>
        <div
              className={classnames(
                'invalid-feedback ',
                error ? 'd-block' : '',
              )}
            >
              {error}
            </div>
      </Col>
      <Col>
        <Label className="conditions">Level</Label>
        <FormGroup>
          <Input type="number"
          className={error ? 'danger-border ' : ''
        } />
        </FormGroup>
        <div
              className={classnames(
                'invalid-feedback ',
                error ? 'd-block' : '',
              )}
            >
              {error}
            </div>
      </Col>
      <Col>
        <Label className="conditions">Units</Label>
        <FormGroup>
          <Select
            className={error ? 'danger-border react-select info mb-3' : ''}
            classNamePrefix="react-select"
            options={units}

          />
        </FormGroup>
        <div
              className={classnames(
                'invalid-feedback ',
                error ? 'd-block' : '',
              )}
            >
              {error}
            </div>
      </Col>
    </Row>
  )
}

export default Condition