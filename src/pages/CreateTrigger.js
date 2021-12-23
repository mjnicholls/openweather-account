/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react'

import { ChevronLeft } from 'react-ikonate'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

import Condition from '../components/Condition'
import CreateTriggerButton from '../components/CreateTriggerButton'
import CreateTriggerCard from '../components/CreateTriggerCard'
import EditableInput from '../components/EditableInput'
import ErrorModal from '../components/ErrorModal'
import Map from '../components/Map'
import Notifications from '../components/Notifications'
import SearchBox from '../components/LocationSearchBox'
import { noBlankErrorMessage } from '../config'
import { addTrigger } from '../features/triggers/actions'
import placeMarker from '../utils/placeMarker'

const CreateTrigger = () => {
  const mapRef = useRef(null)
  const dispatch = useDispatch()

  const [alert, setAlert] = React.useState(null)

  const [location, setLocation] = useState({
    name: '',
    lat: '',
    lon: '',
  })

  const [tempLocation, setTempLocation] = useState({ ...location })

  const onClickMap = ({ lat, lng }) => {
    setTempLocation({
      lat,
      lon: lng,
      name: 'Custom location',
    })
  }

  useEffect(() => {
    setTempLocation(location)
  }, [location])

  useEffect(() => {
    if (tempLocation.lat && tempLocation.lon) {
      const position = new google.maps.LatLng(
        tempLocation.lat,
        tempLocation.lon,
      )
      placeMarker(position, mapRef.current.map_)
    }
  }, [tempLocation])

  useEffect(() => {
    // detect click outside location search box
    document.addEventListener('mousedown', handleClickOtsideSearchBox)
    return () => {
      document.removeEventListener('mousedown', handleClickOtsideSearchBox)
    }
  }, [])

  const [name, setName] = useState('')

  const [condition, setCondition] = useState({
    variable: 'temp',
    condition: '<',
    value: 0,
    units: 'metric',
  })

  const [days, setDays] = useState(0)

  const [recipients, setRecipients] = useState([])

  const [error, setError] = useState({})

  const [isSet, setIsSet] = useState(false)

  const [whoops, setWhoops] = useState('')

  const [isClicked, setIsClicked] = useState(false)

  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  const createTrigger = () => {
    const data = {
      location,
      condition,
      days,
      name,
      recipients,
      status: 'on',
    }

    setError({})

    const newError = {}

    if (!name) {
      newError.name = noBlankErrorMessage
    }
    if (!location.lat || !location.lon || !location.name) {
      newError.location = noBlankErrorMessage
    }

    if (Object.keys(newError).length) {
      setError(newError)
      return
    }
    dispatch(addTrigger(data))

    //  TODO add creation success / failure
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const htmlAlert = () => {
    setAlert(<CreateTriggerCard close={hideAlert} />)
  }

  const errorAlert = () => {
    setAlert(<ErrorModal whoops={whoops} close={hideAlert} />)
  }

  const [isDropDown, setIsDropDown] = useState(false)
  const searchBoxRef = useRef()

  const handleClickOtsideSearchBox = (e) => {
    if (searchBoxRef.current.contains(e.target)) {
      // inside click
      return
    }
    setIsDropDown(false)
    // outside click
    // ... do whatever on click outside here ...
  }

  const handleChange = (key, value) => {
    const newLocation = { ...location }
    newLocation[key] = value
    setLocation(newLocation)
  }

  return (
    <Row>
      <Col md="7">
        {alert}
        <Row>
          <Col className="mt-3">
            <Button onClick={goBack} className="navigation-link">
              <ChevronLeft fontSize="2rem" />
              Back
            </Button>
          </Col>
        </Row>
        <h2>New trigger</h2>
        <div className="pt-5 pb-5">
          <EditableInput
            content={name}
            setContent={setName}
            error={error.name}
          />

          <SearchBox
            mapRef={mapRef}
            location={location}
            setLocation={setLocation}
            tempLocation={tempLocation}
            setTempLocation={setTempLocation}
            onChange={(e) => handleChange('location', e.target.value)}
            error={error}
            name={name}
            searchBoxRef={searchBoxRef}
            isDropDown={isDropDown}
            setIsDropDown={setIsDropDown}
          />

          {/*{isSet ? <LocationName location={location} /> : null}*/}

          <Condition condition={condition} setCondition={setCondition} />

          <Notifications
            days={days}
            setDays={setDays}
            recipients={recipients}
            setRecipients={setRecipients}
          />

          <Row className="mt-4">
            <Col className="text-end">
              {/* <Button */}
              {/* className="button-neutral shadow-none" */}
              {/* onClick={goToPreviousPath} */}
              {/* > */}
              {/* Cancel */}
              {/* </Button> */}
              <CreateTriggerButton createFunc={createTrigger} />
            </Col>
          </Row>
        </div>
      </Col>
      <Col md="5">
        <Map
          mapRef={mapRef}
          mapLocation={tempLocation}
          setLocation={setLocation}
          onClickMap={onClickMap}
          isButtonInfoWindow={location !== tempLocation}
        />
      </Col>
    </Row>
  )
}

export default CreateTrigger
