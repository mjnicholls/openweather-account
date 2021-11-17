import React from 'react'
import { Button } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import EditTrigger from './EditTrigger'
import { Edit } from 'react-ikonate'

const EditTriggerCard = ({ id, userId, name, status }) => {
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
        style={{ fontFamily: '$highlight-font-family', borderRadius:"12px" }}
      >
        <EditTrigger
          close={hideAlert}
          id={id}
          userId={userId}
          name={name}
          status={status}
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
          marginTop: '2px',
        }}
        title="Update"
        className="text-end"
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

export default EditTriggerCard
