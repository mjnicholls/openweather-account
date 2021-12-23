import React, { useRef, useState } from 'react'

import PropTypes from 'prop-types'
import { ChevronDown, EnvelopeAlt } from 'react-ikonate'
import { useSelector } from 'react-redux'

const selectLimits = (state) => state.auth.limits.email_recipients

const EmailList = ({ recipients }) => {
  const emailsAllowed = useSelector(selectLimits)
  const openEmails = 3

  const linkRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const collapseId = 'collapseEmails'

  const onClickFunc = () => {
    setIsOpen(!isOpen)
    linkRef.current.click()
    return true
  }

  return emailsAllowed ? (
    <div>
      {recipients.length > openEmails ? (
        <button
          type="button"
          onClick={onClickFunc}
          className="remove-default-button-style"
        >
          <h5>
            Email recipients
            {/*<EnvelopeAlt /> */}
            {/*{recipients.length} email recipient*/}
            {/*{recipients.length === 1 ? '' : 's'}*/}
            {/*<ChevronDown*/}
              {/*style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}*/}
            {/*/>*/}
            <a
              ref={linkRef}
              data-toggle="collapse"
              href={`#${collapseId}`}
              aria-expanded="false"
              aria-controls={collapseId}
              className="d-none"
            >
              &nbsp;
            </a>
          </h5>
        </button>
      ) : (
        <h6>
          <EnvelopeAlt /> {recipients.length} email recipient
          {recipients.length === 1 ? '' : 's'}
        </h6>
      )}
      {recipients.length > 0 && (
        <ul>
          {recipients.slice(0, openEmails).map((email) => (
            <li key={email}>{email}</li>
          ))}
          {recipients.length > openEmails && (
            <div className="collapse" id={collapseId}>
              {recipients.slice(openEmails).map((email) => (
                <li key={email}>{email}</li>
              ))}
            </div>
          )}
        </ul>
      )}
    </div>
  ) : null
}

EmailList.propTypes = {
  recipients: PropTypes.arrayOf(PropTypes.string),
}

export default EmailList
