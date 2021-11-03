/* eslint-disable */
import React, { useState } from 'react'
import { Button, Col, Row, FormGroup, Label, Input } from 'reactstrap'
import '../App.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenSquare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { validateEmail } from '../features/validation'
import classnames from 'classnames'


const EmailNotifs = ({recipients, setRecipients}) => {

  const [email, setEmail] = useState('')

  const [error, setError] = useState('')
  const [activeEmail, setActiveEmail] = useState(null) // email in the list
  const [activeEmailContent, setActiveEmailContent] = useState('')

  const noBlankErrorMessage = 'Cannot be blank'
  const emailErrorMessage = 'Must be a proper email address'

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

  const validationEmail = (email) => {
    setError({})
    let newError = {}

    if (email === "") {
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

  return (
    <>
    <Row className="search-box">
      <Col md="3">
        <Label>Email Notification</Label>
      </Col>

      <Col md="6">
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
      <Col md="3">
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
    {recipients.map((email, index) => {


        return email === activeEmail ? (

            <>
            <Row>
                <Col md="3"></Col>
           
          <Col md="6" key={`${email}_${index}`}>
            <Input
              type="text"
              onChange={(e) => {setActiveEmailContent(e.target.value)}}
              className={error.email ? 'danger-border' : ''}
              value={activeEmailContent}
            />
      
            </Col>
            <Col md="1" className="icons">
            <FontAwesomeIcon icon={faThumbsUp} onClick={() => saveEmail(index)} />
            </Col>
            <Col md="1" className="icons">
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteEmail(email)} />
            </Col>
            </Row>
            </>
          ) : (
            <>
              <Row>
              <Col md="3"></Col>
            <Col md="6" key={`${email}_${index}`}>
              <p>{email}</p>
              </Col>
              <Col md="1" className="icons">
             <FontAwesomeIcon icon={faPenSquare} onClick={() => {setActiveEmail(email); setActiveEmailContent(email)}} />
             </Col>
             <Col md="1" className="icons">
             <FontAwesomeIcon icon={faTrash} onClick={() => deleteEmail(index)} />
            </Col>
            </Row>
            </>
          )
        })}
        
      </>
  )
}

export default EmailNotifs
