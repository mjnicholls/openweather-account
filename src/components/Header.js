import React from 'react'

import { useSelector } from 'react-redux'

import '../App.scss'

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
            src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
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
          <img
            src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_hamburger.svg"
            alt="Open menu"
          />
        </button>
        <div className="input-group search d-none d-xxl-flex">
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_search.svg"
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
          </form>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="d-xxl-none">
              <div className="input-group search ms-auto">
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button">
                    <img
                      src="https://home.openweathermap.org/assets/icon_search.svg"
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
              <a href="/dashboard/events">Events</a>
            </li>
            <li>
              <a href="/dashboard/triggers">Triggers</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>

            <li>
              <a className="marketplace" href="/dashboard/triggers/create">
                New Trigger
              </a>
            </li>
            {userName ? (
              <li className="nav-item dropdown d-none d-lg-block">
                <a
                  href="/"
                  className="dropdown-toggle header-link username"
                  data-toggle="dropdown"
                >
                  <img
                    src="https://home.openweathermap.org/assets/icon_user.png"
                    alt="user icon"
                    className="d-flex d-xl-none"
                  ></img>
                  {userName.slice(0, 6)}...
                </a>
                <div className="dropdown-menu">
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
                  href="https://home.openweathermap.org/users/sign_in"
                  target="_blank"
                >
                  Sign In
                </a>
              </li>
            )}
            <li>
              <a href="https://home.openweathermap.org/questions">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default HeaderTrigger
