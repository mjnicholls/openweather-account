import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Col, Row, Input } from 'reactstrap'
import classNames from 'classnames'
import { noBlankErrorMessage } from '../config'
import '../App.scss'

const TriggerNameOnly = ({ name, setName, error, setError }) => {



  return (
<>
    <Row className="mt-3">
    <Col className="mb-2">
      <h6>Trigger Name</h6>
    </Col>
  </Row>

   <Row className="search-fox">
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className={error.name ? 'danger-border' : ''}
              style={{ width: '96%', marginTop: '7px', marginLeft:'10px', marginBottom:'20px' }}
            />
                <div
            className={classNames(
              'invalid-feedback ',
              error.name ? 'd-block' : '',
            )}
          >
            {error.name}
          </div>
     
    </Row>
</>
    
  )
}

TriggerNameOnly.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
}

export default TriggerNameOnly
