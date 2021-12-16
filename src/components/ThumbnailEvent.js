import React from 'react'

import { Error } from 'react-ikonate'

import { toDate } from '../utils/dateTime'

const EventThumbnail = ({ dt }) => (
  <div className="thumbnail bordered">
    <Error color="#EB6E4B" />
    <span>{toDate(dt)}</span>
  </div>
)

export default EventThumbnail
