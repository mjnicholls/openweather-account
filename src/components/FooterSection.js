/* eslint-disable */
import icon_down_black from '../assets/img/icon_down_black.svg'

import {useState} from 'react'

const FooterSection = (props) => {

  const [open, setOpen] = useState(true)

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between" onClick={() => setOpen(!open)} >
        <h5>{props.header}</h5>
        <img  src={icon_down_black} alt="arrow" style={{transform: open ? "rotate(180deg)" : ""}}/>
      </div>

      <div className="d-lg-none" style={{display: open ? "block" : "none"}}>{props.children}</div>
      <div className="d-none d-lg-block">{props.children}</div>
    </div>
  )

}

export default FooterSection
