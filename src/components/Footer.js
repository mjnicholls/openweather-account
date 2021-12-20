import React from 'react'

import '../App.scss'
import FooterSection from './FooterSection'

const FooterTrigger = () => (
  <footer className="page-footer p-4">
    <div className="container-xl">
      <div className="row">
        <div className="col-xl-4 mt-4">
          <FooterSection header="Weather Dashboard">
            <ul>
              <li>
                <a href="/" target="_blank">
                  About
                </a>
              </li>
              <li>
                <a href="/" target="_blank">
                  User Documentation
                </a>
              </li>
              <li>
                <a href="/" target="_blank">
                  Support Center
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="col-xl-4 mt-4">
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

        <div className="col-xl-4 mt-4">
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

      <div className="row mt-4">
        <div className="col">
          <h5>Download OpenWeather App</h5>
          <a href="https://apps.apple.com/gb/app/openweather/id1535923697">
            <img
              src="https://openweathermap.org/themes/openweathermap/assets/img/mobile_app/google-play-badge.png"
              alt="app_store_badge"
              width="150"
              height="60"
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=uk.co.openweather">
            <img
              src="https://openweathermap.org/themes/openweathermap/assets/img/mobile_app/app-store-badge.svg"
              alt="googleplay_badge"
              width="150"
              height="43"
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
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_github.png"
                alt="github_logo"
                height="16px"
                width="16px"
              />
            </a>
            <a href="https://t.me/openweathermap">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_telegram.png"
                className="logos"
                alt="telegram_logo"
                height="16px"
                width="19px"
              />
            </a>
            <a href="https://medium.com/@openweathermap">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_medium.png"
                className="logos"
                alt="medium_logo"
                height="16px"
                width="16px"
              />
            </a>
            <a href="https://www.linkedin.com/company/9816754">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_linkedin.png"
                className="logos"
                alt="linkedin_logo"
                height="16px"
                width="16px"
              />
            </a>
            <a href="https://twitter.com/OpenWeatherMap">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_twitter.png"
                className="logos2"
                alt="twitter_logo"
                height="16px"
                width="18.4px"
              />
            </a>
            <a href="https://www.facebook.com/groups/270748973021342">
              <img
                className="logos"
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_facebook.png"
                alt="facebook_logo"
                height="16px"
                width="7.76px"
              />
            </a>
            <a href="https://www.instagram.com/openweathermap/">
              <img
                className="logos"
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_instagram.png"
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

export default FooterTrigger
