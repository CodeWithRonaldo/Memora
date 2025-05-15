import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";
import summer1 from "../../assets/summer1.jpg";
import summer2 from "../../assets/summer2.jpg";
import summer3 from "../../assets/summer3.jpg";
import summer4 from "../../assets/summer4.jpg";

const HeroSection = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <Link to={ctaLink} className={styles.heroButton}>
          {ctaText}
        </Link>
      </div>
      <div className={styles.heroImageContainer}>
        <div className={styles.heroImageGrid}>
          <div className={`${styles.imageCard} ${styles.card1} `}>
            <img
              src={summer1}
              alt="summer-image"
              className={styles.memoryImage}
            />
          </div>
          <div className={`${styles.imageCard} ${styles.card2}`}>
            <img
              src={summer2}
              alt="summer-image"
              className={styles.memoryImage}
            />
          </div>
          <div className={`${styles.imageCard} ${styles.card3}`}>
            <img
              src={summer3}
              alt="summer-image"
              className={styles.memoryImage}
            />
          </div>
          <div className={`${styles.imageCard} ${styles.card4}`}>
            <img
              src={summer4}
              alt="summer-image"
              className={styles.memoryImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
