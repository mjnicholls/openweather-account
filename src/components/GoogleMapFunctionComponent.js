import React from 'react'
import GoogleMapReact from 'google-map-react'

import { Col } from 'reactstrap'
import { mapStyles } from '../assets/MapStyles'
import '../App.scss'

import placeMarker from './placeMarker'

const handleApiLoaded = (mapInstance) => {
  mapInstance.addListener('click', (e) => {
    placeMarker(e.latLng, mapInstance, null)
  })
}

const createMapOptions = () => ({
  scrollwheel: false,
  styles: mapStyles.styles,
})

const SimpleMap = ({ mapRef }) => {

  const defaultProps = {
    center: {
      lat: 51.509865,
      lng: -0.118092,
    },
    zoom: 9,
  }

  return (
    <Col md="5">
      <div
        className="container"
        id="map"
        style={{ height: '100vh', width: '100%' }}
      >
        <GoogleMapReact
          ref={mapRef}
          bootstrapURLKeys={{ key: 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          options={createMapOptions}
        />
      </div>
    </Col>
  )
}

export default SimpleMap
