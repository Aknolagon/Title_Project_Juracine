import React, { useState } from "react";
import axios from "axios";
import CarouselMovies from "../CarouselMovies";

function UpcomingMovies() {
  const [upco, setUpco] = useState([]);

  // Fetch des films à venir
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
  // dans le tableau de recom
  if (upco.length === 0) {
    fetchUpco();
  }

  return (
    <div className="barre">
      <h2 className="cross-bar">Upcoming Movies</h2>
      <CarouselMovies movies={upco} />
    </div>
  );
}

export default UpcomingMovies;
