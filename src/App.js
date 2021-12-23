import React from 'react'

import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Container } from 'reactstrap'

import FooterTrigger from './components/Footer'
import HeaderTrigger from './components/Header'
import NotificationMessage from './components/NotificationMessage'
import { fetchTriggers } from './features/triggers/actions'
import CreateTrigger from './pages/CreateTrigger'
import Events from './pages/Events'
import TriggerList from './pages/Triggers'
import ViewTrigger from './pages/ViewTrigger'
import store from './store'
import 'react-toastify/dist/ReactToastify.css'

store.dispatch(fetchTriggers())

const App = () => (
  <Provider store={store}>
    <div className="app">
      <HeaderTrigger />
      <Container fluid="xxl" className="app-content">
        <BrowserRouter>
          <Switch>
            <Route
              path="/dashboard/triggers/create"
              component={CreateTrigger}
            />
            <Route path="/dashboard/triggers" component={TriggerList} />
            <Route path="/dashboard/trigger" component={ViewTrigger} />
            <Route path="/dashboard/events" component={Events} />
            {/* <Redirect from="/" to="/dashboard/events" /> */}
          </Switch>
        </BrowserRouter>
      </Container>
      <FooterTrigger />
    </div>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <NotificationMessage />
  </Provider>
)

export default App
