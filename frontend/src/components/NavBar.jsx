import "../styles/NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <div className="logo">Sayeh fe Misr</div>
      <nav className="nav-links">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/gatherings">Gatherings</NavLink>
          </li>
          <li>
            <NavLink to="/trending">Trending Places</NavLink>
          </li>
          <li>
            <NavLink to="/signin">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
