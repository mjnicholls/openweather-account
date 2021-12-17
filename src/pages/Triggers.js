import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col, Table } from 'reactstrap'

import { getTriggers } from '../api/api'
import '../App.scss'
import BeatLoader from '../components/BeatLoader'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import DeleteTriggerCardX from '../components/DeleteTriggerCardX'
import EditTriggerCard from '../components/EditTriggerCard'
import ThumbnailCondition from '../components/ThumbnailCondition'
import ThumbnailLocation from '../components/ThumbnailLocation'

const selectUserId = (state) => state.auth.user.id
const selectEmailsAllowed = (state) => state.auth.limits.email_recipients

const Triggers = () => {
  const userId = useSelector(selectUserId)
  const emailsAllowed = useSelector(selectEmailsAllowed)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const [isUpdated, setIsUpdated] = useState(false)

  const color = '#EB6E4B'

  const override = css`
    display: inline-block;
    margin: 0 auto;
    border-color: #eb6e4b;
    margin-top: 150px;
    margin-bottom: 100px;
    margin-right: 15px;
  `

  useEffect(() => {
    setIsLoading(true)
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  return (
    <div>
      <Row className="py-5">
        <Col>
          <h2 className="m-0 p-0">Triggers</h2>
        </Col>
        <Col className="text-end title">
            <Link to="/dashboard/events" role="button" className="button-neutral shadow-none">
              To events
            </Link>
          <CreateNewTriggerButton triggerNumber={data.length} />
        </Col>
      </Row>

      {isLoading ? (
        <BeatLoader />
      ) : data.length ? (
        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card>
              <CardBody>
                <Table className="mb-3 material-table">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Name</th>
                      <th>Condition</th>
                      <th>Location</th>
                      <th>Notify</th>
                      {emailsAllowed && <th className="email">Emails</th>}
                      <th colSpan={3}>&nbsp;</th>
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
                              <ThumbnailCondition
                                condition={trigger.condition}
                              />
                              {/* {conditionToText(trigger.condition)} */}
                            </td>
                            <td>
                              <ThumbnailLocation
                                location={trigger.location}
                                showIcon={false}
                              />
                            </td>
                            <td className="text-nowrap">
                              {trigger.days}{' '}
                              {trigger.days === 1 ? 'day' : 'days'}
                            </td>
                            {emailsAllowed && (
                              <td>{trigger.recipients.length}</td>
                            )}
                            <td
                              style={{
                                color:
                                  trigger.status === 'on' ? 'green' : 'red',
                              }}
                            >
                              {trigger.status.charAt(0).toUpperCase() +
                                trigger.status.slice(1)}
                            </td>

                              <td>
                                <EditTriggerCard
                                  id={trigger.id}
                                  userId={userId}
                                  data={data}
                                  setData={setData}
                                  name={trigger.name}
                                  status={trigger.status}
                                />
                              </td>
                              <td>
                                <DeleteTriggerCardX
                                  id={trigger.id}
                                  userId={userId}
                                  data={data}
                                  setData={setData}
                                  isUpdated={isUpdated}
                                  setIsUpdated={setIsUpdated}
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
      ) :
        <Row>
          <Col>
            <p>
              <b>No triggers</b>
            </p>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default Triggers
