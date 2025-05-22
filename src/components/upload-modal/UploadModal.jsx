import React, { useState, useRef } from 'react';
import styles from './UploadModal.module.css';

const UploadModal = ({ onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const newFiles = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.split('.')[0],
      description: '',
      tags: []
    }));
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const updateFileDetails = (index, field, value) => {
    setSelectedFiles(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addTag = (index, tag) => {
    if (tag.trim() && !selectedFiles[index].tags.includes(tag.trim())) {
      updateFileDetails(index, 'tags', [...selectedFiles[index].tags, tag.trim()]);
    }
  };

  const removeTag = (fileIndex, tagIndex) => {
    const updatedTags = [...selectedFiles[fileIndex].tags];
    updatedTags.splice(tagIndex, 1);
    updateFileDetails(fileIndex, 'tags', updatedTags);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const uploadedPhotos = selectedFiles.map(file => ({
      url: file.preview, // In a real app, this would be the uploaded file URL
      title: file.title,
      description: file.description,
      tags: file.tags
    }));
    
    onUpload(uploadedPhotos);
    
    // Clean up preview URLs
    selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    
    setUploading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Upload Photos</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* Upload Area */}
          <div
            className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className={styles.uploadIcon}>📸</div>
            <h3 className={styles.uploadTitle}>
              {dragActive ? 'Drop your photos here!' : 'Upload Your Summer Memories'}
            </h3>
            <p className={styles.uploadSubtitle}>
              Drag and drop photos here, or click to browse
            </p>
            <p className={styles.uploadHint}>
              Supports: JPG, PNG, GIF, WebP
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className={styles.selectedFiles}>
              <h3 className={styles.sectionTitle}>
                Selected Photos ({selectedFiles.length})
              </h3>
              
              <div className={styles.filesList}>
                {selectedFiles.map((file, index) => (
                  <div key={index} className={styles.fileItem}>
                    <div className={styles.filePreview}>
                      <img src={file.preview} alt={file.title} />
                      <button
                        className={styles.removeFileButton}
                        onClick={() => removeFile(index)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className={styles.fileDetails}>
                      <div className={styles.inputGroup}>
                        <label>Title:</label>
                        <input
                          type="text"
                          value={file.title}
                          onChange={(e) => updateFileDetails(index, 'title', e.target.value)}
                          placeholder="Enter photo title"
                        />
                      </div>
                      
                      <div className={styles.inputGroup}>
                        <label>Description:</label>
                        <textarea
                          value={file.description}
                          onChange={(e) => updateFileDetails(index, 'description', e.target.value)}
                          placeholder="Describe this memory..."
                          rows={2}
                        />
                      </div>
                      
                      <div className={styles.inputGroup}>
                        <label>Tags:</label>
                                                  <div className={styles.tagsContainer}>
                          {file.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className={styles.tag}>
                              #{tag}
                              <button onClick={() => removeTag(index, tagIndex)}>×</button>
                            </span>
                          ))}
                          <input
                            type="text"
                            placeholder="Add tags (press Enter)"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTag(index, e.target.value);
                                e.target.value = '';
                              }
                            }}
                            className={styles.tagInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.uploadButton}
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
          >
            {uploading ? (
              <>
                <div className={styles.loadingSpinner}></div>
                Uploading...
              </>
            ) : (
              `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;