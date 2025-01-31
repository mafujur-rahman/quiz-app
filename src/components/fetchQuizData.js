import axios from 'axios';

const API_URL = '/api';  // Local proxy endpoint

const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
};
export default fetchQuizData;
