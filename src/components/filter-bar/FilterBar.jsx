import React, { useState, useEffect } from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ onFilter, onSort, availableTags, currentSort }) => {
  const [filters, setFilters] = useState({
    search: '',
    selectedTags: [],
    dateRange: {
      start: '',
      end: ''
    }
  });
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleTagToggle = (tag) => {
    setFilters(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const handleDateChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      selectedTags: [],
      dateRange: {
        start: '',
        end: ''
      }
    });
  };

  const hasActiveFilters = () => {
    return filters.search || 
           filters.selectedTags.length > 0 || 
           filters.dateRange.start || 
           filters.dateRange.end;
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterContainer}>
        {/* Main Filter Row */}
        <div className={styles.mainFilters}>
          {/* Search */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search photos, descriptions, or tags..."
              value={filters.search}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

          {/* Sort Dropdown */}
          <div className={styles.sortContainer}>
            <select
              value={currentSort}
              onChange={(e) => onSort(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="tags">Sort by Tags</option>
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            className={`${styles.advancedToggle} ${showAdvancedFilters ? styles.active : ''}`}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <span>Filters</span>
            <span className={styles.toggleIcon}>
              {showAdvancedFilters ? '▲' : '▼'}
            </span>
          </button>

          {/* Clear Filters */}
          {hasActiveFilters() && (
            <button className={styles.clearButton} onClick={clearFilters}>
              Clear All
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className={styles.advancedFilters}>
            {/* Tag Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Tags:</label>
              <div className={styles.tagFilterContainer}>
                <button
                  className={styles.tagDropdownButton}
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                >
                  {filters.selectedTags.length > 0 
                    ? `${filters.selectedTags.length} tags selected`
                    : 'Select tags'
                  }
                  <span className={styles.dropdownIcon}>
                    {showTagDropdown ? '▲' : '▼'}
                  </span>
                </button>
                
                {showTagDropdown && (
                  <div className={styles.tagDropdown}>
                    {availableTags.map(tag => (
                      <label key={tag} className={styles.tagOption}>
                        <input
                          type="checkbox"
                          checked={filters.selectedTags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                        />
                        <span className={styles.tagName}>#{tag}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Date Range:</label>
              <div className={styles.dateRangeContainer}>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className={styles.dateInput}
                />
                <span className={styles.dateSeparator}>to</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className={styles.dateInput}
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className={styles.activeFilters}>
            <span className={styles.activeFiltersLabel}>Active filters:</span>
            
            {filters.search && (
              <span className={styles.activeFilter}>
                Search: "{filters.search}"
                <button onClick={() => handleSearchChange({ target: { value: '' } })}>×</button>
              </span>
            )}
            
            {filters.selectedTags.map(tag => (
              <span key={tag} className={styles.activeFilter}>
                #{tag}
                <button onClick={() => handleTagToggle(tag)}>×</button>
              </span>
            ))}
            
            {(filters.dateRange.start || filters.dateRange.end) && (
              <span className={styles.activeFilter}>
                Date: {filters.dateRange.start || 'Any'} - {filters.dateRange.end || 'Any'}
                <button onClick={() => setFilters(prev => ({ ...prev, dateRange: { start: '', end: '' } }))}>×</button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;