/* eslint-disable */
import icon_down_black from '../assets/img/icon_down_black.svg'
import '../App.scss'

import { useState } from 'react'

const FooterSection = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-between"
        onClick={() => setOpen(!open)}
      >
        <h5>
          {props.header}
        </h5>

        <img
          className="d-lg-none"
          src={icon_down_black}
          alt="arrow"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </div>

      <div
        className="d-lg-none pb-3"
        style={{ borderBottom: '1px solid #ced4da' }}
      >
        <div
          style={{
            display: open ? 'block' : 'none',
          }}
        >
          {props.children}
        </div>
      </div>
      <div className="d-none d-lg-block">{props.children}</div>
      
    </div>
  )
}

export default FooterSection
