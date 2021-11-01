import React, { useRef, useState } from 'react'

import { Row } from 'reactstrap'

import AutoCompleteForm from '../components/AutoCompleteForm'
import MyMapComponent from '../components/GoogleMapFunctionComponent'

const CreateTrigger = () => {
  const mapRef = useRef(null)

  const [location, setLocation] = useState({
    name: '',
    lat: 0,
    lon: 0,
  })

  return (
    <Row>
      <AutoCompleteForm mapRef={mapRef} />
      <MyMapComponent mapRef={mapRef} />
    </Row>
  )
}

export default CreateTrigger
