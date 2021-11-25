import React, { useEffect, useState } from 'react'

import classnames from 'classnames'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'
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
    <Row className="search-fox">
      <Col className="mb-3">
        <h6>Trigger name</h6>
        <FormGroup>
          <Input
            type="text"
            value={name}
            onChange={onNameChange}
            className={error.name ? 'danger-border' : ''}
          />

          <div
            className={classnames(
              'invalid-feedback ',
              error.name ? 'd-block' : '',
            )}
          >
            {error.name}
          </div>
        </FormGroup>
      </Col>
    </Row>
  )
}

export default TriggerName
