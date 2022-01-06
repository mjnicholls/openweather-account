import React from 'react'

import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import { Container } from 'reactstrap'

import Footer from './components/Footer'
import Header from './components/Header'
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
      <Header />
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
      <Footer />
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
      transition={Zoom}
    />
  </Provider>
)

export default App
