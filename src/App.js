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

      <Row>
        <AutoCompleteForm mapRef={mapRef}/>

        <MyMapComponent mapRef={mapRef} />
      </Row>
      <Footer />
    </div>
  )
}

export default App
