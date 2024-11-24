import "../styles/NavBar.css";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">Sayeh fe Misr</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/gatherings" activeClassName="active-link">
            Gatherings
          </NavLink>
        </li>
        <li>
          <NavLink to="/trending" activeClassName="active-link">
            Trending Places
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" activeClassName="active-link">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active-link">
            <FaUserCircle className="profile-icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
