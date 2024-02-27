import PropTypes from "prop-types";
import React, { createContext, useContext, useMemo, useState } from "react";

export const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
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

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
