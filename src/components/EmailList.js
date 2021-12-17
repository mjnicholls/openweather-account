import React from 'react'

import PropTypes from 'prop-types'
import { ChevronDown } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'

import EmailThumbnail from './ThumbnailEmail'

const selectLimits = (state) => state.auth.limits.email_recipients

const EmailList = ({ recipients }) => {
  const emailsAllowed = useSelector(selectLimits)
  const openEmails = 3

  return emailsAllowed ? (
    <Row>
      <Col>
        <h6>Send email notifications to</h6>
        {recipients.length ? (
          recipients
            .slice(0, openEmails)
            .map((email) => <EmailThumbnail email={email} />)
        ) : (
          <p>None</p>
        )}
        {recipients.length > openEmails && (
          <>
            <a
              data-toggle="collapse"
              href="#collapseEmails"
              role="button"
              aria-expanded="false"
              aria-controls="collapseEmails"
              className="button-neutral shadow-none see-more-collapse "
            >
              <ChevronDown className="see-more-chevron" />
            </a>
            <p className="collapse mt-3" id="collapseEmails">
              {recipients.slice(openEmails).map((email) => (
                <EmailThumbnail email={email} />
              ))}
            </p>
          </>
        )}
      </Col>
    </Row>
  ) : null
}

EmailList.propTypes = {
  recipients: PropTypes.arrayOf(PropTypes.string),
}

export default EmailList
