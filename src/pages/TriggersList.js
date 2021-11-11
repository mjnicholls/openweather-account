/*eslint-disable*/
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import '../App.scss'
import { Link, Route } from 'react-router-dom'
import humanReadableCondition from '../humanReadableCondition'
import { getTriggers } from '../api/api'
// import AgroPagination from '../agro-components/AgroPagination'

import { Edit } from 'react-ikonate'

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
        variable: 'rain',
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




  {
    /*}

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
            <h1>Trigger List</h1>
          </Col>
        </Row>
        <Row>
          <Col className="mb-0" md="12" mt="20">
            <Card>
              <CardBody>
                <Table className="mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
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
                    {data.map((trigger) => (trigger.status !== "deleted") && (
                      <tr>
                        <td>{trigger.id}</td>
                        <td>
                          <Link
                            to={{ pathname: '/view-trigger', state: trigger }}
                          >
                            {trigger.name}
                          </Link>
                        </td>
                        <td>
                          {' '}
                          {humanReadableCondition(trigger.condition).substring(
                            27,
                          )}
                        </td>
                        <td>{trigger.location.name}</td>
                        <td>
                          Up to {trigger.days}{' '}
                          {trigger.days === 1 ? 'day' : 'days'}
                        </td>
                        <td>{trigger.recipients.length}</td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" checked={trigger.status === "on"} />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                       <EditTriggerCard />
                        </td>
                        <td>
                          <DeleteTriggerCardX />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="7"></Col>
          <Col md="3">
            <Link to="/">
              <Button className="bottom" style={{ width: '250px' }}>
                List of Forecasted Events
              </Button>
            </Link>
          </Col>
          <Col md="2">
            <Link to="/create">
              <Button className="bottom">Create new trigger</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default TriggerList
