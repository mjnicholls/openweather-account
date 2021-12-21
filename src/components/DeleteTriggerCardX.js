import React from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Button } from 'reactstrap'

import DeleteTrigger from './DeleteTrigger'

const DeleteTriggerCardX = (props) => {

  const {id, className, children} = props
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Delete Trigger?"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        customClass="bs-alerts"
      >
        <DeleteTrigger
          close={hideAlert}
          id={id}
        />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Button
        title="Delete"
        className={className}
        onClick={(e) => {
          htmlAlert()
          e.stopPropagation()
        }}
      >
        {children}
      </Button>
    </>
  )
}

DeleteTriggerCardX.propTypes = {
  id: PropTypes.string
}

export default DeleteTriggerCardX
