import { useState, useEffect, useMemo, useCallback } from 'react';
import { userService } from '../api/userService';
import { parseUserName, assignDepartment } from '../utils/helpers';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawData = await userService.getUsers();
      const mappedData = rawData.map((user) => {
        const { firstName, lastName } = parseUserName(user.name);
        return {
          id: user.id,
          firstName,
          lastName,
          email: user.email || '',
          department: assignDepartment(user)
        };
      });
      setUsers(mappedData);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      const errorMessage = 'Failed to load users from server. Please check your internet connection and try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCriteria, pageSize]);

  const addUser = async (formData) => {
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        company: { name: formData.department }
      };

      const response = await userService.createUser(payload);

      const existingIds = new Set(users.map((u) => Number(u.id)));
      let newId = response.id || Date.now();
      while (existingIds.has(Number(newId))) {
        newId = Math.max(0, ...Array.from(existingIds)) + 1;
      }

      const newUser = {
        id: newId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        department: formData.department
      };

      setUsers((prev) => [newUser, ...prev]);
      showToast(`User ${newUser.firstName} ${newUser.lastName} added successfully!`, 'success');
      return true;
    } catch (err) {
      console.error('Add user failed:', err);
      showToast('Failed to add user. Server request encountered an error.', 'error');
      return false;
    }
  };

  const updateUser = async (id, formData) => {
    try {
      const payload = {
        id,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        company: { name: formData.department }
      };

      try {
        await userService.updateUser(id, payload);
      } catch (apiErr) {
        console.warn('Backend update simulation note:', apiErr.message);
      }

      const updatedUser = {
        id,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        department: formData.department
      };

      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      showToast(`User details for ${updatedUser.firstName} updated successfully!`, 'success');
      return true;
    } catch (err) {
      console.error('Update user failed:', err);
      showToast('Failed to update user. Please try again.', 'error');
      return false;
    }
  };

  const deleteUser = async (id) => {
    try {
      const targetUser = users.find((u) => u.id === id);
      try {
        await userService.deleteUser(id);
      } catch (apiErr) {
        console.warn('Backend delete simulation note:', apiErr.message);
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
      const userName = targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : 'User';
      showToast(`${userName} deleted successfully.`, 'info');
      return true;
    } catch (err) {
      console.error('Delete user failed:', err);
      showToast('Failed to delete user. Please try again.', 'error');
      return false;
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const resetFilters = () => {
    setFilterCriteria({
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    });
    setSearchQuery('');
  };

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((user) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesFirst = user.firstName.toLowerCase().includes(q);
          const matchesLast = user.lastName.toLowerCase().includes(q);
          const matchesEmail = user.email.toLowerCase().includes(q);
          if (!matchesFirst && !matchesLast && !matchesEmail) return false;
        }

        if (filterCriteria.firstName && !user.firstName.toLowerCase().includes(filterCriteria.firstName.toLowerCase().trim())) {
          return false;
        }
        if (filterCriteria.lastName && !user.lastName.toLowerCase().includes(filterCriteria.lastName.toLowerCase().trim())) {
          return false;
        }
        if (filterCriteria.email && !user.email.toLowerCase().includes(filterCriteria.email.toLowerCase().trim())) {
          return false;
        }
        if (filterCriteria.department && user.department !== filterCriteria.department) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const { key, direction } = sortConfig;
        let valA = a[key];
        let valB = b[key];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, searchQuery, filterCriteria, sortConfig]);

  const totalItems = filteredAndSortedUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedUsers = useMemo(() => {
    const startIdx = (validCurrentPage - 1) * pageSize;
    return filteredAndSortedUsers.slice(startIdx, startIdx + pageSize);
  }, [filteredAndSortedUsers, validCurrentPage, pageSize]);

  return {
    users: paginatedUsers,
    allFilteredCount: totalItems,
    rawTotalCount: users.length,
    loading,
    error,
    toast,
    showToast,
    closeToast,
    searchQuery,
    setSearchQuery,
    filterCriteria,
    setFilterCriteria,
    resetFilters,
    sortConfig,
    handleSort,
    currentPage: validCurrentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    addUser,
    updateUser,
    deleteUser,
    refetch: loadUsers
  };
}
