import star from "../images/star.png";

export default function renderMovieCards({ movies = [] }) {
  return movies.map((movie, index) => (
    <div className="movie-card" key={index}>
      <a href={`https://www.netflix.com/watch/${movie.netflixid}`}>
        {/* {" "} */}

        <div className="poster-container">
          <img
            className="poster"
            src={
              movie.image_portrait
                ? movie.image_portrait
                : `https://placehold.jp/54/9798a5/ffffff/420x520.png?text=${movie.title}&css=%7B%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23666666)%2C%20to(%23cccccc))%22%7D`
            }
            onError={(e) => {
              e.target.src = `https://placehold.jp/54/9798a5/ffffff/420x520.png?text=${movie.title}&css=%7B%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23666666)%2C%20to(%23cccccc))%22%7D`;
            }}
            alt="movie"
          />
          <div className="buttons-container">
            <span className="play-button">&#9654;</span>
            <span className="mobile-play-button"></span>
          </div>
        </div>
      </a>

      <div className="movie-details">
        <div className="title-name">{movie.title}</div>
        <div className="title-year">{movie.titlereleased ? movie.titlereleased : "n/a"}</div>
        <div className="title-rating">{movie.rating ? movie.rating : "n/a"}</div>
        <div className="title-imdb">
          <img src={star} alt="stars"></img>
          {movie.imdb ? movie.imdb : "N/A"}
        </div>
      </div>
    </div>
  ));
}
