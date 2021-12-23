/* eslint-disable */
import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import EditableInput from './EditableInput'

const LocationName = ({ location, setLocation }) => {
  const [wasEdited, setWasEdited] = useState(false)
  const getContent = () =>
    wasEdited
      ? String({ ...location }.name)
      : `${String({ ...location }.name)}, (${{ ...location }.lat.toFixed(
          2,
        )}, ${{ ...location }.lon.toFixed(2)})`

  const setContent = (val) => {
    setLocation({ ...location, name: val })
    setWasEdited(true)
  }

  // TODO error if empty location name

  return (

    <EditableInput content={getContent()} setContent={setContent} tagName="p"/>

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
