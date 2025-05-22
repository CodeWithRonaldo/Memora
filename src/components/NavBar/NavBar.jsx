import React, { useState } from "react";

// import { useLocation } from "react-router";
import styles from "./NavBar.module.css";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  // const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglemenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          <h1 className={styles.logotext}>
            Memor<span>A</span>
          </h1>
        </Link>
      </div>

      <button className={styles.menuButton} onClick={togglemenu}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="journal"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Journal
            </NavLink>
          </li>
          <div className={styles.navActions}>
            <NavLink to="/gallery" className={styles.uploadLink}>
              <button className={styles.uploadButton}>
                <span>Upload</span>
                <span className={styles.uploadIcon}>+</span>
              </button>
            </NavLink>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
