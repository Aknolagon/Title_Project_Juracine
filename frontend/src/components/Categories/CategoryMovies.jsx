import axios from "axios";
import React, { useState, useEffect } from "react";
import CarouselMovies from "../CarouselMovies";
import "../../styles/CategoryStyle.scss";

function CategoryMovies() {
  const [genres, setGenres] = useState([]);
  const [categoryButton, setCategoryButton] = useState();
  const [movies, setMovies] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching category movies:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&include_adult=false&with_genres=${categoryButton}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [categoryButton]);

  return (
    <div className="barre">
      <h2 className="cross-bar">Movies Category</h2>
      <select
        className="slider-button"
        onChange={(e) => setCategoryButton(e.target.value)}
        id="category-movies"
      >
        {genres.map((genre) => (
          <option className="slider-value" key={genre.name} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      {movies.length > 0 && <CarouselMovies movies={movies} />}
    </div>
  );
}

export default CategoryMovies;
