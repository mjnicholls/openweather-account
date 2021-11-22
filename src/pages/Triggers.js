import React, { useEffect, useState } from 'react'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Close, Edit } from 'react-ikonate'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'

import { getTriggers } from '../api/api'

import '../App.scss'
import DeleteTrigger from '../components/DeleteTrigger'
import EditTrigger from '../components/EditTrigger'
import humanReadableCondition from '../humanReadableCondition'

const selectUserId = (state) => state.auth.user_id

const Triggers = () => {
  const userId = useSelector(selectUserId)

  const [data, setData] = useState([])

  const [alert, setAlert] = React.useState(null)

  useEffect(() => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [userId])

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = (isEdit, key, id) => {
    setAlert(
      <ReactBSAlert
        title={isEdit ? 'Edit Trigger' : 'Delete Trigger'}
        onConfirm={hideAlert}
        onCancel={hideAlert}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        {isEdit ? (
          <EditTrigger
            userId={userId}
            id={id}
            key={key}
            close={hideAlert}
            // refreshData={refreshData}
          />
        ) : (
          <DeleteTrigger
            close={hideAlert}
            userId={userId}
            key={key}
            id={id}
            // refreshData={refreshData}
          />
        )}
      </ReactBSAlert>,
    )
  }

  return (
    <>
      <div className="content">
        {alert}
        <Row>
          <Col>
            <h2>Trigger List</h2>
          </Col>
        </Row>
        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card>
              <CardBody>
                <Table className="mb-3">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Trigger Name</th>
                      <th>Trigger Condition</th>
                      <th>Location</th>
                      <th>Notify</th>
                      <th>Email Recipients</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map(
                      (trigger, index) =>
                        trigger.status !== 'deleted' && (
                          <tr key={trigger.id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: '/trigger',
                                  state: trigger,
                                }}
                              >
                                {trigger.name}
                              </Link>
                            </td>
                            <td>
                              {humanReadableCondition(
                                trigger.condition,
                              ).substring(28)}
                            </td>
                            <td>{trigger.location.name}</td>
                            <td>
                              Up to {trigger.days}{' '}
                              {trigger.days === 1 ? 'day' : 'days'}
                            </td>
                            <td>{trigger.recipients.length}</td>
                            {trigger.status === 'on' ? (
                              <td style={{ color: 'green' }}>
                                {trigger.status.charAt(0).toUpperCase() +
                                  trigger.status.slice(1)}
                              </td>
                            ) : (
                              <td style={{ color: 'red' }}>
                                {trigger.status.charAt(0).toUpperCase() +
                                  trigger.status.slice(1)}
                              </td>
                            )}
                            <td>
                              <Button
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  padding: '0px',
                                }}
                                title="Update"
                                className="text-end"
                                onClick={(e) => {
                                  htmlAlert(trigger, true)
                                  e.stopPropagation()
                                }}
                              >
                                <Edit color="#48484a" />
                              </Button>
                            </td>
                            <td>
                              <Button
                                size="sm"
                                title="Delete"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  padding: '0px',
                                }}
                                disabled={data.length === 1}
                                onClick={(e) => {
                                  htmlAlert(trigger, false)
                                  e.stopPropagation()
                                }}
                              >
                                <Close color="#48484a" />
                              </Button>
                            </td>
                          </tr>
                        ),
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="search-box">
          <Col className="text-end">
            <Link to="/events">
              <Button className="button-neutral">To events</Button>
            </Link>
            <Link to="/create">
              <Button className="button-active">Create new trigger</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Triggers
