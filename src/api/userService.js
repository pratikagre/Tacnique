import axios from 'axios';
import { API_URL } from '../utils/constants';

/**
 * REST API client for interacting with JSONPlaceholder user endpoints.
 */
export const userService = {
  /**
   * Fetches all users from the backend API.
   */
  async getUsers() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  /**
   * Posts a new user to the backend API (Simulated response).
   */
  async createUser(userPayload) {
    const response = await axios.post(API_URL, userPayload);
    return response.data;
  },

  /**
   * Updates an existing user by ID (Simulated response).
   */
  async updateUser(id, userPayload) {
    const response = await axios.put(`${API_URL}/${id}`, userPayload);
    return response.data;
  },

  /**
   * Deletes a user by ID (Simulated response).
   */
  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
