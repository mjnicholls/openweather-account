import React, { useState } from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Edit } from 'react-ikonate'
import { Button } from 'reactstrap'

import EditTrigger from './EditTrigger'

const EditTriggerCard = ({ id, userId, name, status, setData }) => {
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Update Trigger"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
        customClass="bs-alerts"
      >
        <EditTrigger
          close={hideAlert}
          id={id}
          userId={userId}
          name={name}
          status={status}
          setData={setData}
        />
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
          htmlAlert()
          e.stopPropagation()
        }}
      >
        <Edit color="#48484a" />
      </Button>
    </>
  )
}

EditTriggerCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.bool,
  userId: PropTypes.string,
  setData: PropTypes.func,
  name: PropTypes.string,
}

export default EditTriggerCard
