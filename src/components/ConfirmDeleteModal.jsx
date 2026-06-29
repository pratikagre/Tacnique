import React, { useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, user }) {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !user) return null;

  const handleConfirm = async () => {
    setDeleting(true);
    const success = await onConfirm(user.id);
    setDeleting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger-text)' }}>
            <AlertTriangle size={22} />
            <h2 className="modal-title">Confirm Deletion</h2>
          </div>
          <button className="close-btn" onClick={onClose} disabled={deleting}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.6' }}>
            Are you sure you want to delete user{' '}
            <strong>
              {user.firstName} {user.lastName}
            </strong>{' '}
            (ID: #{user.id})?
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            This action will remove the record from your active dashboard directory.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={deleting}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={handleConfirm} disabled={deleting}>
            {deleting ? (
              <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
            ) : (
              <>
                <Trash2 size={16} />
                <span>Delete User</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
