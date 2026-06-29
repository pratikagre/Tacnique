import React from 'react';
import { Edit2, Trash2, Mail, Briefcase } from 'lucide-react';

export function UserCardGrid({ users, onEdit, onDelete }) {
  if (users.length === 0) return null;

  return (
    <div className="cards-grid">
      {users.map((user) => {
        const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
        return (
          <div className="glass-card user-card" key={user.id}>
            <div className="user-card-header">
              <div className="user-avatar-cell">
                <div className="avatar-circle">{initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: #{user.id}</div>
                </div>
              </div>
              <span className="department-badge">{user.department}</span>
            </div>

            <div className="user-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} style={{ color: 'var(--text-muted)' }} />
                <span>{user.email}</span>
              </div>
            </div>

            <div className="user-card-actions">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => onEdit(user)}>
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
              <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={() => onDelete(user)}>
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
