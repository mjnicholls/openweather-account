import React from 'react'

import PropTypes from 'prop-types'
import Select from 'react-select'
import { Col, Row } from 'reactstrap'
import '../App.scss'

const PriorNotifs = ({ days, setDays }) => {
  const priors = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
  ]

  return (
    <>
      <Row>
        <Col className="mb-3">
          <h6>Notify me</h6>
        </Col>
      </Row>
      <Row>
        <Col md="2">
          <p> Up to </p>{' '}
        </Col>
        <Col md="4">
          <Select
            onChange={(option) => setDays(parseFloat(option.value))}
            classNamePrefix="react-select"
            options={priors}
            value={priors.find((el) => el.value === 'days')}
            defaultValue={priors[0]}
          />
        </Col>
        <Col md="6">
          <p className="centered">
            day{days === 1 ? '' : 's'}
            &nbsp;before an event starts
          </p>
        </Col>
      </Row>
      <Row className="human-readable">
        {days === 0 ? (
          <p className="human-readable">
            You will be notified only if the event occurs today
          </p>
        ) : (
          <p className="human-readable">
            You will be notified if the event occurs within {days} day
            {days === 1 ? '' : 's'} from now
          </p>
        )}
      </Row>
    </>
  )
}

PriorNotifs.propTypes = {
  days: PropTypes.number,
  setDays: PropTypes.func,
}

export default PriorNotifs
