import React, { useState } from "react";
import axios from "axios";
import CarouselSeries from "../CarouselSeries";

function UpcomingSeries() {
  const [upco, setUpco] = useState([]);

  // Fetch upcoming series
  const fetchUpco = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setUpco(response.data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };
  // Fetch upcoming series on component mount
  if (upco.length === 0) {
    fetchUpco();
  }

  return (
    <div className="barre">
      <h2 className="cross-bar">Series On The Air</h2>
      <CarouselSeries series={upco} />
    </div>
  );
}

export default UpcomingSeries;
