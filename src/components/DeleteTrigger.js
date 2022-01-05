import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'

import { getEventsByTriggerId } from '../api/api'
import { deleteTrigger } from '../features/triggers/actions'

const selectUserId = (state) => state.auth.user.id

const DeleteTrigger = ({ id, close, callback }) => {
  const [events, setEvents] = useState([])
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  const confirmDeleteTrigger = () => {
    dispatch(deleteTrigger(id))
    callback()
    close()
  }

  useEffect(() => {
    getEventsByTriggerId(id, userId)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [id])

  return (
    <div>
      {events.length > 0 ? (
        <>
          <p>
            There {events.length === 1 ? 'is' : 'are'}{' '}
            <b>
              {events.length} active event{events.length === 1 ? '' : 's'}
            </b>{' '}
            for this trigger.
          </p>
          <p>Are you sure you want to delete it?</p>
        </>
      ) : (
        <p>Are you sure you want to delete the trigger?</p>
      )}
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
  callback: PropTypes.func,
  close: PropTypes.func,
  id: PropTypes.string,
}

export default DeleteTrigger
