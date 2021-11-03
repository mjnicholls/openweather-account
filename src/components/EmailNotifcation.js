/* eslint-disable */
import React, { useState } from 'react'
import { Button, Col, Row, FormGroup, Label, Input } from 'reactstrap'
import '../App.scss'
import { validateEmail } from '../features/validation'

const EmailNotifs = () => {
  const [recipients, setRecipients] = useState([])
  const [activeEmail, setActiveEmail] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (key, value) => {
    let newMail = { ...activeEmail }
    newMail[key] = value
    setActiveEmail(newMail)
  }

  const validationEmail = () => {
    setError({})
    let newError = {}

    if (!activeEmail.length) {
      setError(true)
      return
    }

    if (!validateEmail(activeEmail)) {
      setError(true)
      return
    }
  }

  return (
    <Row className="search-box">
      <Col>
        <Label>Email Notification</Label>
      </Col>

      <Col>
        <FormGroup>
          <Input
            className={error.activeEmail ? 'danger-border' : ''}
            type="text"
            //onChange={(e) => setEmail(e.target.value)}
            value={activeEmail}
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Button
            className="btn-primary"
            onChange={(e) => {
              handleChange(index, e.target.value)
            }}
          >
            Add email
          </Button>
        </FormGroup>
      </Col>

      {recipients.map((email, index) => {
        email === activeEmail ? (
          <input
            onChange={(e) => {
              handleChange(index, e.target.value)
            }}
            onBlur={() => setActiveEmail(null)}
            value={email}
          />
        ) : (
          <div>
            <p>{email}</p>
            <Button onClick={() => setActiveEmail(email)}>email</Button>
          </div>
        )
      })}
    </Row>
  )
}

export default EmailNotifs
