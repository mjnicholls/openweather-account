import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button } from 'reactstrap'

import { getEventsByTriggerId } from '../api/api'
import { deleteTrigger } from '../features/triggers/actions'

const DeleteTrigger = ({ id, close }) => {
  const [events, setEvents] = useState([])
  const dispatch = useDispatch()

  const confirmDeleteTrigger = () => {
    dispatch(deleteTrigger(id))
    close()
  }

  useEffect(() => {
    getEventsByTriggerId(id)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [id])

  return (
    <div>
      <p>
        {events.length
          ? `There are ${events.length} active events for this trigger. Are
        you sure you want to delete it?`
          : 'Are you sure you want to delete your trigger?'}
      </p>
      <div className="text-end">
        <Button
          className="button-active shadow-none"
          data-dismiss="modal"
          type="button"
          onClick={confirmDeleteTrigger}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

DeleteTrigger.propTypes = {
  id: PropTypes.string,
  close: PropTypes.func,
}

export default DeleteTrigger
