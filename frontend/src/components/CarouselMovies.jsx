import PropTypes from "prop-types";
import React, { useState } from "react";
import "../styles/Carousel.scss";
import MovieCard from "./Cards/MovieCard";

function CarouselMovies({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 5));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleMovies = movies.slice(currentIndex, currentIndex + 5);

  return (
    <div className="carousel-container">
      <button
        type="button"
        className="carousel-button left-button"
        onClick={handlePrevious}
      >
        &#9664;
      </button>
      <div className="media-list">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movieId={movie.id} />
        ))}
      </div>
      <button
        type="button"
        className="carousel-button right-button"
        onClick={handleNext}
      >
        &#9664;
      </button>
    </div>
  );
}

CarouselMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CarouselMovies;
