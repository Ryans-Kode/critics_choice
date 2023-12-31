import "../styles/movieCarouselStyle.css";
import star from "../star.png"

const MovieCarousel = ({movies = [], showTitle}) => {

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
    if (e.className === "handle left-handle") {
      if (sliderIndex - 1 >= 0) {
        slider.style.setProperty("--slider-index", sliderIndex - 1);
      } else {
        let leftHandle = e.closest(".movie-container").querySelector(".left-handle")
        leftHandle.style.visibility = 'hidden';
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
            sliderScroll(e);
          }}
        >
          <div className="text">&#8249;</div>
        </button>
        <div className="slider">
          {movies.map((movie, index) => (
            <div className="movie-card" key={index}>
              <div className="poster-container">
                <a href={`https://www.netflix.com/watch/${movie.netflixid}`}>
                  {" "}
                  <img
                    src={
                      movie.image_portrait
                        ? movie.image_portrait
                        : `https://placehold.jp/54/9798a5/ffffff/420x520.png?text=${movie.title}&css=%7B%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23666666)%2C%20to(%23cccccc))%22%7D`
                    }
                    onError={(e) => { e.target.src = `https://placehold.jp/54/9798a5/ffffff/420x520.png?text=${movie.title}&css=%7B%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23666666)%2C%20to(%23cccccc))%22%7D` }}
                    alt="movie"
                  />  
               
                <div className="overlay" >
                  <span className="play-button">&#9654;</span>  
                  <span className="mobile-play-button"></span>
                </div>
                </a>
              </div>
              <div className="movie-details">
                <div className="title-name">{movie.title}</div>
                <div className="title-year">
                  {movie.titlereleased ? movie.titlereleased : "n/a"}
                </div>
                <div className="title-rating">
                  {movie.rating ? movie.rating : "n/a"}
                </div>
                <div className="title-imdb">
                  <img src={star}></img>
                   {movie.imdb ? movie.imdb : "n/a"}
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
