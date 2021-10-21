/* eslint-disable */
import {useState} from 'react'

const FooterSection = (props) => {

  const [open, setOpen] = useState(true)

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h5>{props.header}</h5>
        <div onClick={() => setOpen(!open)}>Arrow</div>
      </div>

      <div className="d-lg-none" style={{display: open ? "block" : "none"}}>{props.children}</div>
      <div className="d-none d-lg-block">{props.children}</div>
    </div>
  )

}

export default FooterSection
