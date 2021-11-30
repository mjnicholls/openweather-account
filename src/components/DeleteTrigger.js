import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

import { deleteTrigger, getEventsByTriggerId, getTriggers } from '../api/api'
import htmlError from '../pages/CreateTrigger'

// import ReactBSAlert from 'react-bootstrap-sweetalert'

const DeleteTrigger = ({ id, userId, setData }) => {
  const [events, setEvents] = useState([])
  // const [alert, setAlert] = React.useState(null)

  const history = useHistory()

  const confirmDeleteTrigger = () => {
    deleteTrigger(id, userId)
      .then(() => {
        console.log('id')
        refreshData()
        history.push('/triggers')
      })
      // eslint-disable-next-line
      .catch((error) => {
        console.log(error)
        htmlError()
      })
  }

  useEffect(() => {
    getEventsByTriggerId(id, userId)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [id, userId])

  const refreshData = () => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  return (
    <>
      <hr />
      <Row>
        {events.length === 0 ? (
          <Col>
            <br />
            <p>Are you sure you want to delete your trigger?</p>
          </Col>
        ) : (
          <Col>
            <br />
            <p>
              There are {events.length} active events for this trigger. Are you
              sure you want to delete it?
            </p>
          </Col>
        )}
      </Row>
      <br />

      <Col className="text-end">
        <Button
          className="button-active shadow-none"
          data-dismiss="modal"
          type="button"
          onClick={confirmDeleteTrigger}
        >
          Delete
        </Button>
      </Col>
    </>
  )
}

DeleteTrigger.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.string,
  setData: PropTypes.func,
}

export default DeleteTrigger
