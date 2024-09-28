import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Aktualizacja adresu URL do nowego API

// Funkcja do aktualizacji profilu
export const updateProfile = async (userId, data) => {
  try {
    const formData = new FormData();

    // Przenosimy dane z obiektu data do formData
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.email) {
      formData.append('email', data.email);
    }
    if (data.description) {
      formData.append('description', data.description);
    }
    // Dodawanie kategorii
    data.categories?.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    // Dodawanie zdjęć
    data.images?.forEach((image) => {
      formData.append('images', image); // Przypisujemy pliki zdjęć
    });

    const response = await axios.put(`${API_URL}/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Błąd podczas aktualizacji profilu');
  }
};

// Funkcja do zmiany hasła
export const updatePassword = async (userId, data) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/password`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Błąd podczas zmiany hasła');
  }
};

// Funkcja do pobrania wszystkich użytkowników
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Błąd podczas pobierania użytkowników');
  }
};

// Funkcja do pobrania danych użytkownika
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Nie udało się pobrać danych użytkownika.');
  }
};

// Funkcja do przesyłania zdjęcia profilowego
export const uploadPhoto = async (userId, photoData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/photo`, photoData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Błąd podczas przesyłania zdjęcia profilowego');
  }
};
