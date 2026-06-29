import React, { useState, useEffect } from 'react';
import { X, Save, UserPlus } from 'lucide-react';
import { DEPARTMENTS } from '../utils/constants';
import { validateUserForm } from '../utils/validators';

export function UserFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: DEPARTMENTS[0]
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        department: initialData.department || DEPARTMENTS[0]
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: DEPARTMENTS[0]
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    const success = await onSubmit(formData);
    setSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditMode ? 'Edit User Details' : 'Add New User'}</h2>
          <button className="close-btn" onClick={onClose} disabled={submitting}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">
                First Name <span style={{ color: 'var(--danger-text)' }}>*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.firstName ? 'is-invalid' : ''}`}
                placeholder="e.g. Jane"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                disabled={submitting}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Last Name <span style={{ color: 'var(--danger-text)' }}>*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.lastName ? 'is-invalid' : ''}`}
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                disabled={submitting}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Email Address <span style={{ color: 'var(--danger-text)' }}>*</span>
              </label>
              <input
                type="email"
                className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                placeholder="e.g. jane.doe@company.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={submitting}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Department <span style={{ color: 'var(--danger-text)' }}>*</span>
              </label>
              <select
                className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                disabled={submitting}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
              ) : isEditMode ? (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>Create User</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
