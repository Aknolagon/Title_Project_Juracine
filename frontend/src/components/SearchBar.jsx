import React, { useContext, useEffect, useState } from "react";
import Loupe from "../assets/Loupe6.png";
import "../styles/SearchBar.scss";
import { FavoritesContext } from "../contexts/FavoritesContext";

function SearchBar() {
  const [inputSearch, setInputSearch] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  useEffect(() => {
    if (inputSearch) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${inputSearch}&include_adult=false&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setMediaList(data.results);
        })
        .catch((err) => console.error(err));
    } else {
      setMediaList([]);
    }
  }, [inputSearch]);

  const handleFavoriteClick = (media) => {
    let mediaType = "other";

    if (media.release_date) {
      mediaType = "movie";
    } else if (media.first_air_date) {
      mediaType = "serie";
    }

    const isAlreadyFavorite = isFavorite(media.id);

    const favoriteMedia = {
      id: media.id,
      type: mediaType,
    };

    if (isAlreadyFavorite) {
      removeFavorite(media.id);
    } else {
      addFavorite(favoriteMedia);
    }
  };

  return (
    <>
      <div className="input-wrapper">
        <div className="search-box">
          <input
            id="search-input"
            placeholder="Find what you want ..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <img className="loupe" src={Loupe} alt="loupe" />
        </div>
      </div>
      <div className="search-result">
        {mediaList?.map((media) => (
          <div className="card-media" key={media.id}>
            {media.poster_path && (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${media.poster_path}`}
                  alt={media.title || media.name}
                />
                <button
                  type="button"
                  onClick={() => handleFavoriteClick(media)}
                  className={`favorite-button ${
                    isFavorite(media.id) ? "is-favorite" : ""
                  }`}
                >
                  ♥
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchBar;
