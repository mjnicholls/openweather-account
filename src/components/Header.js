import React from 'react'

import { useSelector } from 'react-redux'

import '../App.scss'
import { gallery } from '../assets/Gallery'

const selectUserName = (state) => state.auth.user.username

const HeaderTrigger = () => {
  const userName = useSelector(selectUserName)

  return (
    <nav className="navbar navbar-expand-xxl page-header">
      <div
        className="container-xxl"
        style={{ marginTop: '5px', marginBottom: '5px' }}
      >
        <a href="https://openweathermap.org/">
          <img
            src={gallery.logo_white.src}
            alt="Open Weather Logo"
            height="40px"
            width="93.33px"
          />
        </a>

        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          type="button"
        >
          <img src={gallery.hamburger.src} alt="Open menu" />
        </button>
        <div className="input-group search d-none d-xxl-flex">
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
          </form>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="d-xxl-none">
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
              <a className="text-nowrap" href="/events">
                Events
              </a>
            </li>
            <li>
              <a href="/triggers" className="text-nowrap">
                Triggers
              </a>
            </li>
            <li>
              <a href="/create" className="text-nowrap">
                Documentation
              </a>
            </li>

            <li>
              <a className="marketplace text-nowrap" href="/create">
                New Trigger
              </a>
            </li>
            {userName ? (
              <li className="nav-item dropdown text-nowrap d-none d-lg-block">
                <a
                  href="/"
                  className="dropdown-toggle header-link text-nowrap username"
                  data-toggle="dropdown"
                >
                  {userName}
                </a>
                <div className="dropdown-menu text-nowrap">
                  <a
                    href="https://home.openweathermap.org/myservices"
                    target="_blank"
                  >
                    My Services
                  </a>
                  <a
                    href="https://home.openweathermap.org/api_keys"
                    target="_blank"
                  >
                    My API Keys
                  </a>
                  <a
                    href="https://home.openweathermap.org/payments"
                    target="_blank"
                  >
                    My Payments
                  </a>
                  <a
                    href="https://home.openweathermap.org/home"
                    target="_blank"
                  >
                    My Profile
                  </a>
                  <a
                    href="https://home.openweathermap.org/users/sign_out"
                    target="_blank"
                  >
                    Logout
                  </a>
                </div>
              </li>
            ) : (
              <li>
                <a
                  className="text-nowrap"
                  href="https://home.openweathermap.org/users/sign_in"
                  target="_blank"
                >
                  Sign In
                </a>
              </li>
            )}
            <li>
              <a
                href="https://home.openweathermap.org/questions"
                className="text-nowrap"
              >
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default HeaderTrigger
