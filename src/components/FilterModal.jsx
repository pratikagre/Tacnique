import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { DEPARTMENTS } from '../utils/constants';

export function FilterModal({ isOpen, onClose, filterCriteria, onApplyFilter }) {
  const [localFilters, setLocalFilters] = useState(filterCriteria);

  useEffect(() => {
    setLocalFilters(filterCriteria);
  }, [filterCriteria, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApplyFilter(localFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters = {
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    };
    setLocalFilters(emptyFilters);
    onApplyFilter(emptyFilters);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Advanced Data Filters</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleApply}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Filter by first name..."
                value={localFilters.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Filter by last name..."
                value={localFilters.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="Filter by email domain or handle..."
                value={localFilters.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                value={localFilters.department}
                onChange={(e) => handleChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Apply Filters</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
