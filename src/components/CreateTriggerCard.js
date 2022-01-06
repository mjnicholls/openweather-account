import React from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

import { conditionToText, notificationText } from '../utils/utils'
import CreateTriggerButton from './CreateTriggerButton'
import ThumbnailLocation from './ThumbnailLocation'

const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const CreateTriggerCard = ({ trigger, close }) => {
  const history = useHistory()

  const areEmailsAllowed = useSelector(selectEmailsAllowed)

  const handleCreateClick = () => {
    close()
    history.go(0)
  }

  const handleToTriggersClick = () => {
    close()
    history.push('/dashboard/triggers')
  }

  return (
    <ReactBSAlert
      title="Trigger Created"
      showConfirm={false}
      showCloseButton
      customClass="bs-alerts create-trigger-alert"
      onCancel={close}
      onConfirm={close}
    >
      <div className="trigger-confirmation">
        <div className="trigger-confirmation-table">
          <Row>
            <Col sm="4">Name:</Col>
            <Col sm="8">{trigger.name}</Col>
          </Row>
          <Row>
            <Col sm="4">Location:</Col>
            <Col sm="8">
              <ThumbnailLocation location={trigger.location} showIcon={false} />
            </Col>
          </Row>
          <Row>
            <Col sm="4">Condition:</Col>
            <Col sm="8">{conditionToText(trigger.condition)}</Col>
          </Row>
          <Row>
            <Col sm="4">Notification:</Col>
            <Col sm="8">{notificationText(trigger.days)}</Col>
          </Row>
          {areEmailsAllowed && (
            <Row>
              <Col sm="4">Email recipients:</Col>
              <Col sm="8">{trigger.recipients.length}</Col>
            </Row>
          )}
        </div>

        <div className="trigger-confirmation-notification">
          <span>
            * Events are being generated. If there are any events you will be
            able to see them shortly.
            <br />
            ** Events will be shown based on UTC time.
          </span>
        </div>

        <Col className="pop-up-footer">
          <Button
            // role="button"
            // to="/dashboard/triggers"
            onClick={handleToTriggersClick}
            className="button-neutral shadow-none"
          >
            To all triggers
          </Button>
          <CreateTriggerButton createFunc={handleCreateClick} />
        </Col>
      </div>
    </ReactBSAlert>
  )
}

CreateTriggerCard.propTypes = {
  trigger: PropTypes.object,
  close: PropTypes.func,
}

export default CreateTriggerCard
