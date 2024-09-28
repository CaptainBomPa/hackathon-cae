import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Zaktualizuj URL według potrzeb

// Funkcja do aktualizacji profilu
export const updateProfile = async (data) => {
  try {
    const userId = 4; // Zakładam, że znasz ID użytkownika, np. zalogowany użytkownik
    const formData = new FormData();

    // Przenosimy dane z obiektu data do formData
    formData.append('description', data.description);
    data.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    data.images.forEach((image) => {
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
export const updatePassword = async (data) => {
  try {
    const userId = 4; // Zakładam, że znasz ID użytkownika, np. zalogowany użytkownik
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

// Pobieranie danych użytkownika
export const getUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Nie udało się pobrać danych użytkownika.');
    }
  };
