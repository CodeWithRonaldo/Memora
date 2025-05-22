import React, { useState } from 'react';
import styles from './PhotoCard.module.css';

const PhotoCard = ({ photo, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={styles.photoCard} onClick={() => onClick(photo)}>
      <div className={styles.imageContainer}>
        {!imageLoaded && (
          <div className={styles.imagePlaceholder}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
        
        {imageError ? (
          <div className={styles.imageError}>
            <span className={styles.errorIcon}>📷</span>
            <span>Failed to load image</span>
          </div>
        ) : (
          <img
            src={photo.url}
            alt={photo.title}
            className={`${styles.photoImage} ${imageLoaded ? styles.loaded : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        <div className={styles.imageOverlay}>
          <button className={styles.viewButton}>
            <span className={styles.viewIcon}>👁</span>
            View
          </button>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.photoTitle}>{photo.title}</h3>
        <p className={styles.photoDate}>{formatDate(photo.date)}</p>
        
        {photo.description && (
          <p className={styles.photoDescription}>
            {photo.description.length > 100 
              ? `${photo.description.substring(0, 100)}...`
              : photo.description
            }
          </p>
        )}
        
        <div className={styles.tagContainer}>
          {photo.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
          {photo.tags.length > 3 && (
            <span className={styles.moreTagsIndicator}>
              +{photo.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;