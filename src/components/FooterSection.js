import { useState } from 'react'

import PropTypes from 'prop-types'

import '../App.scss'

const FooterSection = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div
        role="button"
        tabIndex="0"
        className="d-flex align-items-center justify-content-between"
        onClick={() => setOpen(!open)}
        onKeyDown={() => setOpen(!open)}
      >
        <h5>{props.header}</h5>

        <img
          className="d-xl-none"
          src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_down_black.svg"
          alt="arrow"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </div>

      <div className="d-xl-none pb-3 section-body-mobile">
        <div
          style={{
            display: open ? 'block' : 'none',
          }}
        >
          {props.children}
        </div>
      </div>
      <div className="d-none d-xl-block">{props.children}</div>
    </div>
  )
}

FooterSection.propTypes = {
  header: PropTypes.string,
  children: PropTypes.object,
}

export default FooterSection
