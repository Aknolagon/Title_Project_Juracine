import PropTypes from "prop-types";
import React, { useState } from "react";
import "../styles/Carousel.scss";
import SerieCard from "./Cards/SerieCard";

function CarouselSeries({ series }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, series.length - 5));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleSeries = series.slice(currentIndex, currentIndex + 5);

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
        {visibleSeries.map((serie) => (
          <SerieCard key={serie.id} serieId={serie.id} />
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

CarouselSeries.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CarouselSeries;
