import React, { useState, useEffect } from 'react';
import logo from './oscar.png';
import './App.css';
import MovieCarousel from './components/MovieCarousel';


function App() {

  const [movies, setMovies] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.168:3001/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
 
  return (
 
    <><header>
      <div className='container'>
        <div className='logo_container'>
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
      <MovieCarousel movies={movies.imdb250} showTitle="IMBD Top 250"/>
      <MovieCarousel movies={movies.academyAwards} showTitle="Oscar Winners" />
      <MovieCarousel movies={movies.nfbPreserved} showTitle="National Film Board Preserved" /> 
      <MovieCarousel movies={movies.goldenGlobe} showTitle="Golden Globe Winners" />
      <MovieCarousel movies={movies.bestDirector} showTitle="Best Director" />
    </>
  );
}

export default App;
