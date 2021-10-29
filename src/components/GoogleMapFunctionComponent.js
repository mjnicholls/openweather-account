import React, {useRef} from 'react'
import GoogleMapReact from 'google-map-react'
import { Col } from 'reactstrap'
import { mapStyles } from '../assets/MapStyles'
import '../App.scss'

/* eslint-disable-next-line */
var newMarker

export const placeMarker = (position, map, lat, lng, name) => {
  // eslint-disable-next-line
  name = name || 'Custom location'
  const myLatlng = { lat: position.lat(), lng: position.lng() }

  if (!newMarker) {
    /* eslint-disable-next-line */
    newMarker = new google.maps.Marker({
      position,
      map,
      lat,
      lng,
    })
  } else {
    newMarker.setPosition(position);
  }

  const contentString = `<div class="mapPop">
    <h5>${name}</h5>
    <hr/>

    <div class="main">

    <div>
 <p>
      <b>Latitude:</b> ${myLatlng.lat.toFixed(
        6,
      )} </p>
      <p>
      <b>Longitude:</b> ${myLatlng.lng.toFixed(
        6,
      )} </p>

      </div>

      <div 
      class="body">

    <button click="addMarker">
      Add location
    </button>
    </div>
  </div>
 
    </div>`

  /* eslint-disable-next-line */
  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position,
  })

  infoWindow.open({
    anchor: newMarker,
    map,
    shouldFocus: false,
  })

  map.panTo(position)
}

const handleApiLoaded = (mapInstance, marker) => {
  mapInstance.addListener('click', (e) => {
    placeMarker(e.latLng, mapInstance, marker, null)
  })
}

const createMapOptions = () => ({
  scrollwheel: false,
  styles: mapStyles.styles,
})

const SimpleMap = () => {

  const mapRef = useRef(null)

  const defaultProps = {
    center: {
      lat: 51.509865,
      lng: -0.118092,
    },
    zoom: 11,
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
