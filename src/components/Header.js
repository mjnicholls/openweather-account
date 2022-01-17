import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'

const selectUserName = (state) => state.auth.user.username

const HeaderTrigger = () => {
  const userName = useSelector(selectUserName)
  const [isDropDown, setIsDropDown] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={`page-header ${isMenuOpen ? 'open' : ''}`}>
      <div className="container-xxl">
        <div className="page-header-content">
          <a href="https://openweathermap.org/">
            <img
              src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
              alt="Open Weather Logo"
              height="40px"
              width="93.33px"
            />
          </a>

          <button
            className="remove-default-button-style d-xxl-none"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_hamburger.svg"
              alt="Open menu"
            />
          </button>

          <div className="break d-xxl-none"></div>

          <ul className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
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
              <a
                href="https://openweathermap.org/weather-dashboard/dashboard-documentation"
                target="_blank"
              >
                Documentation
              </a>
            </li>

            <li>
              <a className="marketplace" href="/dashboard/triggers/create">
                New Trigger
              </a>
            </li>
            {userName ? (
              <>
                <li className="d-none d-lg-block">
                  <Dropdown
                    isOpen={isDropDown}
                    toggle={() => setIsDropDown(!isDropDown)}
                  >
                    <DropdownToggle className="remove-default-button-style d-flex align-items-center justify-content-center pt-0 pb-0">
                      <img
                        className="d-xxl-none"
                        src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_user.png"
                        alt="Caret"
                      />
                      <div className="inner-user-container">{userName}</div>
                      <img
                        className="d-none d-xxl-block"
                        src="https://openweathermap.org/themes/openweathermap/assets/img/owm_icons/icon_down_white.svg"
                        alt="Caret"
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <a href="/myservices">My Services</a>
                      <a href="/api_keys">My API Keys</a>
                      <a href="/payments">My Payments</a>
                      <a href="/home">My Profile</a>
                      <a href="/users/logout">Logout</a>
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <li className="d-xxl-none">
                  <a href="/users/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <a href="/users/sign_in" target="_blank">
                  Sign In
                </a>
              </li>
            )}
            <li>
              <a href="/questions">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default HeaderTrigger
