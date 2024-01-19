import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCarousel from "./components/MovieCarousel";
import Header from "./components/Header";

const fetchThis =
  process.env.REACT_APP_ENV === "production"
    ? "https://critics-choice.onrender.com/data.json"
    : "http://192.168.0.168:3001/data.json";

function App() {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(fetchThis);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <>
      <Header />
      <MovieCarousel movies={movies.imdb250} showTitle="IMBD Top 250" />
      <MovieCarousel movies={movies.academyAwards} showTitle="Oscar Winners" />
      <MovieCarousel movies={movies.nfbPreserved} showTitle="National Film Board Preserved" />
      <MovieCarousel movies={movies.goldenGlobe} showTitle="Golden Globe Winners" />
      <MovieCarousel movies={movies.bestDirector} showTitle="Best Director" />
    </>
  );
}

export default App;
