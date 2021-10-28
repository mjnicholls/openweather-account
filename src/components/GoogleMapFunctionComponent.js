import React from "react";
import GoogleMapReact from 'google-map-react';
import {mapStyles} from "../assets/MapStyles";

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const SimpleMap = () => {

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const createMapOptions = () =>  ({
    scrollwheel: false,
    styles: mapStyles.styles
  })

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  )

}

export default SimpleMap
