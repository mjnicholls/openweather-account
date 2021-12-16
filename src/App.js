import React from 'react'

import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

import FooterTrigger from './components/FooterTrigger'
import HeaderTrigger from './components/HeaderTrigger'
import CreateTrigger from './pages/CreateTrigger'
import Events from './pages/Events'
import TriggerList from './pages/Triggers'
import ViewTrigger from './pages/ViewTrigger'
// import ViewTrigger from './pages/ViewTriggerNew'
import store from './store'

const App = () => (
  <Provider store={store}>
    <div>
      <HeaderTrigger />
      <Container fluid="xl" style={{ marginTop: '60px' }}>
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
