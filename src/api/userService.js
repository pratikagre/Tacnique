import axios from 'axios';
import { API_URL } from '../utils/constants';

export const userService = {
  async getUsers() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async createUser(userPayload) {
    const response = await axios.post(API_URL, userPayload);
    return response.data;
  },

  async updateUser(id, userPayload) {
    const response = await axios.put(`${API_URL}/${id}`, userPayload);
    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
