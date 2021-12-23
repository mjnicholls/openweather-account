import React, { useEffect } from 'react'

import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'

import { mapStyles } from '../assets/MapStyles'
import placeMarker from '../utils/placeMarker'
import { mapStyle } from '../utils/styles'
import InfoWindow from './InfoWindow'

const Map = ({
  mapRef,
  mapLocation,
  setLocation,
  onClickMap,
  isButtonInfoWindow,
  isDraggable = true,
}) => {
  const defaultCenter = {
    lat: 51.509865,
    lng: -0.118092,
  }

  // useEffect(() => {
  //   // eslint-disable-next-line
  //   if (mapRef.current && mapRef.current.map_) {
  //     // eslint-disable-next-line
  //     const position = new google.maps.LatLng(mapLocation.lat, mapLocation.lon)
  //     // eslint-disable-next-line
  //     placeMarker(position, mapRef.current.map_)
  //   }
  // }, [mapRef.current])

  const Marker = (props) => (
    <div style={{ width: '100px', height: '100px' }}>
      <svg
        height={100}
        width={100}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 0a8 8 0 0 0-8 8c0 1.421.382 2.75 1.031 3.906.108.192.221.381.344.563L12 24l6.625-11.531c.102-.151.19-.311.281-.469l.063-.094A7.954 7.954 0 0 0 20 8a8 8 0 0 0-8-8zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"
          fill="#e74c3c"
        />
        <path
          d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
          fill="#c0392b"
        />
      </svg>
    </div>
  )

  return (
    <div id="map" style={mapStyle}>
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        center={{
          lat: mapLocation.lat ? mapLocation.lat : defaultCenter.lat,
          lng: mapLocation.lon ? mapLocation.lon : defaultCenter.lng,
        }}
        defaultZoom={9}
        yesIWantToUseGoogleMapApiInternals
        options={{
          scrollwheel: false,
          styles: mapStyles.styles,
          draggable: isDraggable,
        }}
        onClick={onClickMap}
      >
        <InfoWindow
          location={mapLocation}
          setLocation={setLocation}
          showButton={isButtonInfoWindow}
          show
        />
        {/* <Marker */}
        {/* lat={mapLocation.lat} */}
        {/* lng={mapLocation.lon} */}
        {/* /> */}
      </GoogleMapReact>
    </div>
  )
}

Map.propTypes = {
  mapRef: PropTypes.object,
  mapLocation: PropTypes.object,
  setLocation: PropTypes.func,
  onClickMap: PropTypes.func,
  isButtonInfoWindow: PropTypes.bool,
  isDraggable: PropTypes.bool,
}

export default Map
