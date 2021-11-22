import React from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Button } from 'reactstrap'

const ErrorCard = () => {
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Whoops!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <p>Are you sure you want to delete your trigger?</p>
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

export default ErrorCard
