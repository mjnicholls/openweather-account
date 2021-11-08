import React, { useRef, useState } from 'react'
import {
  Row,
  Col,
  Input,
  Label,
  Button,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faPenSquare,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import humanReadableCondition from '../humanReadableCondition'
import MyMapComponent from '../components/GoogleMapCreate'
import '../App.scss'

const noBlankErrorMessage = 'Cannot be blank'

const ViewTrigger = (props) => {

  const mapRef = useRef(null)
  const [locations, setLocation] = useState('')
  const [error, setError] = useState('')
  const [activeName, setActiveName] = useState('')
  const [activeNameContent, setActiveNameContent] = useState('')

  const validationName = () => {
    setError({})
    let newError = {}

    if (name === '') {
      newError = {
        name: noBlankErrorMessage,
      }
    }

    if (Object.keys(newError).length) {
      setError(newError)
      return false
    }

    return true
  }

  const saveName = () => {
    const nameSet = activeNameContent;
    validationName(name)
    setActiveName('')
    setActiveNameContent(nameSet)
  }



  const data = {
      id: 1,
      condition: {
        condition: '>',
        units: 'metric',
        value: 20,
        variable: 'temp',
      },
      days: 3,
      name: 'Trigger 1',
      recipients: ['email1', 'email2', 'email3'] || {},
      status: false,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1,
    }


  const {condition, days, id, location, name, recipients, status} = data
  

  return (
    <>
    <Row>
      <Col md="7">
    <Row>
    {name === activeName ? (
        
            <Row>
              <Col md="4"><h3>Trigger Card</h3></Col>

              <Col md="4" key={name}>
                <Input
                  type="text"
                  onChange={(e) => {
                    setActiveNameContent(e.target.value)
                  }}
                  className={error.name ? 'danger-border' : ''}
                  value={activeName}
                  name="name"
                />
              </Col>
              <Col md="1" className="icons">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  onClick={() => saveName()}
                />
              </Col>
              <Col md="2">
                {status === true ? (
        <Button>
          Active
        </Button>
                ) : (
                  <Button>
                  Deactivated
                </Button>
                )}
      </Col>
            </Row>
          
        ) : (
    <Row>
            <Col md="4"><h3>Trigger Card</h3></Col>
              <Col md="4" key={name}>
              <p>{name}</p>
              </Col>
              <Col md="1" className="icons">
                <FontAwesomeIcon
                  icon={faPenSquare}
                  onClick={() => {
                    setActiveName(name)
                    setActiveNameContent(name)
                  }}
                />
              </Col>
              <Col md="2">
        <Button>
          Active
        </Button>
      </Col>
          
            </Row>
        )}
    </Row>
      <Row className="search-box">
        <Col md="3">
          <Label>Location</Label>
        </Col>

        <Col md="9">
          <Label type="text" value={location} className="cardContent">
          {location.name} ({location.lat}, {location.lon})
          </Label>
        </Col>
      </Row>
      <Row className="search-box">
        <Col md="3">
          <Label>Trigger Condition</Label>
        </Col>

        <Col md="9">
          <Label type="text" value={condition} className="cardContent">
          {humanReadableCondition(condition).substring(27)}
          </Label>
        </Col>
      </Row>
      <Row className="search-box">
        <Col md="3">
          <Label>Email recipients</Label>
        </Col>

        <Col md="9">
          <Label type="text" className="cardContent">
            <p>{recipients[0]}</p>
            <p>{recipients[1]}</p>
            <p>{recipients[2]}</p>
            <FontAwesomeIcon
                  icon={faArrowDown}
                  onClick={() => saveName()}
                />
          </Label>
        </Col>
      </Row>
      <Row>
      <h3>Events List</h3>
      </Row>
      <Row className="search-box">
        <Col md="3">
          <Label>Active Events</Label>
        </Col>

        <Col md="9">
          <Label type="text" value={recipients} className="cardContent">
         27 October 2021
         </Label>
        </Col>
      </Row>
      <Row className="search-box">
        <Col md="3">
          <Label>Archive</Label>
        </Col>

        <Col md="9">
          <Label type="text" value={recipients} className="cardContent">
         27 September 2021
         </Label>
        </Col>
      </Row>
      <Row className="search-box">
              <Col md="7"></Col>
              <Col md="5">
                <Button className="bottom-buttons">Edit</Button>

                <Button className="bottom-buttons">
                 Delete
                </Button>
              </Col>
            </Row>
      </Col>
      <Col md="5">
          <MyMapComponent
            mapRef={mapRef}
            location={location}
            setLocation={setLocation}
          />
      </Col>
      </Row>
    </>
  )
}


export default ViewTrigger