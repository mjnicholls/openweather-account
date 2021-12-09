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

const InfoWindow = ({
  show,
  location,
  setLocation,
  showButton,
  setIsSet,
  setIsClicked,
  isClicked,
}) => {
  const onSetLocationClick = (e) => {
    setLocation(location)
    e.stopPropagation()
    setIsClicked(true)
    setIsSet(true)
  }

  return show && location.lat && location.lon ? (
    <div
      className="mapPop"
      style={{
        marginLeft: '-150px',
        marginTop: '-160px',
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
          {isClicked ? null : (
            <>
              {showButton && (
                <button
                  type="button"
                  className="button-active"
                  onClick={onSetLocationClick}
                >
                  Set location
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  ) : null
}

const SimpleMap = ({
  mapRef,
  location,
  setLocation,
  setIsSet,
  setIsClicked,
  isClicked,
}) => {
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
    setIsClicked(false)
    setTempLocation({
      lat,
      lon: lng,
      name: 'Custom location',
    })
  }

  return (
    <div id="map" style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key: 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={createMapOptions}
        onClick={onClickMap}
        setIsSet={setIsSet}
        setIsClicked={setIsClicked}
      >
        <InfoWindow
          show={isInfoWindow}
          setIsInfoWindow={setIsInfoWindow}
          location={tempLocation}
          setLocation={setLocation}
          setIsSet={setIsSet}
          setIsClicked={setIsClicked}
          isClicked={isClicked}
          showButton
        />
      </GoogleMapReact>
    </div>
  )
}

InfoWindow.propTypes = {
  location: PropTypes.object,
  setLocation: PropTypes.func,
  showButton: PropTypes.func,
  show: PropTypes.bool,
}

export default SimpleMap
