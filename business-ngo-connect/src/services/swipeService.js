import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/swipe';

// Funkcja do wysyłania danych swipe do serwera
export const saveSwipe = async (userId, partnerId, swipeStatus) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      userId,
      partnerId,
      swipeStatus
    });
    return response.data;
  } catch (error) {
    console.error('Error saving swipe:', error);
    throw error;
  }
};
