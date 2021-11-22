/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { getTriggers } from '../api/api'
import humanReadableCondition from '../humanReadableCondition'

const selectUserId = (state) => state.auth.user_id

const CreateTriggerCard = () => {
  const userId = useSelector(selectUserId)

  const refreshPage = () => {
    window.location.reload(true)
  }

  const [data, setData] = useState([])

  useEffect(() => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [userId])

  return (
    <>
      <hr />

      <br />
      <div className="popup-create">
        <p>Your trigger:</p>

        {data
          .map((trigger) => (
            <tbody>
              <tr key={trigger.id}>
                <td>Name: </td>
                <td>{trigger.name}</td>
              </tr>

              <tr>
                <td>Condition: </td>
                <td>
                  {humanReadableCondition(trigger.condition).substring(28)}
                </td>
              </tr>
              <tr>
                <td>Location: </td>
                <td>{trigger.location.name}</td>
              </tr>
              <tr>
                <td>Notification: </td>
                <td>
                  Up to {trigger.days} {trigger.days === 1 ? 'day' : 'days'}
                </td>
              </tr>
              <tr>
                <td>No. of Email Recipients: </td>
                <td>{trigger.recipients.length}</td>
              </tr>
            </tbody>
          ))
          .at(-1)}
        <br />
        <p>Note: Events for your trigger will be shown based on UTC time.</p>

        <br />

        <Col className="text-end">
          <Link to="/triggers">
            <Button
              className="button-active"
              data-dismiss="modal"
              type="button"
            >
              To All Triggers
            </Button>
          </Link>
          <Link to="/create">
            <Button
              className="button-active"
              data-dismiss="modal"
              type="button"
              onClick={refreshPage}
            >
              Create New Trigger
            </Button>
          </Link>
        </Col>
      </div>
    </>
  )
}

export default CreateTriggerCard
