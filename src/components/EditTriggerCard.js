import React from 'react'
import { Button } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import EditTrigger from './EditTrigger'
import { Edit } from 'react-ikonate'

const EditTriggerCard = () => {
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
        style={{ fontFamily: '$highlight-font-family' }}
      >
        <EditTrigger close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Button
      style={{backgroundColor: "white"}}
        title="Update"
        onClick={(e) => {
          htmlAlert()
          e.stopPropagation()
        }}
      >
           <Edit fontSize="23px" borderWidth={1} color="#48484a" />
      </Button>
    </>
  )
}

export default EditTriggerCard
