import React, { useEffect, useState } from 'react'

import GoogleMapReact from 'google-map-react'

import { mapStyles } from '../assets/MapStyles'
import '../App.scss'

import placeMarker from './placeMarker'

import PropTypes from 'prop-types'

const handleApiLoaded = (mapInstance) => {
  mapInstance.addListener('click', (e) => {
    placeMarker(e.latLng, mapInstance, null)
  })
}

const createMapOptions = () => ({
  scrollwheel: false,
  styles: mapStyles.styles,
})

const InfoWindow = ({ show, location, setLocation, showButton }) => {
  const onSetLocationClick = (e) => {
    setLocation(location)
    e.stopPropagation()
    // setIsInfoWindow(false)
  }

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
        <div className="body">
          {showButton && (
            <button type="button" onClick={onSetLocationClick}>
              Set location
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null
}

const SimpleMap = ({ mapRef, location, setLocation }) => {
  const [tempLocation, setTempLocation] = useState(location)
  const [isInfoWindow, setIsInfoWindow] = useState(true)

  useEffect(() => {
    setTempLocation(location)
  }, [location])

  const defaultProps = {
    center: {
      lat: 51.509865,
      lng: -0.118092,
    },
    zoom: 9,
  }

  const onClickMap = ({ lat, lng }) => {
    setTempLocation({
      lat,
      lon: lng,
      name: 'Custom location',
    })
  }

  return (
    <div id="map" style={{ height: '177vh', width: '100%' }}>
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key: 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={createMapOptions}
        onClick={onClickMap}
      >
        <InfoWindow
          show={isInfoWindow}
          setIsInfoWindow={setIsInfoWindow}
          location={tempLocation}
          setLocation={setLocation}
          showButton
        />
      </GoogleMapReact>
    </div>
  )
}

InfoWindow.propTypes = {
  location: PropTypes.string,
  setLocation: PropTypes.func,
  showButton: PropTypes.func,
  show: PropTypes.bool,
}

export default SimpleMap
