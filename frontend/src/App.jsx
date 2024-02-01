import React from "react";
import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "./components/FavoritesContext";
import "./styles/App.scss";

function App() {
  return (
    <FavoritesProvider>
      <main>
        <Outlet />
      </main>
    </FavoritesProvider>
  );
}

export default App;
