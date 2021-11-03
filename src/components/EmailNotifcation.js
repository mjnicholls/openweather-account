/* eslint-disable */
import React, { useState } from 'react'
import { Button, Col, Row, FormGroup, Label, Input } from 'reactstrap'
import '../App.scss'
import { validateEmail } from '../features/validation'

const EmailNotifs = ({recipients, setRecipients}) => {

  const [email, setEmail] = useState('')

  const [error, setError] = useState('')
  const [activeEmail, setActiveEmail] = useState(null) // email in the list
  const [activeEmailContent, setActiveEmailContent] = useState('')

  const handleChange = (key, value) => {
    let newMail = { ...activeEmail }
    newMail[key] = value
    setActiveEmail(newMail)
  }

  const addEmail = () => {
    if (validationEmail(email)) {
      setRecipients([
        ...recipients,
        email
      ])
    }
  }

  const saveEmail = (index) => {
    let recipientsCopy = [...recipients]
    recipientsCopy[index] = activeEmailContent
    setRecipients(recipientsCopy)
    setActiveEmail(null)
    setActiveEmailContent('')
  }

  const deleteEmail = (index) => {
    let recipientsCopy = [...recipients]
    recipientsCopy.splice(index, 1)
    setRecipients(recipientsCopy)
    setActiveEmail(null)
  }

  const validationEmail = () => {
    setError({})
    /*let newError = {}

    if (!activeEmail.length) {
      setError(true)
      return false
    }

    if (!validateEmail(activeEmail)) {
      setError(true)
      return false
    }*/
    return true
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
            className={error.activeEmail ? 'danger-border' : ''}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Button
            className="btn-primary"
            onClick={addEmail}
          >
            Add email
          </Button>
        </FormGroup>
      </Col>
    </Row>
      <Row>
        <Col>

        {recipients.map((email, index) => {
        return email === activeEmail ? (
          <div key={`${email}_${index}`} className="d-flex justify-content-between">
            <Input
              type="text"
              onChange={(e) => {setActiveEmailContent(e.target.value)}}
              // onBlur={() => setActiveEmail(null)}
              value={activeEmailContent}
            />
              <Button onClick={() => saveEmail(index)}>Save</Button>
              <Button onClick={() => deleteEmail(email)}>Delete</Button>
            </div>
          ) : (
            <div key={`${email}_${index}`} className="d-flex justify-content-between">
              <p>{email}</p>
              <Button onClick={() => {setActiveEmail(email); setActiveEmailContent(email)}}>Edit</Button>
              <Button onClick={() => deleteEmail(index)}>Delete</Button>
            </div>
          )
        })}
      </Col></Row>
      </>
  )
}

export default EmailNotifs
