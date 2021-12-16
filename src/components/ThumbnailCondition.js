import React from 'react'

import { Thermometer, Rain, TurnRight } from 'react-ikonate'

import { conditionToText } from '../utils/utils'

const ThumbnailCondition = ({ condition }) => (
  <div className="thumbnail">
    {/* {condition.variable === 'temp' ? ( */}
    {/* <Thermometer /> */}
    {/* ) : condition.variable === 'prec' ? ( */}
    {/* <Rain /> */}
    {/* ) : ( */}
    {/* <TurnRight /> */}
    {/* )} */}
    <span>{conditionToText(condition)}</span>
  </div>
)

export default ThumbnailCondition
