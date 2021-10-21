/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { gallery } from '../assets/Gallery'
import { Nav } from 'reactstrap';
import '../App.scss'

function Navbar() {

    return ( 


        <Nav className="navbar navbar-expand-sm ow-nav">
        <div className="container ow-nav">
     
        <a className="navbar-brand" href="/">
                <img src={gallery.logo_white.src} alt="Open Weather Logo" height="40px" width="93.33px"></img>
            </a>
         
            <button className="navbar-toggler navbar-light" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ow-nav" id="navbarNav">
           
                <ul className="navbar-nav mr-auto ow-nav">
                    <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Guide</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">API</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Pricing</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Maps</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Our Initiatives</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Partners</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Blog</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Marketplace</a>
                        </li>
                        <li className="nav-item ow-item">
                            <a className="nav-link header-link" href="\">Sign In</a>
                        </li>
                        <li className="nav-item ow-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle header-link" data-toggle="dropdown">Support</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="\">FAQ</a>
                                <a className="dropdown-item" href="\">How to Start</a>
                                <a className="dropdown-item" href="\">Ask a Question</a>
                            </div>
                        </li>
                    
                </ul>
            </div>
        </div>
    </Nav>
  
  
 
    
    );
}

export default Navbar;
