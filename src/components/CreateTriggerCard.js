import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Col } from 'reactstrap'

import { getTriggers } from '../api/api'
import { conditionToText } from '../utils/conditionText'

const selectUserId = (state) => state.auth.user.id

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

      <div className="popup-create">
        <h4>Your trigger:</h4>

        {data
          .map((trigger) => (
            <tbody>
              <tr key={trigger.id}>
                <td style={{ fontWeight: 'bold' }}>Name: </td>
                <td style={{ paddingLeft: '30px', whiteSpace: 'nowrap' }}>
                  {trigger.name}
                </td>
              </tr>

              <tr>
                <td style={{ fontWeight: 'bold' }}>Condition: </td>
                <td style={{ paddingLeft: '30px' }}>
                  {conditionToText(trigger.condition)}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Location: </td>
                <td style={{ paddingLeft: '30px' }}>{trigger.location.name}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Coordinates: </td>
                <td style={{ paddingLeft: '30px' }}>
                  {trigger.location.lat}, {trigger.location.lon}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Notification: </td>
                <td style={{ paddingLeft: '30px' }}>
                  Up to {trigger.days} {trigger.days === 1 ? 'day' : 'days'}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>
                  No. of Email Recipients:{' '}
                </td>
                <td style={{ paddingLeft: '30px' }}>
                  {trigger.recipients.length}
                </td>
              </tr>
            </tbody>
          ))
          .at(-1)}
        <br />
        <p>Events for your trigger will be shown based on UTC time.</p>
        <p>If there are any events, you will be able to see them shortly.</p>
        <br />

        <Col className="text-end">
          <Link to="/triggers">
            <Button
              className="button-neutral shadow-none"
              data-dismiss="modal"
              type="button"
            >
              To All Triggers
            </Button>
          </Link>
          <Link to="/create">
            <Button
              className="button-active shadow-none"
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
