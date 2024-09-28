import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
let stompClient = null;

// Funkcja do pobierania sparowanych użytkowników (relacji)
export const getMatchedUsers = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/match`, { params: { userId } });
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

// Funkcja do wysyłania wiadomości za pomocą WebSocket
export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/send',
      body: JSON.stringify(message),
    });
  } else {
    console.error('Unable to send message, WebSocket is not connected.');
  }
};

// Funkcja do połączenia z WebSocket
export const connectWebSocket = (userId, onMessageReceived) => {
  const socket = new SockJS(`http://localhost:8080/chat`); // Endpoint WebSocket
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      console.log('WebSocket connected');

      // Subskrybuj prywatne wiadomości do zalogowanego użytkownika
      stompClient.subscribe(`/user/${userId}/messages`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        onMessageReceived(receivedMessage);
      });
    },
    onStompError: (error) => {
      console.error('WebSocket error:', error);
    },
  });

  stompClient.activate();
};

// Funkcja do rozłączenia z WebSocket
export const disconnectWebSocket = () => {
  if (stompClient !== null) {
    stompClient.deactivate();
    console.log('WebSocket disconnected');
  }
};

// Funkcja do logowania użytkownika (HTTP)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Funkcja do rejestracji użytkownika (HTTP)
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, user);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
