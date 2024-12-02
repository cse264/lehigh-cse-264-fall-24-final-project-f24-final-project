import React from 'react';
//import { useState } from 'react';
import './NavBar.css';

import logo from "../../assets/images/Logo.svg";

function NavBar() {
    return(
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          {/* NavBar Logo */}
          <a class="navbar-brand" href="/">
            <img class="logo" src={logo} width="30" height="30" alt="Logo" />
          </a>
      
          {/* Toggle button for smaller screens */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      
          {/* Navbar links */}
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">Search <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">My Recipes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Explore Recipes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Explore Chefs</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
    );
}

export default NavBar;