import React from 'react'
import { gallery } from '../assets/Gallery'
import '../App.scss'
//import userEvent from '@testing-library/user-event';
//import { useSelector } from 'react-redux'
//const isAuthenticatedSelector = (state) => state.auth.isAuthenticated
// const userFace = (state) => state.auth.user.username

const Navbar = () => {
  const isAuthenticated = true
  const userName = 'avolvik'

  return (
    <nav className="navbar navbar-expand-xl page-header">
      <div className="container-xl">
        <a className="" href="/">
          <img
            src={gallery.logo_white.src}
            alt="Open Weather Logo"
            height="40px"
            width="93.33px"
          ></img>
        </a>

        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          type="button"
        >
          <img src={gallery.hamburger.src} alt="Icon hamburger" />
        </button>
        <div className="input-group search d-none d-xl-flex">
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button">
              <img src={gallery.search_bar_logo.src} alt="search bar logo" />
            </button>
          </div>
          <form
            className="input"
            action="https://openweathermap.org/find"
            acceptCharset="UTF-8"
            method="get"
          >
            <input name="utf8" type="hidden" value="&#x2713;" />
            <input
              type="text"
              className="form-control"
              placeholder="Weather in your city"
              name="q"
            />
            <input style={{ display: 'none' }} type="submit" />
          </form>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="d-xl-none">
              <div className="input-group search ms-auto">
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button">
                    <img
                      src={gallery.search_bar_logo.src}
                      alt="search bar logo"
                    />
                  </button>
                </div>
                <form
                  className="input"
                  action="https://openweathermap.org/find"
                  acceptCharset="UTF-8"
                  method="get"
                >
                  <input name="utf8" type="hidden" value="&#x2713;" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Weather in your city"
                    name="q"
                  />
                  <input style={{ display: 'none' }} type="submit" />
                </form>
              </div>
            </li>
            <li>
              <a
                className="nav-link header-link"
                href="https://openweathermap.org/guide"
                target="_blank"
              >
                Guide
              </a>
            </li>
            <li>
              <a
                className="nav-link header-link"
                href="https://openweathermap.org/api"
                target="_blank"
              >
                API
              </a>
            </li>
            <li>
              <a
                className="nav-link header-link"
                href="https://openweathermap.org/price"
                target="_blank"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                className="nav-link header-link"
                href="https://openweathermap.org/weathermap"
                target="_blank"
              >
                Maps
              </a>
            </li>
            <li>
              <a
                className="nav-link header-link text-nowrap"
                href="https://openweathermap.org/our-initiatives"
                target="_blank"
              >
                Our Initiatives
              </a>
            </li>
            <li>
              <a
                className="nav-link header-link"
                href="https://openweathermap.org/examples"
                target="_blank"
              >
                Partners
              </a>
            </li>
            <li>
              <a
                className="nav-link header-link"
                href="https://openweather.co.uk/blog/category/weather"
                target="_blank"
              >
                Blog
              </a>
            </li>
            <li className="d-xl-none">
              <a
                className="nav-link header-link"
                href="https://openweather.co.uk/blog/category/weather"
                target="_blank"
              >
                Ask a Question
              </a>
            </li>

            <li>
              <a
                className="nav-link header-link marketplace"
                href="https://home.openweathermap.org/marketplace"
                target="_blank"
              >
                Marketplace
              </a>
            </li>
            {isAuthenticated === false ? (
              <>
                <li>
                  <a
                    className="nav-link header-link text-nowrap"
                    href="https://home.openweathermap.org/users/sign_in"
                    target="_blank"
                  >
                    Sign In
                  </a>
                </li>
                <li className="nav-item dropdown d-none d-xl-block">
                  <a
                    href="/"
                    className="nav-link dropdown-toggle header-link"
                    data-toggle="dropdown"
                  >
                    Support
                  </a>
                  <div className="dropdown-menu">
                    <a
                      className="dropdown-item"
                      href="https://openweathermap.org/faq"
                    >
                      FAQ
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://openweathermap.org/appid"
                      target="_blank"
                    >
                      How to Start
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://home.openweathermap.org/questions"
                      target="_blank"
                    >
                      Ask a Question
                    </a>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown text-nowrap d-none d-lg-block">
                  <a className="nav-link header-link text-nowrap" href="\">
                    <a
                      href="/"
                      className="nav-link dropdown-toggle header-link text-nowrap username"
                      data-toggle="dropdown"
                    >
                      <img
                        src={gallery.user_icon.src}
                        style={{
                          height: '10pt',
                          width: '10pt',
                          display: 'inline-block',
                          marginRight: '4px',
                        }}
                        alt="user icon"
                      />

                      {userName}
                    </a>
                    <div className="dropdown-menu text-nowrap">
                      <a
                        className="dropdown-item"
                        href="https://home.openweathermap.org/myservices"
                        target="_blank"
                      >
                        My Services
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://home.openweathermap.org/api_keys"
                        target="_blank"
                      >
                        My API Keys
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://home.openweathermap.org/payments"
                        target="_blank"
                      >
                        My Payments
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://home.openweathermap.org/home"
                        target="_blank"
                      >
                        My Profile
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://home.openweathermap.org/users/sign_out"
                        target="_blank"
                      >
                        Logout
                      </a>
                    </div>
                  </a>
                </li>

                <li className="nav-item dropdown d-none d-xl-block">
                  <a
                    href="/"
                    className="nav-link dropdown-toggle header-link"
                    data-toggle="dropdown"
                  >
                    Support
                  </a>
                  <div className="dropdown-menu">
                    <a
                      className="dropdown-item"
                      href="https://openweathermap.org/faq"
                      target="_blank"
                    >
                      FAQ
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://openweathermap.org/appid"
                      target="_blank"
                    >
                      How to Start
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://home.openweathermap.org/questions"
                      target="_blank"
                    >
                      Ask a Question
                    </a>
                  </div>
                </li>

                <li className="nav-item d-lg-none text-nowrap">
                  <a
                    className="nav-link header-link"
                    href="https://home.openweathermap.org/"
                  >
                    <img
                      src={gallery.user_icon.src}
                      style={{
                        height: '10pt',
                        width: '10pt',
                        display: 'inline-block',
                        marginRight: '4px',
                      }}
                      alt="user icon"
                    />
                    {userName}
                  </a>
                </li>
                <li className="d-lg-none">
                  <a
                    className="nav-link header-link"
                    href="https://home.openweathermap.org/users/sign_out"
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
