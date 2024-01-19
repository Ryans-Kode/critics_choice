import "../styles/movieCarouselStyle.css";
import MovieCard from "./MovieCard";
import React, { useEffect } from "react";

export default function MovieCarousel({ movies = [], showTitle }) {
  useEffect(() => {
    displayHandles();
    window.addEventListener("resize", debounce(displayHandles));
  }, [movies]);

  const debounce = (func) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func(...args);
      }, 250);
    };
  };

  function displayHandles() {
    console.log("Resized");
    const nodeList = document.querySelectorAll(".handle.right-handle");
    const arr = Array.from(nodeList);
    arr.map((e, index) => {
      let movieContainer = e.closest(".movie-container").querySelector(".slider");
      let totalMovies = movieContainer.children.length;
      let itemsPerScreen = parseInt(
        getComputedStyle(movieContainer).getPropertyValue("--items-per-screen")
      );
      if (totalMovies <= itemsPerScreen) {
        e.style.visibility = "hidden";
      } else {
        e.style.visibility = "visible";
      }
    });
  }

  function showLeftHandle(e) {
    let handle = e.target.closest(".handle");
    let leftHandle = handle.closest(".movie-container").querySelector(".left-handle");
    leftHandle.style.visibility = "visible";
  }

  function handleScroll(e) {
    const handle = e.target.closest(".handle"); // If you dont choose closest handle you may grab child div instead
    const slider = handle.closest(".movie-container").querySelector(".slider");
    const itemCount = slider.children.length;
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
    const itemsPerScreen = parseInt(
      getComputedStyle(slider).getPropertyValue("--items-per-screen")
    );
    if (handle.className === "handle left-handle") {
      if (sliderIndex - 1 >= 0) {
        slider.style.setProperty("--slider-index", sliderIndex - 1);
      } else {
        let leftHandle = handle.closest(".movie-container").querySelector(".left-handle");
        leftHandle.style.visibility = "hidden";
      }
    } else {
      // Needed to add +1 because sliderIndex always starts at 0 *after* first press
      if (Math.ceil(sliderIndex + 1) < itemCount / itemsPerScreen)
        slider.style.setProperty("--slider-index", sliderIndex + 1);
    }
  }

  return (
    <div className="row">
      <div className="header-title" id={showTitle}>
        <h3 className="award-show">{showTitle}</h3>
      </div>
      <div className="movie-container">
        <button
          className="handle left-handle"
          onClick={(e) => {
            handleScroll(e);
          }}
        >
          <div className="chevron">&#8249;</div>
        </button>
        <div className="slider"> {<MovieCard movies={movies} />}</div>
        <button
          className="handle right-handle"
          onClick={(e) => {
            handleScroll(e);
            showLeftHandle(e);
          }}
        >
          <div className="chevron">&#8250;</div>
        </button>
      </div>
    </div>
  );
}
