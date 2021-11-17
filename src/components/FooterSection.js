import { useState } from 'react'

import iconDownBlack from '../assets/img/icon_down_black.svg'
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
          src={iconDownBlack}
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

export default FooterSection
