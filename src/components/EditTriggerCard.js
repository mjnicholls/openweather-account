import React from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Edit } from 'react-ikonate'
import { Button } from 'reactstrap'

import EditTrigger from './EditTrigger'

const EditTriggerCard = ({ id, name, status }) => {
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const showUpdatePopUp = () => {
    setAlert(
      <ReactBSAlert
        title="Update Trigger"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        customClass="bs-alerts"
      >
        <EditTrigger id={id} name={name} status={status} close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          padding: '0px',
        }}
        title="Update"
        className="text-end shadow-none"
        onClick={(e) => {
          showUpdatePopUp()
          e.stopPropagation()
        }}
      >
        <Edit color="#48484a" />
      </Button>
    </>
  )
}

EditTriggerCard.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string,
}

export default EditTriggerCard
