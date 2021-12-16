import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { conditionToText } from '../utils/utils'

const selectTariff = (state) => state.auth.tariff

const EventOld = ({ trigger, index }) => {
  const myTariff = useSelector(selectTariff)

  return (
    <>
      <div className="row">
        <div className="col-md-1 mb-2">{index + 1}</div>
        <div className="col-md-4 mb-2">
          {' '}
          <Link
            to={{
              pathname: '/trigger',
              state: trigger,
            }}
          >
            {trigger.name}
          </Link>
        </div>
        <div className="col-md-6 mb-2">
          {conditionToText(trigger.condition)}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-1 mb-2">&nbsp;</div>
        <div className="col mb-2">
          {trigger.location.name}, ({trigger.location.lat.toFixed(2)},{' '}
          {trigger.location.lon.toFixed(2)})
        </div>
        {myTariff === 'free' ? (
          <div className="col-md-4">&nbsp;</div>
        ) : (
          <div className="col-md-6 small">
            {trigger.recipients.length === 0 ? (
              ''
            ) : (
              <i>
                Notification has been sent to {trigger.recipients.length}{' '}
                recipient
                {trigger.recipients.length === 1 ? '' : 's'}
              </i>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default EventOld
