import * as React from 'react'
import { ReactMultiEmail } from 'react-multi-email'
import 'react-multi-email/style.css'

const EmailMulti = ({ recipients }) => {
  const [emails, setEmails] = React.useState([])

  const styles = {
    fontFamily: 'sans-serif',
    width: '500px',
    border: '1px solid #eee',
    background: '#f3f3f3',
    padding: '25px',
    margin: '20px',
  }

  return (
    <div style={styles}>
      <h2>react-multi-email</h2>
      <ReactMultiEmail
        placeholder="Input your Email Address"
        emails={emails}
        onChange={(e) => setEmails(e.target.value)}
        getLabel={(emails, index, removeEmail) => (
          <div data-tag key={index}>
            {emails}
            <span data-tag-handle onClick={() => removeEmail(index)}>
              ×
            </span>
          </div>
        )}
      />
      <br />
      <h4>react-multi-email value</h4>
      <p>{emails.join(', ') || 'empty'}</p>
    </div>
  )
}

export default EmailMulti
