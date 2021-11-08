/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  faTrash,
  faPenSquare,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap'
import '../App.scss'
import { Link } from 'react-router-dom'
import humanReadableCondition from '../humanReadableCondition'

// import AgroPagination from '../agro-components/AgroPagination'

import { Close, Edit } from 'react-ikonate'
import TabsSelector from '../components/TabsSelector.js'
import '../App.scss'

const TriggerList = () => {
  const [singular, setSingular] = useState('')

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
  const [trigger, setTrigger] = useState([])

  const [page, setPage] = useState(0)
  const [pageData, setPageData] = useState([])

  const fetchData = async () => {
    return axios.get("https://openweathermap.org/api/trigger/all")
    .then((response) => console.log(response.data));
}

  useEffect(() => {
    fetchData()
  }, [])

  
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

                  {/*      
                  <tbody>
                    {pageData.map((triggers) => (
                  
                      <tr>
                          <td></td>
                        <td>
                          {triggers.trigger.name}
                        </td>
                        <td>{triggers.trigger.condition}</td>
                      <td>{triggers.trigger.location.name}</td> 
                        <td>{triggers.trigger.days}</td>
                      <td>  {/* {trigger.status}*/}
                  {/*}
                      </td> 
                        <td className="text-right">
                          <a
                            role="button"
                            href="/"
                            className="btn-link btn-icon btn-neutral"
                          >
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="download"
                            placement="top"
                          >
                            Download
                          </UncontrolledTooltip>
                          <a
                            role="button"
                            href="/"
                            target="_blank"
                            className="btn-link btn-icon btn-neutral"
                          >
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="view"
                            placement="top"
                          >
                            View
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                    */}

                  <tbody>
                    {pageData.map((triggers) => (
                      <tr>
                        <td>{triggers.id}</td>

                        <td>{triggers.name}</td>
                        <td>
                          {' '}
                          {humanReadableCondition(triggers.condition).substring(
                            27,
                          )}
                        </td>
                        <td>{triggers.location.name}</td>
                        <td>
                          Up to {triggers.days}{' '}
                          {triggers.days === 1 ? 'day' : 'days'}
                        </td>
                        <td>{triggers.recipients.length}</td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" checked={triggers.status} />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <Edit
                            fontSize="23px"
                            borderWidth={1}
                            color="#48484a"
                          />
                          {/*<FontAwesomeIcon icon={faPenSquare} />*/}
                        </td>
                        <td>
                          <Close
                            fontSize="23px"
                            borderWidth={1}
                            color="#48484a"
                          />
                          {/*<FontAwesomeIcon icon={faTrash} />*/}
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

{
  /*}  <AgroPagination
                count={trigger.length}
                itemsPerPage={itemsPerPage}
                page={page}
                setPage={setPage}
              />

                    */
}
