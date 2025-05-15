import React from 'react'
import styles from './FeaturesCard.module.css'

const FeaturedCard = ({title,description, icon}) => {
  return (
    <div className={styles.featureCard}>
        <div className={styles.iconContainer}>
            <span className={styles.featureIcon}>{icon}</span>
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
    </div>
  )
}

export default FeaturedCard