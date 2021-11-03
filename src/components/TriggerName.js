import React, { useEffect, useState } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import '../App.scss'

const TriggerName = ({ location, name, setName }) => {
  const [isNameEdited, setIsNameEdited] = useState(false)
  const [error, setError] = useState('');

  const noBlankErrorMessage = 'Cannot be blank'

  const onNameChange = (e) => {
    setIsNameEdited(true)
    setName(e.target.value)

    setError({})
    let newError = {}

    if (!name) {
      newError = {
        name: noBlankErrorMessage,
      }
    }
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
    <Col md="3">
      <Label>Trigger name</Label>
    </Col>

    <Col md="9">
      <FormGroup>
        <Input
          type="text"
          value={name}
          onChange={onNameChange}
          className={error.name ? 'danger-border' : ''}
        />
      </FormGroup>
    </Col>
  
  </Row>
  )
}


export default TriggerName
