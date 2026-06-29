import React, { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterModal } from './components/FilterModal';
import { UserTable } from './components/UserTable';
import { UserCardGrid } from './components/UserCardGrid';
import { UserFormModal } from './components/UserFormModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { Pagination } from './components/Pagination';
import { Toast } from './components/Toast';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './styles/global.css';

export default function App() {
  const {
    users,
    allFilteredCount,
    rawTotalCount,
    loading,
    error,
    toast,
    closeToast,
    searchQuery,
    setSearchQuery,
    filterCriteria,
    setFilterCriteria,
    resetFilters,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    addUser,
    updateUser,
    deleteUser,
    refetch
  } = useUsers();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const isFilterActive = Boolean(
    filterCriteria.firstName ||
      filterCriteria.lastName ||
      filterCriteria.email ||
      filterCriteria.department
  );

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      return await updateUser(editingUser.id, formData);
    } else {
      return await addUser(formData);
    }
  };

  return (
    <div className="app-container">
      <Header
        rawTotalCount={rawTotalCount}
        filteredCount={allFilteredCount}
        onAddUser={handleOpenAddModal}
      />

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
        isFilterActive={isFilterActive}
        onResetFilters={resetFilters}
      />

      {loading ? (
        <div className="glass-card loading-state">
          <div className="spinner" />
          <p style={{ fontWeight: 600 }}>Fetching users from REST API...</p>
        </div>
      ) : error ? (
        <div className="glass-card empty-state" style={{ borderColor: 'var(--danger-border)' }}>
          <AlertCircle size={48} style={{ color: 'var(--danger-text)' }} />
          <h3>Connection Error</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={refetch} style={{ marginTop: '1rem' }}>
            <RefreshCw size={16} />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : (
        <>
          <UserTable
            users={users}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={handleOpenEditModal}
            onDelete={(user) => setDeletingUser(user)}
          />

          <UserCardGrid
            users={users}
            onEdit={handleOpenEditModal}
            onDelete={(user) => setDeletingUser(user)}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={allFilteredCount}
          />
        </>
      )}

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filterCriteria={filterCriteria}
        onApplyFilter={setFilterCriteria}
      />

      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        onConfirm={deleteUser}
        user={deletingUser}
      />

      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
