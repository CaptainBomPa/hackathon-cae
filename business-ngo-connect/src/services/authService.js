// src/services/authService.js

import axios from 'axios';
import API_BASE_URL from './api';

// Funkcja logowania
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data; // Zwracamy dane użytkownika w przypadku sukcesu
  } catch (error) {
    throw error.response ? error.response.data : new Error('An unexpected error occurred');
  }
};

// Funkcja rejestracji (możesz dodać ją później)
export const register = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  };
