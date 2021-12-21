import * as React from 'react'

import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/style.css'

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

  return (
    <div style={styles}>
      <ReactMultiEmail
        placeholder="Input your Email Address"
        emails={email}
        // validateEmail={(email) => { isEmail(email) }}
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
