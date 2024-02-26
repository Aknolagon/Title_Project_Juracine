import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import "../../styles/SerieCard.scss";
import { FavoritesContext } from "../FavoritesContext";
import InfoCardSerie from "../InfoCardSerie";

function SerieCard({ serieId }) {
  const [posterPath, setPosterPath] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [serieDetails, setSerieDetails] = useState({});
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const isFavorite = favorites.some((favorite) => favorite.id === serieId);

  // FETCH series details

  const fetchSerieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${serieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=credits,videos`
      );
      setSerieDetails({
        title: response.data.name,
        overview: response.data.overview,
        release_date: response.data.first_air_date,
        cast: response.data.credits.cast,
        trailerKey: response.data.videos.results.find(
          (video) => video.type === "Trailer"
        )?.key,
        rating: response.data.vote_average,
        type: "serie",
      });
    } catch (error) {
      console.error("Error fetching serie details:", error);
    }
  };

  // FETCH image poster

  const fetchSeriePoster = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${serieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setPosterPath(response.data.poster_path);
    } catch (error) {
      console.error("Error fetching serie poster:", error);
    }
  };

  fetchSeriePoster();

  // handle info card visibility

  const toggleInfoCard = () => {
    if (!showInfo) {
      fetchSerieDetails();
    }
    setShowInfo(!showInfo);
  };
  // handle info card visibility on enter key press

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      toggleInfoCard();
    }
  };

  // handle favorite button click

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(serieId);
    } else {
      addFavorite({ id: serieId, type: "serie", ...serieDetails }, "serie");
    }
  };

  return (
    <div className="serie-card">
      <div
        className="poster_image"
        onClick={toggleInfoCard}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
      >
        {posterPath && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="Serie Poster"
            className="serie-card__image"
          />
        )}
        <button
          type="button"
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          ♥
        </button>
      </div>
      {showInfo && (
        <InfoCardSerie
          serie={serieDetails}
          onClose={() => setShowInfo(false)}
        />
      )}
    </div>
  );
}

SerieCard.propTypes = {
  serieId: PropTypes.number.isRequired,
};

export default SerieCard;
