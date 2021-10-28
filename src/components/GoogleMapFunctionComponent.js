import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapStyles } from '../assets/MapStyles'


const placeMarker = (position, map, lat, lng) => {

  const myLatlng = { lat: position.lat(), lng: position.lng() }

    /* eslint-disable-next-line */
    const newMarker = new google.maps.Marker({
      position,
      map,
      lat,
      lng,
    })

    const contentString = `<div id="content">
    <h3>Custom Location</h3>
    <div id="bodyContent">
    <h5>Lat:</h5>${myLatlng.lat}
    <h5>Lng:</h5>${myLatlng.lng}
    <button>Add Location</button>
    </div>
    </div>`

    /* eslint-disable-next-line */
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      position,
    })

    infoWindow.open({
        anchor: newMarker,
        map,
        shouldFocus: false,
      })

    // newMarker.addListener('click', () => {
    //   infoWindow.open({
    //     anchor: newMarker,
    //     map,
    //     shouldFocus: false,
    //   })
    // })

    map.panTo(position)
  }

const handleApiLoaded = (mapInstance, maps, marker) => {

  mapInstance.addListener('click', (e) => {
    placeMarker(e.latLng, mapInstance, marker)
  })

}

const createMapOptions = () =>  ({
  scrollwheel: false,
  styles: mapStyles.styles
})


const SimpleMap = () => {

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  }

  return (
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
  )

}

export default SimpleMap
