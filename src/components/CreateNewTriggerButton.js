import React, { useState } from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Col } from 'reactstrap'

const selectTriggersLimit = (state) => state.auth.limits.max_triggers
const selectSubscriptionPlan = (state) => state.auth.user.tariff_full

const CreateNewTriggerButton = ({ triggerNumber }) => {
  const maxTriggers = useSelector(selectTriggersLimit)
  const tariffName = useSelector(selectSubscriptionPlan)

  const [alert, setAlert] = useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const tariffError = () => {
    setAlert(
      <ReactBSAlert
        title="Error"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        customClass="bs-alerts"
      >
        <div className="my-3">
          <p>
            You have reached the maximum number of triggers available with the{' '}
            {tariffName}&nbsp;subscription plan: {maxTriggers}.
          </p>
          <p>Delete a trigger to add a new one.</p>
        </div>
        <div className="text-end">
          <Button className="button-active shadow-none">See plans</Button>
        </div>
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      {triggerNumber >= maxTriggers ? (
        <Button className="button-active shadow-none" onClick={tariffError}>
          Create new trigger
        </Button>
      ) : (
        <Link to="/create">
          <Button className="button-active shadow-none">
            Create new trigger
          </Button>
        </Link>
      )}
    </>
  )
}

export default CreateNewTriggerButton
