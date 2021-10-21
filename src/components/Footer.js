import React from 'react'
import '../App.scss'
import { gallery } from '../assets/Gallery'

import FooterSection from './FooterSection'

function Footer() {
  return (
    <footer className="page-footer">
      <div className="container-fluid text-left text-md-left gap">
        <div className="row">
          <div className="col-md-4 class-three">
            <FooterSection header="Product Collections">
              <ul className="nav flex-column">
                  <li className="nav-item underline">
                    <a
                      href="https://openweathermap.org/api#current"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Current and Forecast APIs
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://openweathermap.org/api#history"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Historical Weather Data
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://openweathermap.org/api#maps"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Weather Maps
                    </a>
                  </li>
                  <li className="nav-item underline">
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

          <div className="col-md-4 class-three text-left">
          <FooterSection header="Subscriptions">
                <ul className="nav flex-column">
                  <li className="nav-item underline">
                    <a
                      href="https://openweathermap.org/appid"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      How to start
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://openweathermap.org/price"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://home.openweathermap.org/users/sign_up"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Subscribe for free
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://openweathermap.org/faq"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
      </FooterSection>
          </div>

          <div className="col-md-3 text-left class-three">
          <FooterSection header="About Us">
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
                </FooterSection>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 class-three text-left">

          <FooterSection header="Technologies">
                <ul className="nav flex-column">
                  <li className="nav-item underline">
                    <a
                      href="https://openweathermap.org/technology"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Our technology
                    </a>
                  </li>
                  <li className="nav-item underline underline">
                    <a
                      href="https://openweathermap.org/accuracy-and-quality"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Accuracy and quality of weather data
                    </a>
                  </li>
                  <li className="nav-item underline underline">
                    <a
                      href="https://openweathermap.org/stations"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Connect your weather station
                    </a>
                  </li>
                </ul>
                </FooterSection>
          </div>

          <div className="col-md-4 text-left class-three">
          <FooterSection header="Terms and Conditions">
                <ul className="nav flex-column">
                  <li className="nav-item underline">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Terms and conditions of sale
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://openweather.co.uk/privacy-policy"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_website_terms_and_conditions_of_use.pdf"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Website terms and conditions
                    </a>
                  </li>
                </ul>
                </FooterSection>
          </div>

          <div className="col-md-3 text-left class-three">
         
                <ul className="nav flex-column">
                  <li className="nav-item underline">
                    <a
                      href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item underline">
                    <a
                      href="https://home.openweathermap.org/questions"
                      className="nav-link class-one"
                      target="_blank"
                    >
                      Ask a Question
                    </a>
                  </li>
                  <li className="nav-item underline">
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
              width="160"
              height="60"
            ></img>
          </a>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6 text-left class-seven">
          <p className="noBottom">Supplier of Achilles UVDB community</p>
          <p className="noBottom">
            © 2012 — 2021 OpenWeather ® All rights reserved
          </p>
        </div>

        <div className="col-md-4 text-right">
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
              className="logos2"
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
