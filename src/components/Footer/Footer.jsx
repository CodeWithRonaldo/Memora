import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Memora</h3>
          <p className={styles.footerDesc}>
            Preserve and organize your most precious summer moments with our gallery app.
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/journal">Journal</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Features</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/gallery">Photo Organization</Link></li>
            <li><Link to="/journal">Journaling</Link></li>
            <li><Link to="/gallery">AI Compilations</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Stay Connected</h4>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>📘</a>
            <a href="#" className={styles.socialIcon}>📱</a>
            <a href="#" className={styles.socialIcon}>📸</a>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Memora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;