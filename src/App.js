import './App.scss'
import Footer from './components/Footer'
import SimpleMap from './components/GoogleMaps'
import Header from './components/Header'
import Map from './components/RecycleCentersMap'
import logo from './logo.svg'

import MyMapComponent from './components/GoogleMapFunctionComponent'

const API_KEY = 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY'


function App() {
  return (
    <div className="App">
      <Header />

      {/*<Map*/}
        {/*loadingElement={<div style={{ height: `100%` }} />}*/}
        {/*containerElement={<div style={{ height: `600px`, width: `100%` }} />}*/}
        {/*googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}*/}
        {/*mapElement={<div style={{ height: `100%` }} />}*/}
      {/*/>*/}


      <SimpleMap />
      {/*<MyMapComponent />*/}
      <Footer />
    </div>
  )
}

export default App
