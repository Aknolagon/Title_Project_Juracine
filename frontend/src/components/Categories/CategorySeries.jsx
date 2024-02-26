import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/CategoryStyle.scss";
import CarouselSeries from "../CarouselSeries";

function CategorySeries() {
  const [genres, setGenres] = useState([]);
  const [categoryButton, setCategoryButton] = useState();
  const [series, setSeries] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching category series:", error);
    }
  };

  const fetchSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          import.meta.env.VITE_API_KEY
        }&include_adult=false&with_genres=${categoryButton}`
      );
      setSeries(response.data.results);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchSeries();
  }, [categoryButton]);

  return (
    <div className="barre">
      <h2 className="cross-bar">Category of series</h2>
      <select
        className="slider-button"
        onChange={(e) => setCategoryButton(e.target.value)}
        id="category-series"
      >
        {genres.map((genre) => (
          <option key={genre.name} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      {series.length > 0 && <CarouselSeries series={series} />}
    </div>
  );
}

export default CategorySeries;
