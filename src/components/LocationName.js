/* eslint-disable */
import React from 'react'

import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import EditableInput from './EditableInput'

const LocationName = ({ location, setLocation, setIsLocationNameEdited, error }) => {

  const setContent = (val) => {
    setLocation({ ...location, name: val })
    setIsLocationNameEdited(true)
  }

  // TODO error if empty location name

  return (
    <EditableInput
      content={location.name}
      setContent={setContent}
      tagName="p"
      error={error}
    />

    // <Row className="mb-4 mt-3">
    //   <Col className="mb-3">
    //     <h6>Location Name</h6>
    //     <EditableInput content={getContent()} setContent={setContent} tagName="p"/>
    //   </Col>
    // </Row>
  )
}

LocationName.propTypes = {
  location: PropTypes.object,
  setLocation: PropTypes.func,
}

export default LocationName
