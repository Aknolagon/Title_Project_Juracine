import PropTypes from "prop-types";
import React from "react";
import "../styles/Rating.scss";

function Rating({ rating }) {
  if (rating === undefined) {
    return null;
  }

  const starRating = Math.round(rating / 2);

  return (
    <div className="rating">
      {[...Array(5)].map((key, index) => {
        return (
          <span key={key} className={index < starRating ? "filled" : ""}>
            ★
          </span>
        );
      })}
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number,
};

Rating.defaultProps = {
  rating: 0,
};

export default Rating;
