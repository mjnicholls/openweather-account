import React from 'react'
import Map from './RecycleCentersMap'
const API_KEY = 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY'
export default class RecycleCentersMapContainer extends React.Component {
  render() {
    return (
      <div className="map-container">
        <Map
          loadingElement={<div style={{ height: `100%` }} />}
          recycleCenters={this.props.recycleCenters}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          containerElement={<div style={{ height: `600px`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}
