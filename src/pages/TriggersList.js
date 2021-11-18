/*eslint-disable*/
import React, { useEffect, useState, useTable } from 'react'

import { useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import '../App.scss'
import { Link } from 'react-router-dom'
import humanReadableCondition from '../humanReadableCondition'
import { getTriggers } from '../api/api'
// import AgroPagination from '../agro-components/AgroPagination'

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

  {
    /*}

  const pageData = [
    {
      id: 1,
      condition: {
        condition: '>',
        units: 'metric',
        value: 20,
        variable: 'temp',
      },
      days: 3,
      name: 'Trigger 1',
      recipients: ['email1', 'email2', 'email3'],
      status: false,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1,
    },
    {
      id: 2,
      condition: {
        condition: '>',
        units: 'metric',
        value: 10,
        variable: 'wind',
      },
      days: 3,
      name: 'Trigger 1',
      recipients: ['email1', 'email2', 'email3', 'email2', 'email3'],
      status: false,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1,
    },
    {
      id: 3,
      condition: {
        condition: '<',
        units: 'metric',
        value: 5,
        variable: 'prec',
      },
      days: 3,
      name: 'Trigger 1',
      recipients: ['email2', 'email3'],
      status: false,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1,
    },
    {
      id: 4,
      condition: {
        condition: '<',
        units: 'metric',
        value: 0,
        variable: 'temp',
      },
      days: 1,
      name: 'Trigger 1',
      recipients: ['email1', 'email2'],
      status: false,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1,
    },
    {
      id: 5,
      condition: {
        condition: '>',
        units: 'metric',
        value: 20,
        variable: 'temp',
      },
      days: 2,
      name: 'Trigger 1',
      recipients: ['email1', 'email2', 'email3', 'email2', 'email3'],
      status: true,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1,
    },
  ]

 

  const [page, setPage] = useState(0)
  const [pageData, setPageData] = useState([])

  const fetchData = async () => {
    return axios.get("https://openweathermap.org/api/trigger/all")
    .then((response) => console.log(response.data));
}
  
  useEffect(() => {
    setPageData(trigger.slice(page * itemsPerPage, (page + 1) * itemsPerPage))
  }, [trigger, page])

  const itemsPerPage = 10

*/
  }

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
                      <th></th>
                      <th>Trigger Name</th>
                      <th>Trigger Condition</th>
                      <th>Location</th>
                      <th>Notify</th>
                      <th>Email Recipients</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map(
                      (trigger, index) =>
                        trigger.status !== 'deleted' && (
                          <tr>
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
                             {trigger.status.charAt(0).toUpperCase() + trigger.status.slice(1) }
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
