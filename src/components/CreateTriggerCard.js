import React from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'

import { conditionToText, notificationText } from '../utils/utils'
import BeatLoader from './BeatLoader'
import CreateTriggerButton from './CreateTriggerButton'
import ThumbnailLocation from './ThumbnailLocation'

const CreateTriggerCard = ({ trigger, close }) => (
  <ReactBSAlert
    title="Trigger Created"
    showConfirm={false}
    showCloseButton
    customClass="bs-alerts"
    onCancel={close}
    onConfirm={close}
  >
    {trigger ? (
      <div className="text-start my-3">
        <h5>{trigger.name}</h5>

        <ThumbnailLocation location={trigger.location} />

        <div className="my-3 d-flex flex-column">
          <span>{conditionToText(trigger.condition)}</span>
          <span>Notification: {notificationText(trigger.days)}</span>
          <span>Email recipients: {trigger.recipients.length}</span>
        </div>

        <div className="my-3 d-flex flex-column small-text">
          <span>
            * Events are being generated. If there are any events you will be
            able to see them shortly.
          </span>
          <span>** Events will be shown based on UTC time.</span>
        </div>

        <Col className="pop-up-footer">
          <Link
            role="button"
            to="/dashboard/triggers"
            className="button-neutral shadow-none"
          >
            To all triggers
          </Link>
          <CreateTriggerButton />
        </Col>
      </div>
    ) : (
      <div style={{ minHeight: '300px' }}>
        <BeatLoader />
      </div>
    )}
  </ReactBSAlert>
)

CreateTriggerCard.propTypes = {
  close: PropTypes.func,
}

export default CreateTriggerCard
