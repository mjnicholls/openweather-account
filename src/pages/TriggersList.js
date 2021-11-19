import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import humanReadableCondition from '../humanReadableCondition'
import { getTriggers } from '../api/api'

import '../App.scss'
import DeleteTriggerCardX from '../components/DeleteTriggerCardX'
import EditTriggerCard from '../components/EditTriggerCard'

const selectUserId = (state) => state.auth.user_id

const TriggerList = () => {
  const userId = useSelector(selectUserId)
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
      <div className="content">
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
                                  pathname: '/view-trigger',
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
                            <td>
                              {trigger.status.charAt(0).toUpperCase() +
                                trigger.status.slice(1)}
                            </td>
                            <td>
                              <EditTriggerCard
                                id={trigger.id}
                                userId={userId}
                                name={trigger.name}
                                status={trigger.status}
                              />
                            </td>
                            <td>
                              <DeleteTriggerCardX
                                id={trigger.id}
                                userId={userId}
                              />
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
            <Link to="/forecasted-events">
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

export default TriggerList
