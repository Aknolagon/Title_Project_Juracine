import axios from "axios";
import React, { useState } from "react";
import CarouselSeries from "../CarouselSeries";

function TrendingSeries() {
  const [trending, setTrending] = useState([]);

  const fetchTrending = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${
          import.meta.env.VITE_API_KEY
        }&include_adult=false`
      );
      setTrending(response.data.results);
    } catch (error) {
      console.error("Error fetching series", error);
    }
  };

  if (trending.length === 0) {
    fetchTrending();
  }

  return (
    <div className="barre">
      <h2 className="cross-bar">Trending Series</h2>
      <CarouselSeries series={trending} />
    </div>
  );
}

export default TrendingSeries;
