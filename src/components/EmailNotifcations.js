import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { Close } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Input, Row } from 'reactstrap'

import { noBlankErrorMessage } from '../config'
import { validateEmail } from '../utils/validation'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const EmailNotifications = ({ recipients, setRecipients }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState({})
  const [activeEmail, setActiveEmail] = useState(null)

  const areEmailsAllowed = useSelector(selectEmailsAllowed)

  const emailErrorMessage = 'Must be a valid email address'

  const addEmail = (e) => {
    if (e.key === 'Enter') {
      if (isEmailValid(email)) {
        setRecipients([...recipients, email])
        setEmail('')
      }
    }
  }

  const setEmailButton = () => {
    if (isEmailValid(email)) {
      setRecipients([...recipients, email])
      setEmail('')
    }
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

  return areEmailsAllowed ? (
    <>
      <h5 className="mt-4">Email notifications to</h5>
      <div>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column flex-grow-1">
            <Input
              className={`owm-selector ${error.email ? 'danger-border' : ''}`}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={addEmail}
              value={email}
              placeholder="Enter an email address"
            />
            <div className={`invalid-feedback ${error.email ? 'd-block' : ''}`}>
              {error.email}
            </div>
          </div>
          <button
            type="button"
            className="padded-button"
            // className={`padded-button ${
            //   content.length ? 'pa dded-button-active' : ''
            // }`}
            onClick={setEmailButton}
            aria-pressed="true"
            // disabled={!content.length}
          >
            Set
          </button>
        </div>
        <div className="my-3">
          {/* eslint-disable-next-line */}
          {recipients.map((email, index) =>
            email === activeEmail ? null : (
              <React.Fragment key={email}>
                <span className="item" data-tag>
                  {email}
                  <span
                    role="textbox"
                    tabIndex={0}
                    data-tag-handle
                    onClick={() => deleteEmail(index)}
                    onKeyDown={() => deleteEmail(index)}
                  >
                    <Close name="Delete" onClick={() => deleteEmail(index)} />
                  </span>
                </span>
              </React.Fragment>
            ),
          )}
        </div>
      </div>
    </>
  ) : null
}

EmailNotifications.propTypes = {
  recipients: PropTypes.array,
  setRecipients: PropTypes.func,
}

export default EmailNotifications
