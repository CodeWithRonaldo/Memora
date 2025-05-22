import React, { useEffect, useState } from 'react';
import styles from './PhotoModal.module.css';

const PhotoModal = ({ photo, onClose, onNext, onPrevious }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious]);

  useEffect(() => {
    setImageLoaded(false);
  }, [photo]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          <span className={styles.closeIcon}>×</span>
        </button>

        {/* Navigation Buttons */}
        <button className={styles.navButton} onClick={onPrevious}>
          <span className={styles.navIcon}>‹</span>
        </button>
        
        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={onNext}>
          <span className={styles.navIcon}>›</span>
        </button>

        {/* Modal Content */}
        <div className={styles.modalContent}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            {!imageLoaded && (
              <div className={styles.imageLoader}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading image...</p>
              </div>
            )}
            
            <img
              src={photo.url}
              alt={photo.title}
              className={`${styles.modalImage} ${imageLoaded ? styles.loaded : ''}`}
              onLoad={handleImageLoad}
            />
          </div>

          {/* Info Section */}
          <div className={styles.infoSection}>
            <div className={styles.photoHeader}>
              <h2 className={styles.photoTitle}>{photo.title}</h2>
              <p className={styles.photoDate}>{formatDate(photo.date)}</p>
            </div>

            {photo.description && (
              <div className={styles.descriptionSection}>
                <h3 className={styles.sectionTitle}>Description</h3>
                <p className={styles.photoDescription}>{photo.description}</p>
              </div>
            )}

            <div className={styles.tagsSection}>
              <h3 className={styles.sectionTitle}>Tags</h3>
              <div className={styles.tagsList}>
                {photo.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>💖</span>
                Add to Favorites
              </button>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>📝</span>
                Edit Details
              </button>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>📤</span>
                Share
              </button>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>⬇️</span>
                Download
              </button>
            </div>

            {/* Metadata */}
            <div className={styles.metadataSection}>
              <h3 className={styles.sectionTitle}>Details</h3>
              <div className={styles.metadataGrid}>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Date Added:</span>
                  <span className={styles.metadataValue}>{formatDate(photo.date)}</span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Tags:</span>
                  <span className={styles.metadataValue}>{photo.tags.length}</span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Type:</span>
                  <span className={styles.metadataValue}>Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Hints */}
        <div className={styles.navigationHints}>
          <span className={styles.hint}>Press ← → to navigate</span>
          <span className={styles.hint}>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;