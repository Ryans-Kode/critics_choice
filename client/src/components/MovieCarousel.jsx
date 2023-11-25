import React from "react";
import movies from "../data/winnersOnNetflix.json";
import "../styles/movieCarouselStyle.css";

const MovieCarousel = (props) => {

  function showLeftHandle(e) {
    let handle = e.target.closest(".handle");
    let leftHandle = handle.closest(".movie-container").querySelector(".left-handle")
    leftHandle.style.visibility = 'visible';
  }

  function sliderScroll(handle) {
    const e = handle.target.closest(".handle"); // If you dont choose closest handle you may grab child div instead
    const slider = e.closest(".movie-container").querySelector(".slider");
    const itemCount = slider.children.length;
    const sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
    );
    const itemsPerScreen = parseInt(
      getComputedStyle(slider).getPropertyValue("--items-per-screen")
    );
    console.log(itemCount)
    if (e.className === "handle left-handle") {
      console.log(sliderIndex - 1 >= 0);
      if (sliderIndex - 1 >= 0) {
        slider.style.setProperty("--slider-index", sliderIndex - 1);
      }
    } else {
      // Needed to add +1 because sliderIndex always starts at 0 *after* first press
      if (Math.ceil(sliderIndex + 1) < itemCount / itemsPerScreen)
        slider.style.setProperty("--slider-index", sliderIndex + 1);
    }
  }
  const onImageError = (e, movTitle) => {
    console.log(e.target.alt)
    e.target.src = `https://placeholder.pics/svg/250x400/DEDEDE/555555/${movTitle}}`
  }
  return (
    <div className="row">
      <div className="header-title" id={props.showTitle}>
        <h3 className="award-show">{props.showTitle}</h3>

      </div>
      <div className="movie-container">
        <button
          className="handle left-handle"
          onClick={(e) => {
            sliderScroll(e);
          }}
        >
          <div className="text">&#8249;</div>
        </button>
        <div className="slider">
          {movies[props.awardShow].map((movie) => (
            <div className="movie-card">
              <a href={`https://www.netflix.com/watch/${movie.netflixid}`}>
                {" "}
                <img
                  src={
                    movie.image_portrait
                      ? movie.image_portrait
                      : "https://placeholder.pics/svg/200x300"
                  }
                  onError={(e) => { e.target.src = `https://placeholder.pics/svg/250x350/DEDEDE/555555/${movie.title}` }}
                  alt="movie"

                />
              </a>
              <div className="movie-details">
                <div className="title-name">{movie.title}</div>
                <div className="title-year">
                  {movie.titlereleased ? movie.titlereleased : "n/a"}
                </div>
                <div className="title-rating">
                  {movie.rating ? movie.rating : "n/a"}
                </div>
                <div className="title-imdb">
                  IMDB: {movie.imdb ? movie.imdb : "n/a"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="handle right-handle"
          onClick={(e) => {
            sliderScroll(e);
            showLeftHandle(e);
          }}
        >
          <div className="text">&#8250;</div>
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
