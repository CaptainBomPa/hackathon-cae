import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/recommendations';

// Funkcja do pobierania rekomendacji NGO dla firm
export const getCompanyRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ngo/companies`, {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company recommendations:', error);
    throw error;
  }
};

// Funkcja do pobierania rekomendacji NGO dla wolontariuszy
export const getVolunteerRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ngo/volunteers`, {
        params: { id: userId },
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer recommendations:', error);
    throw error;
  }
};

// Funkcja do pobierania rekomendacji firm dla NGO
export const getNgoCompanyRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/company`, {
        params: { id: userId },
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching NGO company recommendations:', error);
    throw error;
  }
};

// Funkcja do pobierania rekomendacji wolontariuszy dla NGO
export const getNgoVolunteerRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ngo`, {
        params: { id: userId },
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching NGO volunteer recommendations:', error);
    throw error;
  }
};
