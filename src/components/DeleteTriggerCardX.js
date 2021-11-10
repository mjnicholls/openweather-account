import React from 'react'
import { Button } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import DeleteTrigger from './DeleteTrigger'
import { Close } from 'react-ikonate'

const DeleteTriggerCardX = () => {
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
        style={{ fontFamily: '$highlight-font-family' }}
      >
        <DeleteTrigger close={hideAlert} />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Button
        size="sm"
        title="Delete"
        style={{backgroundColor: "white"}}
        onClick={(e) => {
          htmlAlert()
          e.stopPropagation()
        }}
      >
        <Close fontSize="23px" borderWidth={1} color="#48484a" />
      </Button>
    </>
  )
}

export default DeleteTriggerCardX
