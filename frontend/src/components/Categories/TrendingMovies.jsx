import axios from "axios";
import React, { useState } from "react";
import CarouselMovies from "../CarouselMovies";

function TrendingMovies() {
  const [trending, setTrending] = useState([]);

  const fetchTrending = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${
          import.meta.env.VITE_API_KEY
        }&include_adult=false`
      );
      setTrending(response.data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  if (trending.length === 0) {
    fetchTrending();
  }

  return (
    <div className="barre">
      <h1 className="cross-bar">Trending Movies</h1>
      <CarouselMovies movies={trending} />
    </div>
  );
}

export default TrendingMovies;
