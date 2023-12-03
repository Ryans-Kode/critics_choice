import React, { useState } from 'react';
import logo from './oscar.png';
import './App.css';
import MovieCarousel from './components/MovieCarousel';

function App() {
 
  return (
    <><header>
      <div className='container'>
        <div class='logo_container'>
          <h2>Critics Choice</h2>
          <img id='oscar_image_left' src={logo} alt='logo'></img>
          <img id='oscar_image_right' src={logo} alt='logo'></img>
        </div>
        <input type="checkbox" id="check"/>
        <label htmlFor="check" className="icons">
          <i className="bx bx-menu" id="menu-icon" ></i>
          <i className="bx bx-x" id="close-icon"></i>
        </label>
        <div className='nav_links'>
          <ul>
            <li><a href='#Oscar Winners'>Academy Awards</a></li>
            <li><a href='#Golden Globe Winners'>Golden Globes</a></li>            
            {/* <li><a href='#BAFTA Winners'>BAFTA Awards</a></li> */}
            <li><a href='#National Film Board Preserved'>National Film Board</a></li>
            <li><a href='#Best Director'>Best Director</a></li>
          </ul>
        </div>
      </div>

    </header>
      <MovieCarousel awardShow="imdb250" showTitle="IMBD Top 250"/>
      <MovieCarousel awardShow="academyAwards" showTitle="Oscar Winners" />
      <MovieCarousel awardShow="nfbPreserved" showTitle="National Film Board Preserved" /> 
      <MovieCarousel awardShow="goldenGlobe" showTitle="Golden Globe Winners" />
      <MovieCarousel awardShow="bestDirector" showTitle="Best Director" />

      {/* <MovieCarousel awardShow="bafta" showTitle="BAFTA Winners" /> */}
    </>
  );
}

export default App;
