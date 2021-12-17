import React from 'react'

import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

import FooterTrigger from './components/Footer'
import HeaderTrigger from './components/Header'
import CreateTrigger from './pages/CreateTrigger'
import Events from './pages/Events'
import TriggerList from './pages/Triggers'
// import ViewTrigger from './pages/ViewTrigger'
import ViewTrigger from './pages/ViewTriggerNew'
import store from './store'

const App = () => (
  <Provider store={store}>
    <div className="app">
      <HeaderTrigger />
      <Container fluid="xxl" className="app-content">
        <BrowserRouter>
          <Route path="/dashboard/triggers/create" component={CreateTrigger} />
          <Route path="/dashboard/triggers" component={TriggerList} />
          <Route path="/dashboard/trigger" component={ViewTrigger} />
          <Route path="/dashboard/events" component={Events} />
          {/* <Redirect from="/" to="/events" /> */}
        </BrowserRouter>
      </Container>
      <FooterTrigger />
    </div>
  </Provider>
)

export default App
