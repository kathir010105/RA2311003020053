import React from 'react';
import styles from './SearchFilter.module.css';

const SearchFilter = ({ searchTerm, onSearchChange, categoryFilter, onCategoryChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.selectGroup}>
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={styles.select}
        >
          <option value="All">All Categories</option>
          <option value="Placement">Placement</option>
          <option value="Event">Events</option>
          <option value="Result">Results</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
