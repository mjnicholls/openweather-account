/* eslint-disable */
import * as React from 'react'

import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/style.css'
import { validateEmail } from '../utils/validation'
import { Row } from 'reactstrap'

const EmailMulti = ({ recipients, setRecipients }) => {
  const [email, setEmail] = React.useState('')

  const styles = {
    fontFamily: 'sans-serif',
    width: '100%',
    border: '1px solid #eee',
    background: '#f3f3f3',
    padding: '25px',
    margin: '20px',
  }

  const addEmail = () => {
    setRecipients([...recipients])
    setEmail('')
    console.log('email', email)
  }

  const isEmailValid = (val) => {
    console.log('isEmailValid')
    if (!validateEmail(val)) {
      return false
    }

    if (recipients.includes(val)) {
      return false
    }

    return true
  }

  return (
    <>
      <div style={styles}>
        <ReactMultiEmail
          placeholder="Input your Email Address"
          emails={email}
          validateEmail={(email) => isEmailValid(email)}
          onChange={(e) => setEmail(e.target.value)}
          getLabel={(emails, index, removeEmail) => (
            <div data-tag key={index}>
              {emails}
              <span
                role="textbox"
                tabIndex={0}
                data-tag-handle
                onClick={() => removeEmail(index)}
                onKeyDown={() => removeEmail(index)}
              >
                x
              </span>
            </div>
          )}
        />
      </div>
    </>
  )
}

export default EmailMulti
