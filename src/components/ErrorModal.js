import React from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Button, Col } from 'reactstrap'
import '../App.scss'

const ErrorModal = ({ close, whoops }) => (
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
    <p>{JSON.stringify(whoops).slice(1, -1)}</p>
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

export default ErrorModal
