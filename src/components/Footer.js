import React from 'react'
import { Col, Row } from 'reactstrap'
import '../App.scss'
import { gallery } from '../assets/Gallery'

import FooterSection from './FooterSection'

function Footer() {
  return (
    <footer className="page-footer pt-4">
      <div className="container-fluid text-left text-md-left gap">
        <div className="row">
          <div className="col-md-4 class-three">
            <FooterSection header="Product Collections">
              <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/api#current"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Current and Forecast APIs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/api#history"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Historical Weather Data
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/api#maps"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Weather Maps
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/widgets-constructor"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Widgets
                    </a>
                  </li>
                </ul>
            </FooterSection>
          </div>

          <div className="col-md-3 class-three text-left">
            <h5 className="class-one">
              <b>Subscriptions</b>
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
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/appid"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      How to start
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/price"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://home.openweathermap.org/users/sign_up"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Subscribe for free
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/faq"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="col-md-4 text-left class-three">
            <h5 className="class-one">
              <b>About Us</b>
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
                    <p className="class-one">
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
          <div className="col-md-4 class-three text-left">

            <h5 className="class-one">
              <b>Technologies</b>
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
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Our technology
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/accuracy-and-quality"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Accuracy and quality of weather data
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweathermap.org/stations"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Connect your weather station
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="col-md-3 text-left class-three">
            <h5 className="class-one">
              <b>Terms and Conditions</b>
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
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Terms and conditions of sale
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/privacy-policy"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_website_terms_and_conditions_of_use.pdf"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Website terms and conditions
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="col-md-4 text-left class-three">
            <h5 className="class-one"></h5>
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
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://home.openweathermap.org/questions"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Ask a Question
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="mailto:info@openweathermap.org"
                      className="nav-link class-one"
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
        <div className="col-md-12 text-left class-seven">
          <h5 className="class-one">Download OpenWeather App</h5>
          <a href="https://apps.apple.com/gb/app/openweather/id1535923697">
            <img src={gallery.badge.src} alt="app_store_badge"></img>
          </a>
          <a href="https://play.google.com/store/apps/details?id=uk.co.openweather">
            {' '}
            <img
              src={gallery.appbadge.src}
              alt="googleplay_badge"
              width="140"
              height="60"
            ></img>
          </a>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4 text-left class-seven">
          <p className="font-fix">Supplier of Achilles UVDB community</p>
          <p className="font-fix">
            © 2012 — 2021 OpenWeather ® All rights reserved
          </p>
        </div>

        <div className="col-md-6 text-right">
          <a href="https://www.facebook.com/groups/270748973021342">
            <img
              className="logos"
              src={gallery.facebook.src}
              alt="facebook_logo"
              height="15px"
              width="10px"
            ></img>
          </a>
          <a href="https://github.com/search?q=openweathermap&ref=cmdform">
            <img
              className="logos"
              src={gallery.github.src}
              alt="github_logo"
              height="15px"
              width="15px"
            ></img>
          </a>
          <a href="https://www.facebook.com/groups/270748973021342">
            <img
              className="logos"
              src={gallery.insta.src}
              alt="instagram_logo"
              height="15px"
              width="15px"
            ></img>
          </a>
          <a href="https://www.linkedin.com/company/9816754">
            <img
              src={gallery.linked.src}
              className="logos"
              alt="linkedin_logo"
              height="15px"
              width="15px"
            ></img>
          </a>
          <a href="https://medium.com/@openweathermap">
            <img
              src={gallery.medium.src}
              className="logos"
              alt="medium_logo"
              height="15px"
              width="15px"
            ></img>
          </a>
          <a href="https://t.me/openweathermap">
            <img
              src={gallery.telegram.src}
              className="logos"
              alt="telegram_logo"
              height="15px"
              width="15px"
            ></img>
          </a>
          <a href="https://twitter.com/OpenWeatherMap">
            <img
              src={gallery.twitter.src}
              className="logos"
              alt="twitter_logo"
              height="15px"
              width="15px"
            ></img>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
