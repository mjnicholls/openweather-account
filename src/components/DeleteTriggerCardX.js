/* eslint-disable */
import React from 'react'
import { Button } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import DeleteTrigger from './DeleteTrigger'
import { Close } from 'react-ikonate'

const DeleteTriggerCardX = ({ id, userId }) => {
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
        style={{ fontFamily: '$highlight-font-family', borderRadius:"12px" }}
      >
        <DeleteTrigger close={hideAlert} id={id} userId={userId} />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Button
        size="sm"
        title="Delete"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          marginTop: '5px',
        }}
        onClick={(e) => {
          htmlAlert()
          e.stopPropagation()
        }}
      >
        <Close color="#48484a" />
      </Button>
    </>
  )
}

export default DeleteTriggerCardX
