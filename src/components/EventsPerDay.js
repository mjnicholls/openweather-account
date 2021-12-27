import React, { useState, useRef } from 'react'

import PropTypes from 'prop-types'
import { ChevronDown, Error } from 'react-ikonate'

const EventsPerDay = ({ number, seeMoreLink }) => {
  const [isOpen, setIsOpen] = useState(false)
  const linkRef = useRef(null)

  const onClickFunc = () => {
    setIsOpen(!isOpen)
    linkRef.current.click()
    return true
  }

  const Content = () => (
    <div className="d-flex-inline align-items-center">
      {number > 0 && <Error style={{ marginRight: '4pt', color: "#ffffff" }} />}
      <span>
        {number} event{number === 1 ? '' : 's'}&nbsp;
      </span>
    </div>
  )

  return seeMoreLink ? (
    <button
      type="button"
      className={`align-items-center ${
        number ? 'button-orange' : 'button-turquoise'
      }`}
      style={{ border: 'none', display: 'inline-flex' }}
      onClick={onClickFunc}
    >
      <Content />
      <ChevronDown style={{ color: "#ffffff", transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      <a
        className="d-none"
        data-toggle="collapse"
        href={`#${seeMoreLink}`}
        role="button"
        aria-expanded="false"
        aria-controls={seeMoreLink}
        ref={linkRef}
      >
        &nbsp;
      </a>
    </button>
  ) : (
    <div
      className={`d-inline-flex ${
        number ? 'button-orange' : 'button-turquoise'
      }`}
    >
      <Content />
    </div>
  )
}

EventsPerDay.propTypes = {
  number: PropTypes.number,
  seeMoreLink: PropTypes.string,
}

export default EventsPerDay
