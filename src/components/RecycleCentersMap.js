/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [selectedCenter, setSelectedCenter] = useState(null)

    const recycleCenters = props.recycleCenters

    useEffect(() => {
      const listener = (e) => {
        if (e.key === 'Escape') {
          setSelectedCenter(null)
        }
      }
      window.addEventListener('keydown', listener)
      return () => {
        window.removeEventListener('keydown', listener)
      }
    }, [])

    return (
      <div>
        <GoogleMap zoom={4.5} center={{ lat: 39.6693, lng: -98.3476 }}>
          {recycleCenters.map((center) => (
            <Marker
              key={center.id}
              position={{
                lat: center.latitude,
                lng: center.longitude,
              }}
              onClick={() => {
                setSelectedCenter(center)
              }}
            />
          ))}
          {selectedCenter && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedCenter(null)
              }}
              position={{
                lat: selectedCenter.latitude,
                lng: selectedCenter.longitude,
              }}
            ></InfoWindow>
          )}
          <div>
            <h3>{selectedCenter.latitude}</h3>
            <h3>{selectedCenter.longitude}</h3>
          </div>
        </GoogleMap>
      </div>
    )
  }),
)

export default Map
