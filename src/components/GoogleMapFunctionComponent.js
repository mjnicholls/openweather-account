import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Col } from 'reactstrap'
import { mapStyles } from '../assets/MapStyles'
import '../App.scss'

/* eslint-disable-next-line */
var newMarker

const placeMarker = (position, map, lat, lng) => {

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


  const contentString = `<div class="mapPop" style="width:300px!important">
    <h5 >Custom Location</h5>
    <hr/>

    <div style=" display: flex; justify-content: space-between; padding-top: 0pt; flex-wrap: nowrap;">

    <div style="background: white;
    display: inline-block;
    width: 60%;
    margin-right:0px;  
    vertical-align:top;">
 
      <p style="margin: 0; font-size: 1rem; font-family: Arial, sans-serif;"><b style="font-weight: bold">Latitude:</b> ${myLatlng.lat.toFixed(
        6,
      )} </p>
      <p style="margin: 0; font-size: 1rem; font-family: Arial, sans-serif;"><b style="font-weight: bold">Longitude:</b> ${myLatlng.lng.toFixed(
        6,
      )} </p>

      </div>

      <div style="background: white;
      display: inline-block;
      width:v40%;
      margin-right:0x;  
      vertical-align:top;">

    <button click="addMarker" style="
    display: inline-block;
    font-weight: 400;
    font-family: Arial, sans-serif;
    text-align: left;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.8rem 1.5rem;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 16pt;
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
    ">
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
