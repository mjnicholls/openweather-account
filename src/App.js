/* eslint-disable */
import React from 'react'

import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

// import Footer from './components/Footer'
// import Header from './components/Header'
import FooterTrigger from './components/FooterTrigger'
import HeaderTrigger from './components/HeaderTrigger'
import CreateTrigger from './pages/CreateTrigger'
import ForecastedEvents from './pages/Events'
import TriggerList from './pages/Triggers'
import ViewTrigger from './pages/ViewTrigger'
import store from './store'

const App = () => (
  <Provider store={store}>
    <div className="App">
      <HeaderTrigger />
      <Container fluid="xl" style={{ marginTop: '60px' }}>
        <BrowserRouter>
          <Route path="/create" component={CreateTrigger} />
          <Route path="/triggers" component={TriggerList} />
          <Route path="/trigger" component={ViewTrigger} />
          <Route path="/events" component={ForecastedEvents} />
          {/* <Redirect from="/" to="/events" /> */}
        </BrowserRouter>
      </Container>
      <FooterTrigger />
    </div>
  </Provider>
)

export default App
