import React from "react";
import PropTypes from "prop-types";
import "../styles/Rating.scss";

function Rating({ rating }) {
  if (rating === undefined) {
    return null;
  }

  const starRating = Math.round(rating / 2);
  const uniqueId = rating.toString().replace(".", "_");

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        const key = `star-${uniqueId}-${index + 1}`;
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
