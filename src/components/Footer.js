import React from 'react'
import '../App.scss'
import { gallery } from '../assets/Gallery'
import FooterSection from './FooterSection'

const Footer = () => (
  <footer className="page-footer p-4">
    <div className="container-lg">
      <div className="row">
        <div className="col-lg-4 mt-4">
          <FooterSection header="Product Collections">
            <ul>
              <li>
                <a
                  href="https://openweathermap.org/api#current"
                  target="_blank"
                >
                  Current and Forecast APIs
                </a>
              </li>
              <li>
                <a
                  href="https://openweathermap.org/api#history"
                  target="_blank"
                >
                  Historical Weather Data
                </a>
              </li>
              <li>
                <a href="https://openweathermap.org/api#maps" target="_blank">
                  Weather Maps
                </a>
              </li>
              <li>
                <a
                  href="https://openweathermap.org/widgets-constructor"
                  target="_blank"
                >
                  Widgets
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="col-lg-4 mt-4">
          <FooterSection header="Subscriptions">
            <ul>
              <li>
                <a href="https://openweathermap.org/appid" target="_blank">
                  How to start
                </a>
              </li>
              <li>
                <a href="https://openweathermap.org/price" target="_blank">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="https://home.openweathermap.org/users/sign_up"
                  target="_blank"
                >
                  Subscribe for free
                </a>
              </li>
              <li>
                <a href="https://openweathermap.org/faq" target="_blank">
                  FAQ
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="col-lg-4 mt-4">
          <FooterSection header="About Us">
            <ul>
              <li>
                OpenWeather is a team of IT experts and data scientists that has
                been practising deep weather data science since 2014. For each
                point on the globe, OpenWeather provides historical, current and
                forecasted weather data via light-speed APIs. Headquarters in
                London, UK.
              </li>
            </ul>
          </FooterSection>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mt-4">
          <FooterSection header="Technologies">
            <ul>
              <li>
                <a href="https://openweathermap.org/technology" target="_blank">
                  Our technology
                </a>
              </li>
              <li>
                <a
                  href="https://openweathermap.org/accuracy-and-quality"
                  target="_blank"
                >
                  Accuracy and quality of weather data
                </a>
              </li>
              <li>
                <a href="https://openweathermap.org/stations" target="_blank">
                  Connect your weather station
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="col-lg-4 mt-4">
          <FooterSection header="Terms and Conditions">
            <ul>
              <li>
                <a
                  href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf"
                  target="_blank"
                >
                  Terms and conditions of sale
                </a>
              </li>
              <li>
                <a
                  href="https://openweather.co.uk/privacy-policy"
                  target="_blank"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://openweather.co.uk/storage/app/media/Terms/Openweather_website_terms_and_conditions_of_use.pdf">
                  Website terms and conditions
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="col-lg-4 mt-4">
          <h5>&nbsp;</h5>
          <ul>
            <li>
              <a href="https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf">
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://home.openweathermap.org/questions"
                target="_blank"
              >
                Ask a Question
              </a>
            </li>
            <li>
              <a href="mailto:info@openweathermap.org" target="_blank">
                info@openweathermap.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h5>Download OpenWeather App</h5>
          <a href="https://apps.apple.com/gb/app/openweather/id1535923697">
            <img src={gallery.badge.src} alt="app_store_badge"/>
          </a>
          <a href="https://play.google.com/store/apps/details?id=uk.co.openweather">
            <img
              src={gallery.appbadge.src}
              alt="googleplay_badge"
              width="135"
              height="60"
            />
          </a>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mt-4">
          <p>Supplier of Achilles UVDB community</p>
          <p>© 2012 — 2021 OpenWeather ® All rights reserved</p>
        </div>

        <div className="col-sm-10 col-md-8 col-lg-6 mt-4">
          <div className="d-flex justify-content-between align-items-center social-media-icons">
            <a href="https://github.com/search?q=openweathermap&ref=cmdform">
                <img
                  className="logos"
                  src={gallery.github.src}
                  alt="github_logo"
                  height="16px"
                  width="16px"
                />
              </a>
            <a href="https://t.me/openweathermap">
              <img
                src={gallery.telegram.src}
                className="logos"
                alt="telegram_logo"
                height="16px"
                width="19px"
              />
            </a>
            <a href="https://medium.com/@openweathermap">
                <img
                  src={gallery.medium.src}
                  className="logos"
                  alt="medium_logo"
                  height="16px"
                  width="16px"
                />
              </a>
             <a href="https://www.linkedin.com/company/9816754">
                <img
                  src={gallery.linked.src}
                  className="logos"
                  alt="linkedin_logo"
                  height="16px"
                  width="16px"
                />
              </a>
            <a href="https://twitter.com/OpenWeatherMap">
                <img
                  src={gallery.twitter.src}
                  className="logos2"
                  alt="twitter_logo"
                  height="16px"
                  width="18.4px"
                />
              </a>
            <a href="https://www.facebook.com/groups/270748973021342">
                <img
                  className="logos"
                  src={gallery.facebook.src}
                  alt="facebook_logo"
                  height="16px"
                  width="7.76px"
                />
              </a>
            <a href="https://www.instagram.com/openweathermap/">
                <img
                  className="logos"
                  src={gallery.insta.src}
                  alt="instagram_logo"
                  height="17px"
                  width="17px"
                />
              </a>
          </div>

        </div>
      </div>
    </div>
  </footer>
)

export default Footer
