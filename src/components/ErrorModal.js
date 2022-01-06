import React from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Button, Col } from 'reactstrap'

const ErrorModal = ({ close, error }) => (
  <ReactBSAlert
    title="Whoops!"
    onCancel={close}
    onConfirm={close}
    showConfirm={false}
    showCloseButton
    customClass="bs-alerts"
  >
    <br />
    <p>
      Something went wrong on our end. Please make note of the error message
      below and contact us:
    </p>
    <p>{error}</p>
    <br />
    <Col className="text-end">
      <Button
        className="button-active shadow-none"
        href="mailto:info@openweathermap.org"
      >
        Contact
      </Button>
    </Col>
  </ReactBSAlert>
)

ErrorModal.propTypes = {
  close: PropTypes.func,
  error: PropTypes.string,
}

export default ErrorModal
