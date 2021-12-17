import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'reactstrap'

import { getEvents } from '../api/api'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import Day from '../components/Day'
import EventPlaceholder from '../components/EventPlaceholder'
import '../App.scss'

const selectUserId = (state) => state.auth.user.id

const Events = () => {
  const userId = useSelector(selectUserId)
  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState([])

  const contentLoader = 4

  useEffect(() => {
    setIsLoading(true)
    getEvents(userId)
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
          <h2 className="m-0 p-0">Events</h2>
        </Col>
        <Col className="text-end title">
          <Link to="/dashboard/triggers">
            <Button className="button-neutral shadow-none">To triggers</Button>
          </Link>
          <CreateNewTriggerButton />
        </Col>
      </Row>

      {isLoading ? (
        <>
          <Row>
            {[...Array(contentLoader)].map((_, index) => (
              // eslint-disable-next-line
              <Col key={index} className="my-3" md="6" mt="10">
                <EventPlaceholder />
              </Col>
            ))}
          </Row>
        </>
      ) : data.length ? (
        <Row>
          {data.map((day) => (
            <React.Fragment key={day.day}>
              <Col md="6">
                <Row>
                  <Col className="mb-0" md="12" mt="10">
                    <Day day={day} />
                  </Col>
                </Row>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <h4>No events</h4>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default Events
