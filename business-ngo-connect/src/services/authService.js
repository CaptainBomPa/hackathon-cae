// src/services/authService.js

import axios from 'axios';
import API_BASE_URL from './api';

// Funkcja logowania
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      email,
      password,
    });
    if (response.status === 200) {
      console.log(JSON.stringify(response.data));
      localStorage.setItem('user', JSON.stringify(response.data));
    } else {
      throw new Error('An unexpected error occurred');
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error('An unexpected error occurred');
  }
};

// Funkcja rejestracji
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An unexpected error occurred');
  }
};

// Nowa funkcja do aktualizacji dodatkowych danych
export const updateUserData = async (userData) => {
  try {
    console.log(userData)
    const response = await axios.post(`${API_BASE_URL}/user/additionalData`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
