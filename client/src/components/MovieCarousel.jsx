import React from 'react';
import movies from '../data/winnersOnNetflix.json';
import '../styles/movieCarouselStyle.css'

const MovieCarousel = (props) => {
  
  console.log(props.showTitle);
  return (
<div className="row">
    <div className="header-title" id={props.showTitle}>
      <h3 className="award-show">{props.showTitle}</h3>
      <div className="progress-bar"></div>
    </div>
    <div className="movie-container">
      <button className="handle left-handle">
        <div className="text">&#8249;</div>
      </button>
      <div className="slider">
        {movies[props.awardShow].map(movie => (
        <div className="movie-card">
          <a href={`https://www.netflix.com/watch/${movie.netflixid}`}> <img src={movie.image_portrait} alt="" /></a>
          <div className="movie-details">
            <div className="title-name">{movie.title}</div>
            <div className="title-year">{movie.titlereleased ? movie.titlereleased : 'n/a'}</div>
            <div className="title-rating">{movie.rating ? movie.rating : 'n/a'}</div>
            <div className="title-imdb">IMDB: {movie.imdb ? movie.imdb : 'n/a'}</div>
          </div>
        </div>
        ))}
      </div>
      <button className="handle right-handle">
        <div className="text">&#8250;</div>
      </button>
    </div>
</div>

  
   
  );
  
};

export default MovieCarousel;
