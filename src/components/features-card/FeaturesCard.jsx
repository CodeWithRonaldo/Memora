import React from 'react'
import styles from './FeaturesCard.module.css'
import { Link } from 'react-router'

const FeaturedCard = ({title,description, icon, to}) => {
  return (
    <Link to={to} className={styles.featureCard}>
        <div className={styles.iconContainer}>
            <span className={styles.featureIcon}>{icon}</span>
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
    </Link>
  )
}

export default FeaturedCard