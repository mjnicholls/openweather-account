import React from 'react'

import './App.scss'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'
import Footer from './components/Footer'
import Header from './components/Header'
import CreateTrigger from './pages/CreateTrigger'
import TriggerList from './pages/TriggersList'
import ViewTrigger from './pages/ViewTrigger'
import ForecastedEvents from './pages/ForecastedEvents'

import store from './store'

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Header />
      <Container fluid="xl" style={{ marginTop: '60px' }}>
        <BrowserRouter>
          <Route path="/create" component={CreateTrigger}/>
          <Route path="/trigger-list" component={TriggerList} />
          <Route path="/view-trigger" component={ViewTrigger} />
          <Route path="/forecasted-events" component={ForecastedEvents} />
          {/*<Redirect from="/" to="/trigger-list" />*/}
        </BrowserRouter>
      </Container>
      <Footer />
    </div>
  </Provider>
)

export default App
