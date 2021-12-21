import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import { getEvents } from '../api/api'
import CreateNewTriggerButton from '../components/CreateTriggerButton'
import Day from '../components/Day'
import DayPlaceholder from '../components/DayPlaceholder'
import '../App.scss'

const selectUserId = (state) => state.auth.user.id

const Events = () => {
  const userId = useSelector(selectUserId)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const history = useHistory()
  const handleCreateClick = () => history.push('/dashboard/triggers/create')

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
          <Link
            role="button"
            to="/dashboard/triggers"
            className="navigation-link"
          >
            To triggers
          </Link>
          <CreateNewTriggerButton createFunc={handleCreateClick} />
        </Col>
      </Row>

      {isLoading ? (
        <>
          <Row>
            {[...Array(contentLoader)].map((_, index) => (
              // eslint-disable-next-line
              <Col key={index} className="my-3" md="6" mt="10">
                <DayPlaceholder />
              </Col>
            ))}
          </Row>
        </>
      ) : data.length ? (
        <Row>
          {data.map((day) => (
            <Col md="6" className="mb-0" key={day.day}>
              <Day day={day} />
            </Col>
          ))}
        </Row>
      ) : (
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

export default Events
