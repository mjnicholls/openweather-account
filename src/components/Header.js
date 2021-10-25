/* eslint-disable */
import React, { useState } from 'react'
import { gallery } from '../assets/Gallery'
import '../App.scss'
//import { useSelector } from 'react-redux'
 //const isAuthenticatedSelector = (state) => state.auth.isAuthenticated
 //const userFace = (state) => state.auth.user.username



const Navbar = () => {

  // const isAuthenticated = useSelector(isAuthenticatedSelector)
  // const username = useSelector(userFace)
 
  return  (
    <nav className="navbar navbar-expand-xl page-header">
      <div className="container-xl">
        <a className="navbar-brand" href="/">
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
        >
          <img src={gallery.hamburger.src} alt="Icon hamburger"/>
        </button>
        <div className="collapse navbar-collapse align-items-center justify-content-between" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-center justify-content-between">
            <li>
              <div class="input-group search">
                <div class="input-group-append">
                  <button class="btn btn-secondary" type="button">
                    <img src={gallery.search_bar_logo.src} />
                  </button>
                </div>
                <form className="input" action="https://openweathermap.org/find" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="&#x2713;" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Weather in your city"
                  name="q"
                />
                <input style={{display:"none"}} type='submit'/>
                </form>
              </div>
            </li>
            <li>
              <a className="nav-link header-link" href="https://openweathermap.org/guide">
                Guide
              </a>
            </li>
            <li>
              <a className="nav-link header-link" href="https://openweathermap.org/api">
                API
              </a>
            </li>
            <li>
              <a className="nav-link header-link" href="https://openweathermap.org/price">
                Pricing
              </a>
            </li>
            <li>
              <a className="nav-link header-link" href="https://openweathermap.org/weathermap">
              Maps
              </a>
            </li>
            <li >
              <a className="nav-link header-link" href="https://openweathermap.org/our-initiatives">
              Our Initiatives
              </a>
            </li>
            <li>
              <a className="nav-link header-link" href="https://openweathermap.org/examples">
                Partners
              </a>
            </li>
            <li>
              <a className="nav-link header-link" href="https://openweather.co.uk/blog/category/weather">
                Blog
              </a>
            </li>
            <li className="d-xl-none">
              <a className="nav-link header-link" href="https://openweather.co.uk/blog/category/weather">
                Ask a Question
              </a>
            </li>
            
            <li>
              <a className="nav-link header-link marketplace" href="https://home.openweathermap.org/marketplace">
              Marketplace
              </a>
            </li>
       {/*    {isAuthenticated === false ? (   */}
            <li>
    
              <a className="nav-link header-link" href="https://home.openweathermap.org/users/sign_in">
                Sign In
              </a>
              </li>
              <li className="nav-item dropdown d-none d-xl-block d-xxl-none">
              <a
                href="#"
                className="nav-link dropdown-toggle header-link"
                data-toggle="dropdown"
              >
                Support
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="https://openweathermap.org/faq">
                  FAQ
                </a>
                <a className="dropdown-item" href="https://openweathermap.org/appid">
                  How to Start
                </a>
                <a className="dropdown-item" href="https://home.openweathermap.org/questions">
                  Ask a Question
                </a>
              </div>
            </li>
        {/*    ) : (   
          <li className="nav-item dropdown d-none d-xl-block d-xxl-none">
              <a className="nav-link header-link" href="\">
              <a
                href="/"
                className="nav-link dropdown-toggle header-link user"
                data-toggle="dropdown"
              >
              <img src={gallery.user_icon.src} style={{height: "10pt", width: "10pt", display: inline-block}} />
                 { username >= 6 ? username.substring(0, 6) + "..." : username }     */}
         {/*      </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="https://home.openweathermap.org/myservices">
                  My Services
                </a>
                <a className="dropdown-item" href="https://home.openweathermap.org/api_keys">
                  My API Keys
                </a>
                <a className="dropdown-item" href="https://home.openweathermap.org/payments">
                  My Payments
                </a>
                <a className="dropdown-item" href="https://home.openweathermap.org/home">
                  My Profile
                </a>
                <a className="dropdown-item" href="https://home.openweathermap.org/users/sign_out">
                 Logout
                </a>
              </div>
            </a>
            
            )}   
            </li> 

              <li>
              <a className="nav-link header-link" href="https://home.openweathermap.org/users/sign_out">
                Logout
              </a>
            </li>
            
            */}
           
          </ul>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar
