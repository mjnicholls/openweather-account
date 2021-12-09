import React from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'

import DeleteTrigger from './DeleteTrigger'

const DeleteTriggerCard = ({ id, userId, data, setData }) => {
  const [alert, setAlert] = React.useState(null)

  const history = useHistory()

  const handleClick = () => {
    history.push('/triggers')
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Delete Trigger?"
        onConfirm={() => handleClick()}
        onCancel={() => handleClick()}
        showConfirm={false}
        showCloseButton
        customClass="bs-alerts"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <DeleteTrigger
          close={hideAlert}
          id={id}
          userId={userId}
          data={data}
          setData={setData}
        />
      </ReactBSAlert>,
    )
  }

  return (
    <>
      {alert}
      <Button
        className="button-neutral shadow-none"
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

DeleteTriggerCard.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  data: PropTypes.object,
  setData: PropTypes.func,
}

export default DeleteTriggerCard
