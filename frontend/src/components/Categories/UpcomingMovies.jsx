import axios from "axios";
import React, { useState } from "react";
import CarouselMovies from "../CarouselMovies";

function UpcomingMovies() {
  const [upco, setUpco] = useState([]);

  // Fetch upcoming movies
  const fetchUpco = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setUpco(response.data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };
  // Fetch upcoming movies on component mount
  if (upco.length === 0) {
    fetchUpco();
  }

  return (
    <div className="barre">
      <h1 className="cross-bar">Upcoming Movies</h1>
      <CarouselMovies movies={upco} />
    </div>
  );
}

export default UpcomingMovies;
