import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// Funkcja do pobierania sparowanych użytkowników (relacji)
export const getMatchedUsers = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/match`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching matched users:', error);
    throw error;
  }
};

// Funkcja do pobierania wiadomości pomiędzy dwoma użytkownikami
export const getMessages = async (senderId, receiverId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/messages`, {
      params: { senderId, receiverId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Funkcja do wysyłania wiadomości
export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/send`, message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
