// Favorites.jsx
import React, { useContext } from "react";
import MovieCard from "../components/Cards/MovieCard";
import SerieCard from "../components/Cards/SerieCard";
import { FavoritesContext } from "../components/FavoritesContext";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import "../styles/Favorites.scss";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  const movieFavorites = favorites.filter(
    (favorite) => favorite.type === "movie"
  );
  const serieFavorites = favorites.filter(
    (favorite) => favorite.type === "serie"
  );

  return (
    <div className="home">
      <NavBar />
      <SearchBar />
      <div className="barre">
        <h1>My Favorite</h1>
        <h2>Movies</h2>
      </div>
      <div className="favorite-container-movie">
        {movieFavorites.length > 0 ? (
          movieFavorites.map((favorite) => (
            <MovieCard key={favorite.id} movieId={favorite.id} />
          ))
        ) : (
          <p>No favorite movie added.</p>
        )}
      </div>
      <div className="barre">
        <h2>Series</h2>
      </div>
      <div className="favorite-container-serie">
        {serieFavorites.length > 0 ? (
          serieFavorites.map((favorite) => (
            <SerieCard key={favorite.id} serieId={favorite.id} />
          ))
        ) : (
          <p>No favorite serie added.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Favorites;
