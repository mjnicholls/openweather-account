import React, { useState } from 'react'
import { Button, Col, Row, FormGroup, Label, Input } from 'reactstrap'
import '../App.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPenSquare,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { Edit, Close } from 'react-ikonate'
import { validateEmail } from '../utils/validation'
import classnames from 'classnames'

const EmailNotifs = ({ recipients, setRecipients }) => {
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')
  const [activeEmail, setActiveEmail] = useState(null) // email in the list
  const [activeEmailContent, setActiveEmailContent] = useState('')

  const noBlankErrorMessage = 'Cannot be blank'
  const emailErrorMessage = 'Must be a proper email address'

  const addEmail = () => {
    if (validationEmail(email)) {
      setRecipients([...recipients, email])
    }
  }

  const saveEmail = (index) => {
    const recipientsCopy = [...recipients]
    recipientsCopy[index] = activeEmailContent
    setRecipients(recipientsCopy)
    setActiveEmail(null)
    setActiveEmailContent('')
  }

  const deleteEmail = (index) => {
    const recipientsCopy = [...recipients]
    recipientsCopy.splice(index, 1)
    setRecipients(recipientsCopy)
    setActiveEmail(null)
  }

  const validationEmail = () => {
    setError({})
    let newError = {}

    if (email === '') {
      newError = {
        email: noBlankErrorMessage,
      }
    }

    if (!validateEmail(email)) {
      newError = {
        email: emailErrorMessage,
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

  return (
    <>
      <Row className="search-box">
        <Col>
          <Label>Email Notification</Label>
        </Col>

        <Col>
          <FormGroup>
            <Input
              className={error.email ? 'danger-border' : ''}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormGroup>
          <div
            className={classnames(
              'invalid-feedback',
              error.email ? 'd-block' : '',
            )}
          >
            {error.email}
          </div>
        </Col>
        <Col>
          <FormGroup>
            <Button className="button-active" onClick={addEmail}>
              Add email
            </Button>
          </FormGroup>
        </Col>
      </Row>

      {/* eslint-disable-next-line */}
      {recipients.map((email, index) =>
        email === activeEmail ? (
          <>
            <Row className="search-box">
              <Col>
                {' '}
                <Label>Editing Name</Label>
              </Col>
              <Col key={email}>
                <Input
                  type="text"
                  onChange={(e) => {
                    setActiveEmailContent(e.target.value)
                  }}
                  className={error.email ? 'danger-border' : ''}
                  value={activeEmailContent}
                  onKeyDown={onKeyDown}
                />
              </Col>
              <Col className="icons" style={{ marginBottom: '30px' }}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
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
              <Col></Col>
              <Col key={email}>
                <p>{email}</p>
              </Col>
              <Col className="icons" style={{ marginBottom: '30px' }}>
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
  )
}

export default EmailNotifs
