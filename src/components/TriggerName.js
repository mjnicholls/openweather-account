import React, { useEffect, useState } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import '../App.scss'

const TriggerName = ({ location, name, setName }) => {
  const [isNameEdited, setIsNameEdited] = useState(false)

  const onNameChange = (e) => {
    setIsNameEdited(true)
    setName(e.target.value)
  }

  useEffect(() => {
    if (!isNameEdited && location.lat && location.lon) {
      const newName = `${location.name} (${location.lat.toFixed(
        2,
      )}, ${location.lon.toFixed(2)})`
      setName(newName)
    }
  }, [location, isNameEdited])


  return(
    <Row className="search-box">
    <Col>
      <Label>Trigger name</Label>
    </Col>


    <Col>
      <FormGroup>
        <Input
          type="number"
          value={name}
          onChange={onNameChange}
        />
      </FormGroup>

    </Col>
  
  </Row>
  )
}

export default TriggerName
