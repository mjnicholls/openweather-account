/* eslint-disable */
import React, { useState } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import '../App.scss'
import classnames from 'classnames'


const Condition = ({ condition, setCondition }) => {

  const [message, setMessage] = useState('')

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
    { value: '<', label: '<' },
    { value: '>', label: '>' },
  ]


  const handleChange = (key, value) => {
    let newCondition = {...condition}
    newCondition[key] = value
    setCondition(newCondition)
  }


{/*

  const humanReadable = (condition) => {  
    setMessage({});
  
    if (// ) {

      setMessage({
        message: ``
      })

      return
    }
  }

*/}


  

  return (
    <Row className="search-box">
      <Col>
        <Label>Trigger condition</Label>
      </Col>
      <Col>
        <Label className="conditions">Weather parameter</Label>
        <FormGroup>
          <Select
            value={variables.find(el => el.value === condition.variable)}
            onChange={(option) => handleChange("variable", option.value)}
            classNamePrefix="react-select"
            options={variables}
          />
        </FormGroup>
        {/*<div*/}
          {/*className={classnames(*/}
            {/*'invalid-feedback ',*/}
            {/*error.lng ? 'd-block' : '',*/}
          {/*)}*/}
        {/*>*/}
          {/*{error.lng}*/}
        {/*</div>*/}
      </Col>
      <Col>
        <Label className="conditions">Condition</Label>
        <FormGroup>
          <Select
          value={conditions.find(el => el.value === condition.condition)}
          onChange={(option) => handleChange("condition", option.value)}
            classNamePrefix="react-select"
            options={conditions}
          />
        </FormGroup>
      </Col>
      <Col>
        <Label className="conditions">Level</Label>
        <FormGroup>
          <Input type="number"
               onChange={(e) =>
                handleChange('value', e.target.value)
              }
              value={condition.value}
         />
        </FormGroup>
      </Col>
      <Col>
        <Label className="conditions">Units</Label>
        <FormGroup>
          <Select
            classNamePrefix="react-select"
            value={units.find(el => el.value === condition.units)}
            onChange={(option) => handleChange("units", option.value)}
            options={units}

          />
        </FormGroup>
      </Col>
      <div
          className={classnames(
            'invalid-feedback ',
            message ? 'd-block' : '',
          )}
        //  value={message}
        >

        </div>
    </Row>
  )
}

export default Condition