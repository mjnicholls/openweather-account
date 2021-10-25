import './App.scss'
import Footer from './components/Footer'
import Header from './components/Header'
import logo from './logo.svg'

function App() {
  return (
    <div className="App">
        <Header />
        <div className="container-xl">
          <div className="d-flex justify-content-between align-items-center my-3">
            <h2>New Trigger</h2>
            <ul className="d-flex align-items-center ">
              <li>Triggers</li>
              <li>Maps</li>
              <li>Road Risk</li>
            </ul>
          </div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          </header>
        </div>
      <Footer />
    </div>
  )
}

export default App
