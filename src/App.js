import React, {useRef} from 'react'
import './App.scss'
import { Row } from 'reactstrap'
import Footer from './components/Footer'
//import SimpleMap from './components/GoogleMaps'
import Header from './components/Header'
//import Map from './components/RecycleCentersMap'

import MyMapComponent from './components/GoogleMapFunctionComponent'
import AutoCompleteForm from './components/AutoCompleteForm'

const App = () => {

  const mapRef = useRef(null)

  return (
    <div className="App">
      <Header />

      {/*<Map*/}
      {/*loadingElement={<div style={{ height: `100%` }} />}*/}
      {/*containerElement={<div style={{ height: `600px`, width: `100%` }} />}*/}
      {/*googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}*/}
      {/*mapElement={<div style={{ height: `100%` }} />}*/}
      {/*/>*/}

      {/* <SimpleMap /> */}

      <Row>
        <AutoCompleteForm mapRef={mapRef}/>

        <MyMapComponent mapRef={mapRef} />
      </Row>
      <Footer />
    </div>
  )
}

export default App
