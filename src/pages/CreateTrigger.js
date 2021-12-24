import React, { useRef, useState, useEffect } from 'react'

import { ChevronLeft } from 'react-ikonate'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

import Condition from '../components/Condition'
import CreateTriggerButton from '../components/CreateTriggerButton'
import CreateTriggerCard from '../components/CreateTriggerCard'
import EditableInput from '../components/EditableInput'
import ErrorModal from '../components/ErrorModal'
import Map from '../components/Map'
import Notifications from '../components/Notifications'
import LocationSearchBox from '../components/LocationSearchBox'
import { noBlankErrorMessage } from '../config'
import {
  addTrigger,
  closeTriggerCreationNotification,
} from '../features/triggers/actions'
import placeMarker from '../utils/placeMarker'

const selectIsTriggerCreationError = (state) =>
  state.triggers.triggerCreationError
const selectIsTriggerCreationSuccess = (state) =>
  state.triggers.triggerCreationSuccess

const CreateTrigger = () => {
  const mapRef = useRef(null)
  const searchBoxRef = useRef()

  const dispatch = useDispatch()

  const triggerCreationSuccess = useSelector(selectIsTriggerCreationSuccess)
  const triggerCreationFailure = useSelector(selectIsTriggerCreationError)

  const history = useHistory()

  const [location, setLocation] = useState({
    name: '',
    lat: '',
    lon: '',
  })
  const [tempLocation, setTempLocation] = useState({ ...location })
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
  const [isDropDown, setIsDropDown] = useState(false)

  useEffect(() => {
    setTempLocation(location)
  }, [location])

  useEffect(() => {
    if (tempLocation.lat && tempLocation.lon) {
      // eslint-disable-next-line
      const position = new google.maps.LatLng(
        tempLocation.lat,
        tempLocation.lon,
      )
      // eslint-disable-next-line
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

  const onClickMap = ({ lat, lng }) => {
    setTempLocation({
      lat,
      lon: lng,
      name: 'Custom location',
    })
  }

  const goBack = () => {
    try {
      history.goBack()
    } catch {
      history.push('/dashboard/triggers')
    }
  }

  const hideAlert = () => {
    dispatch(closeTriggerCreationNotification())
  }

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
        {triggerCreationSuccess && (
          <CreateTriggerCard
            trigger={triggerCreationSuccess}
            close={hideAlert}
          />
        )}
        {triggerCreationFailure && (
          <ErrorModal whoops={triggerCreationFailure} close={hideAlert} />
        )}
        <Row>
          <Col className="mt-3">
            <Button onClick={goBack} className="navigation-link">
              <ChevronLeft fontSize="2rem" />
              Back
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex align-items-baseline">
              <h2 className="m-0">New trigger:&nbsp;</h2>
              <EditableInput
                content={name}
                setContent={setName}
                error={error.name}
                tagName="h2"
              />
            </div>
          </Col>
        </Row>
        <div className="pt-5 pb-5">
          <LocationSearchBox
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

          <Condition condition={condition} setCondition={setCondition} />

          <Notifications
            days={days}
            setDays={setDays}
            recipients={recipients}
            setRecipients={setRecipients}
          />

          <Row className="mt-4">
            <Col className="text-end">
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
