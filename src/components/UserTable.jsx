import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Edit2, Trash2, UserX } from 'lucide-react';

export function UserTable({ users, sortConfig, onSort, onEdit, onDelete }) {
  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} style={{ opacity: 0.4 }} />;
    }
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  if (users.length === 0) {
    return (
      <div className="glass-card empty-state">
        <UserX size={48} style={{ opacity: 0.5 }} />
        <h3>No Users Found</h3>
        <p>No user records match your active search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="glass-card table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th className="sortable" onClick={() => onSort('id')}>
              <div className="th-content">
                <span>ID</span>
                {renderSortIcon('id')}
              </div>
            </th>
            <th className="sortable" onClick={() => onSort('firstName')}>
              <div className="th-content">
                <span>First Name</span>
                {renderSortIcon('firstName')}
              </div>
            </th>
            <th className="sortable" onClick={() => onSort('lastName')}>
              <div className="th-content">
                <span>Last Name</span>
                {renderSortIcon('lastName')}
              </div>
            </th>
            <th className="sortable" onClick={() => onSort('email')}>
              <div className="th-content">
                <span>Email Address</span>
                {renderSortIcon('email')}
              </div>
            </th>
            <th className="sortable" onClick={() => onSort('department')}>
              <div className="th-content">
                <span>Department</span>
                {renderSortIcon('department')}
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
            return (
              <tr key={user.id}>
                <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>#{user.id}</td>
                <td>
                  <div className="user-avatar-cell">
                    <div className="avatar-circle">{initials}</div>
                    <span>{user.firstName}</span>
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{user.lastName}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                <td>
                  <span className="department-badge">{user.department}</span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onEdit(user)}
                      title="Edit User Details"
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(user)}
                      title="Delete User"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
