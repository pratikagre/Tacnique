import React from 'react';
import { Users, UserPlus } from 'lucide-react';

export function Header({ rawTotalCount, filteredCount, onAddUser }) {
  return (
    <header className="glass-card header-card">
      <div className="brand-section">
        <div className="brand-icon-wrapper">
          <Users size={26} />
        </div>
        <div>
          <h1 className="brand-title">User Management Dashboard</h1>
          <p className="brand-subtitle">Overview & Administrative Control Panel</p>
        </div>
      </div>

      <div className="header-stats">
        <div className="stat-badge">
          <span>Active Directory:</span>
          <span className="stat-number">{rawTotalCount}</span>
        </div>
        {filteredCount !== rawTotalCount && (
          <div className="stat-badge">
            <span>Matching Filter:</span>
            <span className="stat-number">{filteredCount}</span>
          </div>
        )}
        <button className="btn btn-primary" onClick={onAddUser}>
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>
    </header>
  );
}
