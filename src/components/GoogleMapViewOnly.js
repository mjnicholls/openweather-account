import React, { useEffect, useState } from 'react'

import GoogleMapReact from 'google-map-react'

import { mapStyles } from '../assets/MapStyles'
import '../App.scss'

import placeMarker from './placeMarker'


const handleApiLoaded = (mapInstance, coords) => {
  /* eslint-disable-next-line */
  const position = new google.maps.LatLng(coords.lat, coords.lng)
  placeMarker(position, mapInstance, null)
}


const createMapOptions = () => ({
  scrollwheel: false,
  styles: mapStyles.styles,
  draggable: false
})
/*eslint-disable-next-line */
const InfoWindow = ({ show, location }) => {


  return show && location.lat && location.lon ? (
    <div
      className="mapPop"
      style={{
        marginLeft: '-150px',
        marginTop: '-180px',
      }}
    >
      <h5>{location.name}</h5>
      <hr />
      <div className="main">
        <div>
          <p>
            <b>Latitude:</b>
            {location.lat.toFixed(6)}{' '}
          </p>
          <p>
            <b>Longitude:</b>
            {location.lon.toFixed(6)}
          </p>
        </div>
      </div>
    </div>
  ) : null
}

const ViewOnlyMap = ({ mapRef, location }) => {
  const [tempLocation, setTempLocation] = useState(location)
  const [isInfoWindow, setIsInfoWindow] = useState(true)

  useEffect(() => {
    setTempLocation(location)

  }, [location])


  const defaultProps = {
    zoom: 9,
  }


  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key: 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY' }}
        defaultCenter={{lat: location.lat, lng: location.lon}}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map, {lat: location.lat, lng: location.lon})}
        options={createMapOptions}

      >
        <InfoWindow
          show={isInfoWindow}
          setIsInfoWindow={setIsInfoWindow}
          location={tempLocation}
          style={{paddingTop:"20px"}}
        />
      </GoogleMapReact>
    </div>
  )
}

export default ViewOnlyMap
