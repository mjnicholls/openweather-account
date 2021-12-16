import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'

import { getTriggers } from '../api/api'
import { conditionToText, notificationText } from '../utils/utils'
import BeatLoader from './BeatLoader'
import CreateTriggerButton from './CreateTriggerButton'
import ThumbnailLocation from './ThumbnailLocation'

const selectUserId = (state) => state.auth.user.id

const CreateTriggerCard = ({ close }) => {
  const userId = useSelector(selectUserId)

  const [data, setData] = useState([])
  const [newTrigger, setNewTrigger] = useState(null)

  useEffect(() => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
        setNewTrigger(res.data[res.data.length - 1])
      })
      .catch((err) => {
        /* eslint-disable-next-line */
        console.log('error', err)
      })
  }, [userId])

  return (
    <ReactBSAlert
      title="Trigger Created"
      showConfirm={false}
      showCloseButton
      customClass="bs-alerts"
      onCancel={close}
      onConfirm={close}
    >
      {newTrigger ? (
        <div className="text-start">
          <div className="thumbnail" style={{ fontWeight: 'bold' }}>
            {newTrigger.name}
          </div>
          <ThumbnailLocation location={newTrigger.location} />

          <div className="padded-block">
            <span>{conditionToText(newTrigger.condition)}</span>
            <span>Notification: {notificationText(newTrigger.days)}</span>
            <span>Email recipients: {newTrigger.recipients.length}</span>
          </div>

          <div className="padded-block small-text">
            <span>* Trigger events will be shown based on UTC time.</span>
            <span>
              ** If there are events, associated with the trigger, you will be
              able to see them shortly.
            </span>
          </div>

          <Col className="pop-up-footer">
            <Link
              role="button"
              to="/triggers"
              className="button-neutral shadow-none"
            >
              To all triggers
            </Link>
            <CreateTriggerButton triggerNumber={data.length} />
          </Col>
        </div>
      ) : (
        <div style={{ minHeight: '300px' }}>
          <BeatLoader />
        </div>
      )}
    </ReactBSAlert>
  )
}

CreateTriggerCard.propTypes = {
  close: PropTypes.func,
}

export default CreateTriggerCard
