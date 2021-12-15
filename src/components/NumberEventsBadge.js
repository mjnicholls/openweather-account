import React from 'react'

import { Error } from 'react-ikonate'

const NumberEventsBadge = ({number}) => (
  <div
    className={`ms-3 d-flex align-items-center ${ number ? 'button-orange' : 'button-turquoise' }`}
  >
    {number > 0 && <Error color="#ffffff" style={{marginRight: '4pt'}}/>}
    <span>{number} event{number > 1 ? "s" : ""}</span>
  </div>
)

export default NumberEventsBadge