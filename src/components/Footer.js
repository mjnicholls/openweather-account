import React from 'react';
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
    <footer className="page-footer font-small blue pt-4" style={{backgroundColor:"#f2f2f2"}}>
    <div className="container-fluid text-center text-md-left">
      <div className="row">
          
      <div className="col-md-1 mt-md-0 mt-3"></div>
        <div className="col-md-3 mt-md-0 mt-3">
            
        <a href="#" className="navbar-brand"><h4 className="ow-font" style={{fontWeight:"bold", marginTop:"30px"}}>Product Collections</h4></a>

    {/*  <button className="navbar-toggler" type="button" data-toggle="collapse"   data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="sr-only"></span>

      </button>
      <div className="collapse navbar-collapse" id="navbarNav"> */}
        <ul className="navbar-nav">
        <li className="nav-item">
        <a href="https://openweathermap.org/api#current" class="nav-link ow-font" target="_blank">Current and Forecast APIs</a>
    </li>
    <li className="nav-item">
    <a href="https://openweathermap.org/api#history" className="nav-link ow-font" target="_blank">Historical Weather Data</a>
    </li>
    <li className="nav-item">
    <a href="https://openweathermap.org/api#maps" className="nav-link ow-font" target="_blank">Weather Maps</a>
    </li>
    <li className="nav-item">
    <a href="https://openweathermap.org/widgets-constructor" className="nav-link ow-font" target="_blank">Widgets</a>
    </li>
    </ul>
    </div>
        {/*  </div> */}

     
        <div className="col-md-3 mb-md-0 mb-3">

          <h4 className="ow-font" style={{fontWeight:"bold", marginTop:"30px"}}>Subscriptions</h4>
<p className="ow-font">How to start</p>
<p className="ow-font">Pricing</p>
<p className="ow-font">Subscribe for free</p>
<p className="ow-font">FAQ</p>

        </div>
   
        <div className="col-md-3 mb-md-0 mb-3">

        <h4 className="ow-font" style={{fontWeight:"bold", marginTop:"30px"}}>About Us</h4>
<p className="ow-font">OpenWeather is a team of IT experts and data scientists that has been practising deep weather data science since 2014. For each point on the globe, OpenWeather provides historical, current and forecasted weather data via light-speed APIs. Headquarters in London, UK.</p>
        </div>
 
        <div className="col-md-1 mt-md-0 mt-3"></div>

      </div>


      <div className="row">
      <div className="col-md-1 mt-md-0 mt-3"></div>
        <div className="col-md-3 mt-md-0 mt-3">

        <h4 className="ow-font" style={{fontWeight:"bold", marginTop:"15px"}}>Technologies</h4>
    <p className="ow-font">Our technology</p>
    <p className="ow-font">Accuracy and quality of weather data</p>
    <p className="ow-font">Connect your weather station</p>
        </div>

     
        <div className="col-md-3 mb-md-0 mb-3">

        <h4 className="ow-font" style={{fontWeight:"bold", marginTop:"15px"}}>Terms + Conditions</h4>
<p className="ow-font">Terms and conditions of sale</p>
<p className="ow-font">Privacy Policy</p>
<p className="ow-font">Website terms and conditions</p>

        </div>
   
        <div className="col-md-3 mb-md-0 mb-3">

        <h4 className="ow-font" style={{fontWeight:"bold", marginTop:"15px"}}>Contact</h4>
<p className="ow-font">Blog</p>
<p className="ow-font">Ask a question</p>
<p className="ow-font">info@openweathermap.org</p>

        </div>
 
        <div className="col-md-1 mt-md-0 mt-3"></div>

      </div>
    

    </div>
 
    <div className="footer-copyright text-center py-3">
    <h4 className="ow-font" style={{fontWeight:"bold", marginTop:"15px"}}>Download OpenWeather App</h4>
               <a href="https://apps.apple.com/gb/app/openweather/id1535923697"><img src={badge} alt="app_store_badge"></img></a>
               <a href="https://play.google.com/store/apps/details?id=uk.co.openweather"> <img src={appbadge} alt="googleplay_badge" width="160" height="60"></img></a>

    </div>
    <br/>
    <div className="row">
      <div className="col-md-1 mt-md-0 mt-3"></div>
       
     
        <div className="col-md-5 mb-md-0 mb-3">

<p className="ow-font">Supplier of Achilles UVDB community</p>
<p className="ow-font">© 2012 — 2021 OpenWeather ® All rights reserved</p>


        </div>
  
        <div className="col-md-5 mb-md-0 mb-3">

        <a href="https://www.facebook.com/groups/270748973021342"><img src={facebook} alt="facebook_logo" height="30px" weight="30px" style={{marginLeft:"20px"}}></img></a>
        <a href="https://github.com/search?q=openweathermap&ref=cmdform"><img src={github} alt="github_logo" height="30px" weight="30px"style={{marginLeft:"20px"}}></img></a>
        <a href="https://www.facebook.com/groups/270748973021342"><img src={insta} alt="instagram_logo" height="30px" width="30px"style={{marginLeft:"20px"}}></img></a>
        <a href="https://www.linkedin.com/company/9816754"><img src={linked} alt="linkedin_logo"height="30px" weight="30px"style={{marginLeft:"20px"}}></img></a>
        <a href="https://medium.com/@openweathermap"><img src={medium} alt="medium_logo" height="40px" width="30px"style={{marginLeft:"20px"}}></img></a>
        <a href="https://t.me/openweathermap"><img src={tele} alt="telegram_logo" height="30px" weight="30px"style={{marginLeft:"20px"}}></img></a>
        <a href="https://twitter.com/OpenWeatherMap"><img src={twitter} alt="twitter_logo" height="30px" weight="30px"style={{marginLeft:"20px"}}></img></a>

        </div>
 
        <div className="col-md-1 mt-md-0 mt-3"></div>

      </div>
 
  </footer>
  );
}

export default Footer;