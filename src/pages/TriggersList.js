/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  faTrash,
  faPenSquare,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
  Button,
} from 'reactstrap'
import '../App.scss'

// import AgroPagination from '../agro-components/AgroPagination'

const TriggerList = () => {

  const pageData = [
    {
      id: 1,
      condition: {
        condition: ">",
        units: "metric",
        value: 20,
        variable: "temp"
      },
      days: 3,
      name: "Trigger 1",
      recipients: ["email1", "email2", "email3"],
      status: true,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1
    },
    {
      id: 2,
      condition: {
        condition: ">",
        units: "metric",
        value: 10,
        variable: "wind"
      },
      days: 3,
      name: "Trigger 1",
      recipients: ["email1", "email2", "email3", "email2", "email3"],
      status: true,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1
    },
    {
      id: 3,
      condition: {
        condition: "<",
        units: "metric",
        value: 5,
        variable: "rain"
      },
      days: 3,
      name: "Trigger 1",
      recipients: ["email2", "email3"],
      status: true,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1
    },
    {
      id: 4,
      condition: {
        condition: "<",
        units: "metric",
        value: 0,
        variable: "temp"
      },
      days: 1,
      name: "Trigger 1",
      recipients: ["email1", "email2"],
      status: true,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1
    },
    {
      id: 5,
      condition: {
        condition: ">",
        units: "metric",
        value: 20,
        variable: "temp"
      },
      days: 2,
      name: "Trigger 1",
      recipients: ["email1", "email2", "email3", "email2", "email3"],
      status: true,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1
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
                    <tr>
                      <td>1</td>
                      <td>Trigger 1</td>
                      <td>The temperature exceeds 30°C degrees</td>
                      <td>Paris, France</td>
                      <td>Up to one day</td>
                      <td>3</td>
                      <td>
                        <Button>Deactivate</Button>
                      </td>
                      <td>
                        <Button>Edit</Button>
                      </td>
                      <td>
                        <Button>Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>

            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8"></Col>
          <Col md="2">
            <Button className="bottom">List of Forecasted Events</Button>
          </Col>
          <Col md="2">
            <Button className="bottom">Create new trigger</Button>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default TriggerList


  {/*}  <AgroPagination
                count={trigger.length}
                itemsPerPage={itemsPerPage}
                page={page}
                setPage={setPage}
              />

                    */}