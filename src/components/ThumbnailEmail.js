import React from 'react'

import { EnvelopeAlt } from 'react-ikonate'

const EventThumbnail = ({ email }) => (
  <div className="thumbnail bordered">
    <EnvelopeAlt />
    <span>{email}</span>
  </div>
)

export default EventThumbnail
