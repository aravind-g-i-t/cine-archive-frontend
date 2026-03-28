import { NavLink } from "react-router-dom";
import useFavourites from "../hooks/useFavourites";


const Navbar = () => {
  const { favourites } = useFavourites();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🎬</span>
        <span className="navbar-title">CineArchive</span>
      </div>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Favourites
          {favourites.length > 0 && (
            <span className="nav-badge">{favourites.length}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;