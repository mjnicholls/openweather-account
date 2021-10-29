import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'

import { Col } from 'reactstrap'
import { mapStyles } from '../assets/MapStyles'
import '../App.scss'

import { placeMarker } from './mapBase'

const handleApiLoaded = (mapInstance, marker) => {
  mapInstance.addListener('click', (e) => {
    placeMarker(e.latLng, mapInstance, null)
  })
}

const createMapOptions = () => ({
  scrollwheel: false,
  styles: mapStyles.styles,
})

const SimpleMap = ({ mapRef }) => {

  // TODO set default to London - as in Marketplace
  const defaultProps = {
    center: {
      lat: 51.509865,
      lng: -0.118092,
    },
    zoom: 11,
  }

  useEffect(
    () => {
      if (mapRef.current) {
         console.log(mapRef.current)
      }
    }, [],
  )

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
