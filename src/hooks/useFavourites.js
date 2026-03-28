import { useContext } from "react";
import FavouritesContext from "../context/FavouritesContext.js";


const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return context;
};

export default useFavourites;