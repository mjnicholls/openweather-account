import React from 'react'
import './App.scss'
import { Container } from 'reactstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import CreateTrigger from './pages/CreateTrigger'

const App = () => (
  <div className="App">
    <Header />
    <Container fluid="xl">
      <BrowserRouter>
        <Route path="/create">
          <CreateTrigger />
        </Route>
        <Redirect from="/" to="/create" />
      </BrowserRouter>
    </Container>
    <Footer />
  </div>
)

export default App
