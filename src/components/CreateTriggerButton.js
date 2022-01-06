import React, { useState } from 'react'

import PropTypes from 'prop-types'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'

const selectTriggersLimit = (state) => state.auth.limits.max_triggers
const selectTriggers = (state) => state.triggers.data.length
const selectSubscriptionPlan = (state) => state.auth.user.tariff_full

const CreateTriggerButton = ({ createFunc }) => {
  const maxTriggers = useSelector(selectTriggersLimit)
  const tariffName = useSelector(selectSubscriptionPlan)
  const triggerN = useSelector(selectTriggers)

  const [alert, setAlert] = useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const tariffError = () => {
    setAlert(
      <SweetAlert
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
      </SweetAlert>,
    )
  }

  return (
    <>
      {alert}
      <button
        type="button"
        className="button-active shadow-none"
        onClick={triggerN >= maxTriggers ? tariffError : createFunc}
      >
        Create new trigger
      </button>
    </>
  )
}

CreateTriggerButton.propTypes = {
  createFunc: PropTypes.func,
}

export default CreateTriggerButton
