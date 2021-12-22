import React from 'react'

import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'

import { mapStyles } from '../assets/MapStyles'
import {mapStyle} from "../utils/styles";
import InfoWindow from './InfoWindow'

const Map = ({
  mapRef,
  tempLocation,
  setLocation,
  setTempLocation,
  isButtonInfoWindow
}) => {
  const onClickMap = ({ lat, lng }) => {
    setTempLocation({
      lat,
      lon: lng,
      name: 'Custom location',
    })
  }


  const defaultCenter = {
    lat: 51.509865,
    lng: -0.118092
  }

  const Marker = (props) =>
    <div style={{width: "100px", height: "100px"}}>
      <svg height={100} width={100} xmlns="http://www.w3.org/2000/svg" {...props}>
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

  return (
    <div id="map" style={mapStyle}>
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        center={{lat: tempLocation.lat ? tempLocation.lat : defaultCenter.lat, lng: tempLocation.lon ? tempLocation.lon : defaultCenter.lng}}
        defaultZoom={9}
        yesIWantToUseGoogleMapApiInternals
        options={{
          scrollwheel: false,
          styles: mapStyles.styles,
        }}
        onClick={onClickMap}
      >
        <InfoWindow
          location={tempLocation}
          setLocation={setLocation}
          showButton={isButtonInfoWindow}
          show
        />
        {/*<Marker*/}
          {/*lat={tempLocation.lat}*/}
          {/*lng={tempLocation.lon}*/}
        {/*/>*/}
      </GoogleMapReact>
    </div>
  )
}

Map.propTypes = {
  mapRef: PropTypes.object,
  tempLocation: PropTypes.object,
  setLocation: PropTypes.func,
  isButtonInfoWindow: PropTypes.bool
}

export default Map
