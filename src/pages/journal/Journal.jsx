import React, { useState, useEffect } from 'react';
import styles from './Journal.module.css';
import FilterBar from '../../components/filter-bar/FilterBar';
import UploadModal from '../../components/upload-modal/UploadModal';
import beachday from '../../assets/beachday.jpg';
import firework from '../../assets/firework.jpeg';
import hike from '../../assets/hike.jpeg';

const LOCAL_STORAGE_KEY = 'journal_entries';

const Journal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: 'Perfect Beach Day',
            date: '2023-07-15',
            content: 'We spent the entire day at the beach...',
            mood: '😊',
            tags: ['beach', 'family', 'sunset'],
            photos: [beachday],
          },
          {
            id: 2,
            title: 'Mountain Adventure',
            date: '2023-08-03',
            content: 'Challenging but rewarding hike...',
            mood: '💪',
            tags: ['hiking', 'nature', 'achievement'],
            photos: [hike],
          },
          {
            id: 3,
            title: 'Friends & Fireworks',
            date: '2023-07-04',
            content: 'Fourth of July celebration...',
            mood: '🎆',
            tags: ['friends', 'celebration', 'fireworks'],
            photos: [firework],
          },
        ];
  });

  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '😊',
    tags: [],
    photos: [],
  });

  const handleNewEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: Date.now(),
        ...newEntry,
        date: new Date().toISOString().split('T')[0],
      };
      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '', mood: '😊', tags: [], photos: [] });
      setShowNewEntryForm(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(images => {
      setNewEntry(prev => ({ ...prev, photos: [...prev.photos, ...images] }));
    });
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const moodOptions = ['😊', '😍', '🤔', '😴', '🎉', '💪', '🌈', '🎆', '🏖️', '🏔️'];

  return (
    <div className={styles.journalPage}>
      <div className={styles.journalHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Summer Journal</h1>
          <p className={styles.pageSubtitle}>
            Capture your thoughts and memories from this amazing summer
          </p>
        </div>
        <button
          className={styles.newEntryButton}
          onClick={() => setShowNewEntryForm(true)}
        >
          <span className={styles.plusIcon}>+</span>
          New Entry
        </button>
      </div>

      <div className={styles.journalContent}>
        {showNewEntryForm && (
          <div className={styles.newEntryForm}>
            <div className={styles.formHeader}>
              <h3>New Journal Entry</h3>
              <button
                className={styles.closeForm}
                onClick={() => setShowNewEntryForm(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.inputGroup}>
              <label>Title</label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, title: e.target.value })
                }
                placeholder="What happened today?"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>How are you feeling?</label>
              <div className={styles.moodSelector}>
                {moodOptions.map((mood) => (
                  <button
                    type="button"
                    key={mood}
                    className={`${styles.moodOption} ${
                      newEntry.mood === mood ? styles.selected : ''
                    }`}
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Your thoughts</label>
              <textarea
                value={newEntry.content}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, content: e.target.value })
                }
                placeholder="Tell me about your day..."
                rows={6}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Upload Photos</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className={styles.previewImages}>
                {newEntry.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`preview-${idx}`}
                    className={styles.previewImage}
                  />
                ))}
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowNewEntryForm(false)}
              >
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleNewEntry}>
                Save Entry
              </button>
            </div>
          </div>
        )}

        <div className={styles.entriesList}>
          {entries.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📖</div>
              <h3>No journal entries yet</h3>
              <p>Start documenting your summer memories!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className={styles.journalEntry}>
                <div className={styles.entryHeader}>
                  <div className={styles.entryMeta}>
                    <span className={styles.entryMood}>{entry.mood}</span>
                    <div>
                      <h3 className={styles.entryTitle}>{entry.title}</h3>
                      <p className={styles.entryDate}>
                        {formatDate(entry.date)}
                      </p>
                    </div>
                  </div>
                  <div className={styles.entryActions}>
                    <button className={styles.actionButton}>Edit</button>
                    <button className={styles.actionButton}>Share</button>
                  </div>
                </div>
                <div className={styles.entryContent}>
                  <p>{entry.content}</p>
                </div>
                {entry.photos.length > 0 && (
                  <div className={styles.entryPhotos}>
                    {entry.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Memory ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
                {entry.tags.length > 0 && (
                  <div className={styles.entryTags}>
                    {entry.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;