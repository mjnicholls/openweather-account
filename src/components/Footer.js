import React from 'react'
import { Col, Row } from 'reactstrap'
import '../App.scss'
import badge from '../assets/img/app_store_badge.svg'
import appbadge from '../assets/img/google_play_badge.png'
import facebook from '../assets/img/icon_facebook.png'
import github from '../assets/img/icon_github.png'
import insta from '../assets/img/icon_instagram.png'
import linked from '../assets/img/icon_linkedin.png'
import medium from '../assets/img/icon_medium.png'
import tele from '../assets/img/icon_telegram.png'
import twitter from '../assets/img/icon_twitter.png'

function Footer() {
  return (
    <footer
      className="page-footer font-small blue pt-4"
      style={{ backgroundColor: '#f2f2f2' }}
    >
      <div className="container-fluid text-center text-md-left">
        <div className="row" id="first">
          <div className="col-md-1 mt-md-0 mt-3"></div>
          <div className="col-md-3" style={{ textAlign: 'left' }}>
            <h5
              className="ow-font"
              style={{
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '-15px',
              }}
            >
              Product Collections
            </h5>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="accordion-button"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul
                  className="nav flex-column"
                  style={{ paddingBottom: '14px' }}
                >
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/api#current"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Current and Forecast APIs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/api#history"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Historical Weather Data
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/api#maps"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Weather Maps
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/widgets-constructor"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Widgets
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="col-md-3 mt-md-0 mt-3" style={{ textAlign: 'left' }}>
            <h5
              className="ow-font"
              style={{
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '-15px',
              }}
            >
              Subscriptions
            </h5>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav2"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="accordion-button"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav2">
                <ul
                  className="nav flex-column"
                  style={{ paddingBottom: '14px' }}
                >
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/appid"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      How to start
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/price"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://home.openweathermap.org/users/sign_up"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Subscribe for free
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/faq"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="col-md-4 mt-md-0 mt-3" style={{ textAlign: 'left' }}>
            <h5
              className="ow-font"
              style={{
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '-15px',
              }}
            >
              About Us
            </h5>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav3"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="accordion-button"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <p className="ow-font" style={{ fontSize: '0.8rem' }}>
                      OpenWeather is a team of IT experts and data scientists
                      that has been practising deep weather data science since
                      2014. For each point on the globe, OpenWeather provides
                      historical, current and forecasted weather data via
                      light-speed APIs. Headquarters in London, UK.
                    </p>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-md-1 mt-md-0 mt-3"></div>

          <div className="col-md-3 mt-md-0 mt-3" style={{ textAlign: 'left' }}>
            <h5
              className="ow-font"
              style={{
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '-15px',
              }}
            >
              Technologies
            </h5>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav4"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="accordion-button"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav4">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/technology"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Our technology
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/accuracy-and-quality"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Accuracy and quality of weather data
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/stations"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Connect your weather station
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="col-md-3 mt-md-0 mt-3" style={{ textAlign: 'left' }}>
            <h5
              className="ow-font"
              style={{
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '-15px',
              }}
            >
              Terms and Conditions
            </h5>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav5"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="accordion-button"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav5">
                <ul
                  className="nav flex-column"
                  style={{ paddingBottom: '23px' }}
                >
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Terms and conditions of sale
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/privacy-policy"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_website_terms_and_conditions_of_use.pdf"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Website terms and conditions
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="col-md-4 mt-md-0 mt-3" style={{ textAlign: 'left' }}>
            <h5
              className="ow-font"
              style={{
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '-15px',
              }}
            >
              Contact
            </h5>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav6"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="accordion-button"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav6">
                <ul
                  className="nav flex-column"
                  style={{ paddingBottom: '23px' }}
                >
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://home.openweathermap.org/questions"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      Ask a Question
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="mailto:info@openweathermap.org"
                      className="nav-link ow-font"
                      target="_blank"
                    >
                      info@openweathermap.org
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-1 mt-md-0 mt-3"></div>
        <div className="col-md-10 mt-md-0 mt-3" style={{ paddingLeft: '25px' }}>
          <h5
            className="ow-font"
            style={{ fontWeight: 'bold', marginTop: '15px' }}
          >
            Download OpenWeather App
          </h5>
          <a href="https://apps.apple.com/gb/app/openweather/id1535923697">
            <img src={badge} alt="app_store_badge"></img>
          </a>
          <a href="https://play.google.com/store/apps/details?id=uk.co.openweather">
            {' '}
            <img
              src={appbadge}
              alt="googleplay_badge"
              width="140"
              height="60"
            ></img>
          </a>
        </div>
        <div className="col-md-1 mt-md-0 mt-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-1 mt-md-0 mt-3"></div>

        <div className="col-md-4 mb-md-0 mb-3" style={{ paddingLeft: '25px' }}>
          <p className="ow-font">Supplier of Achilles UVDB community</p>
          <p className="ow-font">
            © 2012 — 2021 OpenWeather ® All rights reserved
          </p>
        </div>
        <div className="col-md-2 mt-md-0 mt-3"></div>

        <div className="col-md-5 mb-md-0 mb-3">
          <a href="https://www.facebook.com/groups/270748973021342">
            <img
              className="logos"
              src={facebook}
              alt="facebook_logo"
              height="15px"
              width="10px"
              style={{ marginLeft: '20px' }}
            ></img>
          </a>
          <a href="https://github.com/search?q=openweathermap&ref=cmdform">
            <img
              className="logos"
              src={github}
              alt="github_logo"
              height="15px"
              width="15px"
              style={{ marginLeft: '20px' }}
            ></img>
          </a>
          <a href="https://www.facebook.com/groups/270748973021342">
            <img
              className="logos"
              src={insta}
              alt="instagram_logo"
              height="15px"
              width="15px"
              style={{ marginLeft: '20px' }}
            ></img>
          </a>
          <a href="https://www.linkedin.com/company/9816754">
            <img
              src={linked}
              className="logos"
              alt="linkedin_logo"
              height="15px"
              width="15px"
              style={{ marginLeft: '20px' }}
            ></img>
          </a>
          <a href="https://medium.com/@openweathermap">
            <img
              src={medium}
              className="logos"
              alt="medium_logo"
              height="15px"
              width="15px"
              style={{ marginLeft: '20px' }}
            ></img>
          </a>
          <a href="https://t.me/openweathermap">
            <img
              src={tele}
              className="logos"
              alt="telegram_logo"
              height="15px"
              width="15px"
              style={{ marginLeft: '20px' }}
            ></img>
          </a>
          <a href="https://twitter.com/OpenWeatherMap">
            <img
              src={twitter}
              className="logos"
              alt="twitter_logo"
              height="15px"
              width="15px"
              style={{ marginLeft: '20px' }}
            ></img>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
