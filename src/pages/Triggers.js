import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'

import { getTriggers } from '../api/api'
import { tariff } from '../config'
import '../App.scss'
import DeleteTriggerCardX from '../components/DeleteTriggerCardX'
import EditTriggerCard from '../components/EditTriggerCard'
import humanReadableCondition from '../humanReadableCondition'

import ReactBSAlert from 'react-bootstrap-sweetalert'

const selectUserId = (state) => state.auth.user_id

// for future tariff use
// const userSubscriptionSelector = (state) => state.auth.user_id.tariff

const Triggers = () => {
  const userId = useSelector(selectUserId)

  // for future tariff use
  // const subscription = useSelector(userSubscriptionSelector)

  const myTariff = tariff.enterprise

  console.log('tariff', myTariff)

  const [data, setData] = useState([])

  useEffect(() => {
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
        console.log('data')
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [userId])

  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const tariffError = () => {
    setAlert(
      <ReactBSAlert
        title="Sorry!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
        showCloseButton
        className="text-end"
        style={{ fontFamily: '$highlight-font-family', borderRadius: '12px' }}
      >
        <br />
        <p>
          You have reached the maximum number of triggers available with your
          subscription plan.
        </p>
        <br />
        <Col className="text-end">
          <Button className="button-active shadow-none">
            To Subscription Plans
          </Button>
        </Col>
      </ReactBSAlert>,
    )
  }

  /* TODO: CONDITIONAL FOR DELETE/EDIT ?

    const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = (isEdit, key, id, name, status) => {
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
            name={name}
            status={status}
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

  */

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
                      <th className="trig">Trigger Condition</th>
                      <th>Location</th>
                      <th>Notify</th>
                      {myTariff === 'free' ? (
                        <th>&nbsp;</th>
                      ) : (
                        <th className="email">Email Recipients</th>
                      )}
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
                            <td className="text-nowrap">
                              {humanReadableCondition(
                                trigger.condition,
                              ).substring(28)}
                            </td>
                            <td>{trigger.location.name}</td>
                            <td className="text-nowrap">
                              {trigger.days}{' '}
                              {trigger.days === 1 ? 'day' : 'days'}
                            </td>
                            {myTariff === 'free' ? (
                              <td>&nbsp;</td>
                            ) : (
                              <td>{trigger.recipients.length}</td>
                            )}
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
                              <EditTriggerCard
                                id={trigger.id}
                                userId={userId}
                                data={data}
                                setData={setData}
                                name={trigger.name}
                                status={trigger.status}
                              />
                              {/*
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
                              */}
                            </td>
                            <td>
                              <DeleteTriggerCardX
                                id={trigger.id}
                                userId={userId}
                                data={data}
                                setData={setData}
                              />

                              {/*
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
                                */}
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
              <Button className="button-neutral shadow-none">To events</Button>
            </Link>

            {(() => {
              switch (myTariff) {
                case 'free':
                  return data.length >= 3 ? (
                    <Button
                      className="button-active shadow-none"
                      onClick={tariffError}
                    >
                      Create new trigger
                    </Button>
                  ) : (
                    <Link to="/create">
                      <Button className="button-active shadow-none">
                        Create new trigger
                      </Button>
                    </Link>
                  )
                case 'startup':
                  return data.length >= 5 ? (
                    <Button
                      className="button-active shadow-none"
                      onClick={tariffError}
                    >
                      Create new trigger
                    </Button>
                  ) : (
                    <Link to="/create">
                      <Button className="button-active shadow-none">
                        Create new trigger
                      </Button>
                    </Link>
                  )
                case 'developer':
                  return data.length >= 7 ? (
                    <Button
                      className="button-active shadow-none"
                      onClick={tariffError}
                    >
                      Create new trigger
                    </Button>
                  ) : (
                    <Link to="/create">
                      <Button className="button-active shadow-none">
                        Create new trigger
                      </Button>
                    </Link>
                  )
                case 'professional':
                  return data.length >= 9 ? (
                    <Button
                      className="button-active shadow-none"
                      onClick={tariffError}
                    >
                      Create new trigger
                    </Button>
                  ) : (
                    <Link to="/create">
                      <Button className="button-active shadow-none">
                        Create new trigger
                      </Button>
                    </Link>
                  )
                case 'enterprise':
                  return data.length >= 15 ? (
                    <Button
                      className="button-active shadow-none"
                      onClick={tariffError}
                    >
                      Create new trigger
                    </Button>
                  ) : (
                    <Link to="/create">
                      <Button className="button-active shadow-none">
                        Create new trigger
                      </Button>
                    </Link>
                  )
                default:
                  return (
                    <Link to="/create">
                      <Button className="button-active shadow-none">
                        Create new trigger
                      </Button>
                    </Link>
                  )
              }
            })()}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Triggers
