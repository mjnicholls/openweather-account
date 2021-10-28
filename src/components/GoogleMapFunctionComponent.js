/*eslint-disable */
import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { mapStyles } from '../assets/MapStyles'

const handleApiLoaded = (map, maps, marker) => {
  map.addListener('click', function (e) {
    placeMarker(e.latLng, map)
  })

  function placeMarker(position, map, lat, lng) {
    const myLatlng = { lat: 59.95, lng: 30.33 }

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      lat: lat,
      lng: lng,
    })

    const contentString = `<div id="content">
    <h3>Custom Location</h3>
    <div id="bodyContent">
    <h5>Lat:</h5>${myLatlng.lat}
    <h5>Lng:</h5>${myLatlng.lng}
    <button>Add Location</button>
    </div>
    </div>`

    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      position: position,
    })

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      })
    })

    map.panTo(position)
  }
}

// style as pop up
const AnyReactComponent = ({ coords, name }) =>
  <div style={{backgroundColor: "#ffffff", padding: "20px", width: "200px", height: "200px" }}>{name} {coords.lat} {coords.lng}</div>

const createMapOptions = () =>  ({
  scrollwheel: false,
  styles: mapStyles.styles
})


const SimpleMap = () => {

  const [coords, setCoords] = useState({
    lat: 59.95,
    lng: 30.33
  })


  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  }

  const _onClick = (obj) => {
    setCoords({
      lat: obj.lat,
      lng: obj.lng
    })
  }

  return (
    <div
      className="container"
      id="map"
      style={{ height: '100vh', width: '100%' }}
    >
      {/*<div style={{backgroundColor: "#ffffff", width: "200px", height: "200px", position: "absolute", zIndex: 99, top: "50%", left: "50%"}}>Pop up</div>*/}
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY' }}
        defaultCenter={coords}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        // styles={mapStyles}
        options={createMapOptions}
        onClick={_onClick}
      >
        <AnyReactComponent coords={coords} name="Custom location"/>
      </GoogleMapReact>
    </div>
  )

}

export default SimpleMap
