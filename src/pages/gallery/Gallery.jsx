import React, { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css';
import PhotoCard from '../../components/photocard/PhotoCard';
import FilterBar from '../../components/filter-bar/FilterBar';
import PhotoModal from '../../components/photo-modal/PhotoModal';
import UploadModal from '../../components/upload-modal/UploadModal';
import icecream from '../../assets/icecream.jpeg'
import beachday from '../../assets/beachday.jpg'
import camping from '../../assets/camping.jpeg'
import firework from '../../assets/firework.jpeg'
import hike from '../../assets/hike.jpeg'
import poolparty from '../../assets/poolparty.jpeg'
import sunset from '../../assets/sunset.jpeg'
import volley from '../../assets/volley.jpeg'

const LOCAL_STORAGE_KEY = 'gallery_photos';

const Gallery = () => {
  const [photos, setPhotos] = useState(() => {
    const savedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPhotos) {
      return JSON.parse(savedPhotos);
    }
    return [
      { 
        id: 1, 
        url: beachday, 
        title: 'Beach Day', 
        date: '2023-07-15', 
        tags: ['beach', 'ocean', 'family'],
        description: 'A perfect day at the beach with the family. The weather was amazing!'
      },
      { 
        id: 2, 
        url: hike, 
        title: 'Mountain Hike', 
        date: '2023-08-03', 
        tags: ['mountain', 'hiking', 'nature'],
        description: 'Challenging hike but the view at the top was worth every step.'
      },
      { 
        id: 3, 
        url: sunset, 
        title: 'Sunset Picnic', 
        date: '2023-07-22', 
        tags: ['sunset', 'picnic', 'friends'],
        description: 'Beautiful sunset picnic with friends in the park.'
      },
      { 
        id: 4, 
        url: poolparty, 
        title: 'Pool Party', 
        date: '2023-08-10', 
        tags: ['pool', 'party', 'friends'],
        description: 'Epic pool party to celebrate summer vacation!'
      },
      { 
        id: 5, 
        url: camping, 
        title: 'Camping Trip', 
        date: '2023-07-29', 
        tags: ['camping', 'nature', 'family'],
        description: 'Three days of camping in the wilderness. So peaceful and refreshing.'
      },
      { 
        id: 6, 
        url: icecream, 
        title: 'Ice Cream Date', 
        date: '2023-08-15', 
        tags: ['food', 'date', 'summer'],
        description: 'Best ice cream in town on the hottest day of summer!'
      },
      { 
        id: 7, 
        url: firework, 
        title: 'Fireworks Show', 
        date: '2023-07-04', 
        tags: ['fireworks', 'celebration', 'night'],
        description: 'Fourth of July fireworks display was absolutely spectacular.'
      },
      { 
        id: 8, 
        url: volley, 
        title: 'Beach Volleyball', 
        date: '2023-08-20', 
        tags: ['beach', 'sports', 'friends'],
        description: 'Competitive beach volleyball tournament with friends.'
      }
    ];
  });

  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); 
  const [sortBy, setSortBy] = useState('date');

  // Save to localStorage whenever photos change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
  }, [photos]);

  const [currentFilters, setCurrentFilters] = useState(null);

  // Apply current filters and sorting when photos change
  const applyFiltersAndSort = useCallback((photosToFilter, filters = null, sortType = sortBy) => {
    let result = [...photosToFilter];
    
    // Apply filters if provided
    if (filters) {
      // Filter by search term
      if (filters.search) {
        result = result.filter(photo => 
          photo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          photo.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          photo.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
        );
      }

      // Filter by selected tags
      if (filters.selectedTags && filters.selectedTags.length > 0) {
        result = result.filter(photo =>
          filters.selectedTags.some(tag => photo.tags.includes(tag))
        );
      }

      // Filter by date range
      if (filters.dateRange) {
        if (filters.dateRange.start) {
          result = result.filter(photo => new Date(photo.date) >= new Date(filters.dateRange.start));
        }
        if (filters.dateRange.end) {
          result = result.filter(photo => new Date(photo.date) <= new Date(filters.dateRange.end));
        }
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortType) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'tags':
          return a.tags.length - b.tags.length;
        default:
          return 0;
      }
    });

    return result;
  }, [sortBy]);

  useEffect(() => {
    const filtered = applyFiltersAndSort(photos, currentFilters);
    setFilteredPhotos(filtered);
  }, [photos, currentFilters, sortBy, applyFiltersAndSort]);

  const handleFilter = useCallback((filters) => {
    setCurrentFilters(filters);
  }, []);

  const handleSort = useCallback((sortType) => {
    setSortBy(sortType);
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleUpload = useCallback((newPhotos) => {
    const photosWithIds = newPhotos.map((photo, index) => ({
      ...photo,
      id: photos.length + index + 1,
      date: new Date().toISOString().split('T')[0]
    }));
    
    const updatedPhotos = [...photos, ...photosWithIds];
    setPhotos(updatedPhotos);
    setShowUploadModal(false);
  }, [photos]);

  const getAllTags = useCallback(() => {
    const allTags = photos.flatMap(photo => photo.tags);
    return [...new Set(allTags)];
  }, [photos]);

  return (
    <div className={styles.galleryPage}>
      <div className={styles.galleryHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Summer Memories Gallery</h1>
          <p className={styles.pageSubtitle}>
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'memory' : 'memories'} captured
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            className={styles.uploadBtn}
            onClick={() => setShowUploadModal(true)}
          >
            <span className={styles.uploadIcon}>+</span>
            Upload Photos
          </button>
          
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'masonry' ? styles.active : ''}`}
              onClick={() => setViewMode('masonry')}
            >
              ⊟
            </button>
          </div>
        </div>
      </div>

      <FilterBar 
        onFilter={handleFilter}
        onSort={handleSort}
        availableTags={getAllTags()}
        currentSort={sortBy}
      />

      {filteredPhotos.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📷</div>
          <h3>No photos found</h3>
          <p>Try adjusting your filters or upload some new memories!</p>
        </div>
      ) : (
        <div className={`${styles.photosGrid} ${styles[viewMode]}`}>
          {filteredPhotos.map(photo => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={() => handlePhotoClick(photo)}
            />
          ))}
        </div>
      )}

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={handleCloseModal}
          onNext={() => {
            const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
            const nextIndex = (currentIndex + 1) % filteredPhotos.length;
            setSelectedPhoto(filteredPhotos[nextIndex]);
          }}
          onPrevious={() => {
            const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
            const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
            setSelectedPhoto(filteredPhotos[prevIndex]);
          }}
        />
      )}
    </div>
  );
};

export default Gallery;