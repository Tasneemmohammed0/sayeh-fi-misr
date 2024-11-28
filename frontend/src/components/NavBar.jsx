
import { NavLink,Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "../styles/NavBar.module.css";
function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Sayeh fe Misr</div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" activeclassname="active-link" className={styles.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/gatherings" activeclassname="active-link"  className={styles.link}> 
            Gatherings
          </NavLink>
        </li>
        <li>
          <a href="#trending"  className={styles.link}>
            Trending Places
          </a>
        </li>
        <li>
          <NavLink to="/signin" activeclassname="active-link" className={styles.link}>
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeclassname="active-link" className={styles.link}>
            <FaUserCircle className={styles.profileIcon} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
