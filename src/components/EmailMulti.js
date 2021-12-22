/* eslint-disable */
import * as React from 'react'

import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/style.css'
import { validateEmail } from '../utils/validation'

const EmailMulti = ({ recipients, setRecipients }) => {
  const [email, setEmail] = React.useState([])

  const styles = {
    fontFamily: 'sans-serif',
    width: '500px',
    border: '1px solid #eee',
    background: '#f3f3f3',
    padding: '25px',
    margin: '20px',
  }

  const addEmail = () => {
    setRecipients([...recipients, email])
    setEmail(email)
  }

  const isEmailValid = (val) => {
    console.log('isEmailValid')
    if (!validateEmail(val)) {
      console.log('1')
      return false
    }

    if (recipients.includes(val)) {
      console.log('1')
      return false
    }

    return true
  }

  return (
    <div style={styles}>
      <ReactMultiEmail
        placeholder="Input your Email Address"
        emails={email}
        validateEmail={(email) => isEmailValid(email)}
        onChange={addEmail}
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
      <br />
      <h4>react-multi-email value</h4>
      <p>{email.join(', ') || 'empty'}</p>
    </div>
  )
}

export default EmailMulti
