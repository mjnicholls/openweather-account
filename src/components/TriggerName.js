import React, { useEffect, useState } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
import classnames from 'classnames'
import '../App.scss'

const TriggerName = ({ location, name, setName, error }) => {
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

  return (
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
        <div
          className={classnames(
            'invalid-feedback ',
            error.name ? 'd-block' : '',
          )}
        >
          {error.name}
        </div>
      </Col>
    </Row>
  )
}

export default TriggerName
