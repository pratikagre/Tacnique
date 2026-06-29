import { describe, it, expect } from 'vitest';
import { validateUserForm } from './validators';

describe('validateUserForm Unit Tests', () => {
  it('should return errors for empty form data', () => {
    const emptyData = { firstName: '', lastName: '', email: '', department: '' };
    const errors = validateUserForm(emptyData);

    expect(errors.firstName).toBe('First name is required');
    expect(errors.lastName).toBe('Last name is required');
    expect(errors.email).toBe('Email address is required');
    expect(errors.department).toBe('Department selection is required');
  });

  it('should return invalid email error for improper email format', () => {
    const invalidData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'invalid-email-string',
      department: 'Engineering'
    };
    const errors = validateUserForm(invalidData);

    expect(errors.email).toBe('Please enter a valid email address (e.g. user@example.com)');
    expect(errors.firstName).toBeUndefined();
    expect(errors.lastName).toBeUndefined();
  });

  it('should pass validation with zero errors for valid user input', () => {
    const validData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@company.com',
      department: 'Engineering'
    };
    const errors = validateUserForm(validData);

    expect(Object.keys(errors).length).toBe(0);
  });
});
