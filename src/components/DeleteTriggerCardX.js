import React, { useEffect } from 'react'

import PropTypes from 'prop-types'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Close } from 'react-ikonate'
import { Button } from 'reactstrap'

import { getTriggers } from '../api/api'
import DeleteTrigger from './DeleteTrigger'

const DeleteTriggerCardX = ({ id, userId, data, setData }) => {
  const [alert, setAlert] = React.useState(null)

  const refreshData = () => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        title="Delete Trigger?"
        onConfirm={() => refreshData()}
        onCancel={() => refreshData()}
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
        size="sm"
        title="Delete"
        className="shadow-none"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          padding: '0px',
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

DeleteTriggerCardX.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  data: PropTypes.array,
  setData: PropTypes.func,
}

export default DeleteTriggerCardX
