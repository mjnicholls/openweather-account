import React from 'react'

import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import '../App.scss'

const LocationName = ({ location }) => (
  <Row className="mb-4 mt-3">
    <Col className="mb-3">
      <h6>Location Name</h6>

      <p>
        {location.name}, ({location.lat.toFixed(2)}, {location.lon.toFixed(2)}){' '}
      </p>
    </Col>
  </Row>
)

LocationName.propTypes = {
  location: PropTypes.string,
}

export default LocationName
