import React, { useState } from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Edit, Close, Ok } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Button, Col, Input, Label, Row } from 'reactstrap'

import '../App.scss'
import { validateEmail } from '../utils/validation'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const EmailNotifications = ({ recipients, setRecipients }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState({})
  const [activeEmail, setActiveEmail] = useState(null)
  const [activeEmailContent, setActiveEmailContent] = useState('')

  const areEmailsAllowed = useSelector(selectEmailsAllowed)

  const noBlankErrorMessage = 'Cannot be blank'
  const emailErrorMessage = 'Must be a valid email address'

  const addEmail = () => {
    if (isEmailValid(email)) {
      setRecipients([...recipients, email])
      setEmail('')
    }
  }

  const saveEmail = (index) => {
    const recipientsCopy = [...recipients]
    recipientsCopy[index] = activeEmailContent
    setRecipients(recipientsCopy)
    setEmail('')
    setActiveEmail(null)
    setActiveEmailContent('')
  }

  const deleteEmail = (index) => {
    const recipientsCopy = [...recipients]
    recipientsCopy.splice(index, 1)
    setRecipients(recipientsCopy)
    setActiveEmail(null)
  }

  const isEmailValid = () => {
    setError({})
    let newError = {}

    if (!email.length) {
      newError = {
        email: noBlankErrorMessage,
      }
    }

    if (!validateEmail(email)) {
      newError = {
        email: emailErrorMessage,
      }
    }

    if (recipients.includes(email)) {
      newError = {
        email: 'The email is already added',
      }
    }

    if (Object.keys(newError).length) {
      setError(newError)
      return false
    }

    return true
  }

  const onKeyDown = (e, index) => {
    if (e.keyCode === 13) {
      saveEmail(index)
    }
  }

  return areEmailsAllowed ? (
    <>
      <Label>Email notifications to</Label>
      <div className="d-flex align-items-center">
        <input
          className={`owm-selector ${error.email ? 'danger-border' : ''}`}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button className="button-neutral shadow-none" onClick={addEmail}>
          Add email
        </Button>
      </div>
      <div
        className={classnames('invalid-feedback', error.email ? 'd-block' : '')}
      >
        {error.email}
      </div>

      {/* eslint-disable-next-line */}
      {recipients.map((email, index) =>
        email === activeEmail ? (
          <>
            <Row>
              <Col key={email}>
                <Input
                  type="text"
                  onChange={(e) => {
                    setActiveEmailContent(e.target.value)
                  }}
                  className={`input-marketplace ${
                    error.email ? 'danger-border' : ''
                  }`}
                  value={activeEmailContent}
                  onKeyDown={onKeyDown}
                />
              </Col>
              <Col className="icons" style={{ marginBottom: '10px' }}>
                <Ok
                  onClick={() => saveEmail(index)}
                  style={{ marginRight: '20px' }}
                />
                <Close onClick={() => deleteEmail(email)} />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col key={email}>
                <p>{email}</p>
              </Col>
              <Col className="icons" style={{ marginBottom: '10px' }}>
                <Edit
                  style={{ marginRight: '20px' }}
                  onClick={() => {
                    setActiveEmail(email)
                    setActiveEmailContent(email)
                  }}
                />
                <Close name="Delete" onClick={() => deleteEmail(index)} />
              </Col>
            </Row>
          </>
        ),
      )}
    </>
  ) : null
}

EmailNotifications.propTypes = {
  recipients: PropTypes.array,
  setRecipients: PropTypes.func,
}

export default EmailNotifications
