import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getRelations = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/relation/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching relations:', error);
    throw error;
  }
};

export const getMessages = async (relationId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${relationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async (relationId, message) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
