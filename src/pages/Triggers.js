import React, { useEffect, useState } from 'react'

import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'

import { getTriggers } from '../api/api'
import '../App.scss'
import DeleteTriggerCardX from '../components/DeleteTriggerCardX'
import EditTriggerCard from '../components/EditTriggerCard'
import { conditionToText } from '../utils/conditionText'
import CreateNewTriggerButton from '../components/CreateNewTriggerButton'

const selectUserId = (state) => state.auth.user_id

const selectTariff = (state) => state.auth.tariff

const Triggers = () => {
  const userId = useSelector(selectUserId)

  const myTariff = useSelector(selectTariff)

  const [isLoading, setIsLoading] = useState(true)
  const color = '#EB6E4B'

  const override = css`
    display: inline-block;
    margin: 0 auto;
    border-color: #eb6e4b;
    margin-top: 150px;
    margin-bottom: 100px;
    margin-right: 15px;
  `

  const [data, setData] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getTriggers(userId)
      .then((res) => {
        setData(res.data)
        console.log('data')
      })
      .catch((err) => {
        console.log('error', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  return (
    <div className="min-vh-100">
      {isLoading ? (
        <div className="d-flex flex-column mh-100 align-items-center justify-content-center">
          <p>Fetching triggers...</p>
          <BeatLoader
            color={color}
            loading={isLoading}
            css={override}
            size={15}
          />
        </div>
      ) : (
        <div>
           <Row className="py-5">
            <Col>
              <h2 className="m-0 p-0">Triggers</h2>
            </Col>
            <Col className="text-end title">
              <Link to="/events">
                <Button className="button-neutral shadow-none">To events</Button>
              </Link>
              <CreateNewTriggerButton triggerNumber={data.length}/>
            </Col>
          </Row>

          <Row>
            <Col className="mb-0" md="12" mt="20">
              <Card>
                <CardBody>
                  <Table className="mb-3 material-table">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Trigger Name</th>
                        <th>Trigger Condition</th>
                        <th>Location</th>
                        <th>Notify</th>
                        {myTariff !== 'free' &&
                          <th className="email">Emails</th>
                        }
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
                                {conditionToText(trigger.condition)}
                              </td>
                              <td>{trigger.location.name}</td>
                              <td className="text-nowrap">
                                {trigger.days}{' '}
                                {trigger.days === 1 ? 'day' : 'days'}
                              </td>
                              {myTariff !== 'free' &&  <td>{trigger.recipients.length}</td>}
                              <td style={{ color: trigger.status === 'on'  ? 'green' : 'red' }}>
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
        </div>
      )}
    </div>
  )
}

export default Triggers
