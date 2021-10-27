/*eslint-disable */
import React, { Component } from 'react'
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

const AnyReactComponent = ({ text }) => <div>{text}</div>

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  }

  render() {
    return (
      <div
        className="container"
        id="map"
        style={{ height: '100vh', width: '100%' }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          styles={mapStyles}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default SimpleMap
