import React from 'react';
import { Search, Filter, RotateCcw, X } from 'lucide-react';

export function SearchBar({
  searchQuery,
  onSearchChange,
  onOpenFilterModal,
  isFilterActive,
  onResetFilters
}) {
  return (
    <div className="glass-card toolbar-card">
      <div className="search-filter-group">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by first name, last name, or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="close-btn"
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          className={`btn ${isFilterActive ? 'btn-primary' : 'btn-secondary'}`}
          onClick={onOpenFilterModal}
        >
          <Filter size={18} />
          <span>Filter</span>
          {isFilterActive && <span className="badge-dot" title="Active filters applied" />}
        </button>

        {(searchQuery || isFilterActive) && (
          <button className="btn btn-secondary btn-icon-only" onClick={onResetFilters} title="Reset all search & filters">
            <RotateCcw size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
