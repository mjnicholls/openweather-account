import React from 'react'

import './App.scss'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import Footer from './components/Footer'
import Header from './components/Header'
import CreateTrigger from './pages/CreateTrigger'

const App = () => (
  <div className="App">
    <Header />
    <Container fluid="xl" style={{marginTop: "60px"}}>
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
