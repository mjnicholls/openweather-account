import logo from './logo.svg'
import './App.scss'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer'
// import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <Footer />
    </div>
  )
}

export default App
