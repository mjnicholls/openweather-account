import React from 'react'
import {
  Button,
} from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import DeleteTrigger from './DeleteTrigger'

const DeleteTriggerCard = () => {
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
        className="text-end"
        style={{fontFamily: "$highlight-font-family"}}
      >
        <DeleteTrigger close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
              <Button
                className="button-neutral"
                type="button"
                title="Delete"
                onClick={(e) => {
                  htmlAlert()
                  e.stopPropagation()
                }}
              >
                Delete
              </Button>
      
    </>
  )
}

export default DeleteTriggerCard
