import React, { useState } from "react";

// import { useLocation } from "react-router";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

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
        {isMenuOpen ? "X" : "☰"}
      </button>

      {isMenuOpen && (
        <nav className={styles.menu}>
          <ul className={styles.menuList}>
            <li>
              <Link to="/" className={styles.menuItem} onClick={togglemenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.menuItem} onClick={togglemenu}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.menuItem} onClick={togglemenu}>
                Journal
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
