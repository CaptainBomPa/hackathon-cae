// src/services/photoService.js

import axios from 'axios';
import API_BASE_URL from './api';

const API_URL = '/api/user/photo'; // Zakładając, że baza URL to /api/user

// Funkcja do pobierania zdjęcia użytkownika
export const getUserPhoto = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/photo/${userId}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching user photo:', error);
    throw error;
  }
};

// Funkcja do aktualizacji zdjęcia użytkownika
export const updateUserPhoto = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    console.log('chuj')
    if (file) {
        console.log('chuj2')
    }
    console.log(file);

    const response = await axios.put(`${API_BASE_URL}/user/photo/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user photo:', error);
    throw error;
  }
};
