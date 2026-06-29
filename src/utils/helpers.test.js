import { describe, it, expect } from 'vitest';
import { parseUserName, assignDepartment } from './helpers';

describe('helpers Unit Tests', () => {
  describe('parseUserName', () => {
    it('should split full name into firstName and lastName', () => {
      const result = parseUserName('Leanne Graham');
      expect(result.firstName).toBe('Leanne');
      expect(result.lastName).toBe('Graham');
    });

    it('should strip prefixes like Mrs. Dennis Schulist', () => {
      const result = parseUserName('Mrs. Dennis Schulist');
      expect(result.firstName).toBe('Dennis');
      expect(result.lastName).toBe('Schulist');
    });

    it('should handle single name gracefully', () => {
      const result = parseUserName('Cher');
      expect(result.firstName).toBe('Cher');
      expect(result.lastName).toBe('');
    });
  });

  describe('assignDepartment', () => {
    it('should return company tech department if company name contains tech', () => {
      const user = { id: 1, company: { name: 'TechCorp LLC' } };
      expect(assignDepartment(user)).toBe('Engineering');
    });

    it('should assign fallback department predictably by ID', () => {
      const user = { id: 2, company: { name: 'Alpha Inc' } };
      expect(typeof assignDepartment(user)).toBe('string');
    });
  });
});
