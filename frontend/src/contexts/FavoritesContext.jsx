import PropTypes from "prop-types";
import React, { createContext, useMemo, useState } from "react";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFavorite = (id) =>
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext, FavoritesProvider };

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
