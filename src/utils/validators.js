/**
 * Validates user form input data.
 * Returns an object containing error messages for each invalid field.
 */
export function validateUserForm(formData) {
  const errors = {};

  // First Name validation
  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Last Name validation
  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address (e.g. user@example.com)";
  }

  // Department validation
  if (!formData.department || !formData.department.trim()) {
    errors.department = "Department selection is required";
  }

  return errors;
}
