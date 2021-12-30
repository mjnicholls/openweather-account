import React, { useRef, useState, useEffect } from 'react'

import { ChevronLeft } from 'react-ikonate'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Col, Row } from 'reactstrap'

import Condition from '../components/Condition'
import CreateTriggerButton from '../components/CreateTriggerButton'
import CreateTriggerCard from '../components/CreateTriggerCard'
import EditableInput from '../components/EditableInput'
import ErrorModal from '../components/ErrorModal'
import Map from '../components/Map'
import Notifications from '../components/Notifications'
import Location from '../components/Location'
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
  const [isLocationNameEdited, setIsLocationNameEdited] = useState(false)

  useEffect(() => {
    setTempLocation({
      ...tempLocation,
      lat: location.lat,
      lon: location.lon
    })
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
    document.addEventListener('mousedown', handleClickOutsideSearchBox)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearchBox)
    }
  }, [])

  const setNameFunc = (val) => {
    setError({
      ...error,
      name: null
    })
    setName(val)
  }

  const setLocationNameAware = (val) => {
    setError({
      ...error,
      location: null
    })
    setLocation({
      ...val,
      name: isLocationNameEdited ?
        location.name : `${val.name} (${val.lat.toFixed(2)}, ${val.lat.toFixed(2)})`,
    })
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
    let toastMessage = ''
    if (!name) {
      newError.name = noBlankErrorMessage
      toastMessage = 'Please enter trigger name. '
    }
    if (!location.lat || !location.lon || !location.name) {
      if (tempLocation.lat && tempLocation.lon) {
        newError.location = "You haven't set the location. Please click on the Set location button on the map"
      } else {
        newError.location = noBlankErrorMessage
      }

      toastMessage += 'Please enter trigger location. '
    }

    if (Object.keys(newError).length) {
      setError(newError)
      toast.error(toastMessage)
      return
    }
    dispatch(addTrigger(data))
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

  const handleClickOutsideSearchBox = (e) => {
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
    <div className="page-container">
      <Row>
        <Col md="7" className="page-padding">
          {triggerCreationSuccess && (
            <CreateTriggerCard
              trigger={triggerCreationSuccess}
              close={hideAlert}
            />
          )}
          {triggerCreationFailure && (
            <ErrorModal whoops={triggerCreationFailure} close={hideAlert} />
          )}
          {/*<Row>*/}
          {/*<Col className="mt-3">*/}
          {/*<Button onClick={goBack} className="navigation-link">*/}
          {/*<ChevronLeft fontSize="2rem" />*/}
          {/*Back*/}
          {/*</Button>*/}
          {/*</Col>*/}
          {/*</Row>*/}

          <Row className="first-row">
            <Col>
              <h2>New trigger</h2>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h5>Name</h5>
              <EditableInput
                content={name}
                setContent={setNameFunc}
                error={error.name}
                tagName="h2"
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Location
                mapRef={mapRef}
                location={location}
                setLocation={setLocation}
                tempLocation={tempLocation}
                setTempLocation={setTempLocation}
                onChange={(e) => handleChange('location', e.target.value)}
                error={error}
                setError={setError}
                name={name}
                searchBoxRef={searchBoxRef}
                isDropDown={isDropDown}
                setIsDropDown={setIsDropDown}
                setIsLocationNameEdited={setIsLocationNameEdited}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Condition condition={condition} setCondition={setCondition} />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Notifications
                days={days}
                setDays={setDays}
                recipients={recipients}
                setRecipients={setRecipients}
              />
            </Col>
          </Row>

          <div className="space-placeholder">&nbsp;</div>
          <Row>
            <Col>
              <Button onClick={goBack} className="navigation-link">
                <ChevronLeft fontSize="2rem" />
                Back
              </Button>
            </Col>

            <Col className="text-end">
              <CreateTriggerButton createFunc={createTrigger} />
            </Col>
          </Row>

        </Col>
        <Col md="5">
          <Map
            mapRef={mapRef}
            mapLocation={tempLocation}
            setLocation={setLocationNameAware}
            onClickMap={onClickMap}
            isButtonInfoWindow={location.lat !== tempLocation.lat || location.lon !== tempLocation.lon}
          />
        </Col>
      </Row>
    </div>
  )
}

export default CreateTrigger
