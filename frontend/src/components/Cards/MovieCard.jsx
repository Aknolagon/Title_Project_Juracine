import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import "../../styles/MovieCard.scss";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import InfoCardMovie from "./InfoCardMovie";

function MovieCard({ movieId }) {
  const [posterPath, setPosterPath] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const isFavorite = favorites.some((favorite) => favorite.id === movieId);

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=credits,videos`
      );
      setMovieDetails({
        title: response.data.title,
        overview: response.data.overview,
        release_date: response.data.release_date,
        cast: response.data.credits.cast,
        trailerKey: response.data.videos.results.find(
          (video) => video.type === "Trailer"
        )?.key,
        rating: response.data.vote_average,
        type: "movie",
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Fetch image poster
  const fetchMoviePoster = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setPosterPath(response.data.poster_path);
    } catch (error) {
      console.error("Error fetching movie poster:", error);
    }
  };

  fetchMoviePoster();

  // handle info card visibility
  const toggleInfoCard = () => {
    if (!showInfo) {
      fetchMovieDetails();
    }
    setShowInfo(!showInfo);
  };

  // handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      toggleInfoCard();
    }
  };
  // handle favorite click
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(movieId);
    } else {
      addFavorite({ id: movieId, type: "movie", ...movieDetails });
    }
  };

  return (
    <div className="movie-card">
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
            alt="Movie Poster"
            className="movie-card__image"
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
        <InfoCardMovie
          movie={movieDetails}
          onClose={() => setShowInfo(false)}
        />
      )}
    </div>
  );
}

MovieCard.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieCard;
