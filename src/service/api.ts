import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // your NestJS backend

export const getHistory = async (symbol: string, currency: string, limit: number) => {
  const response = await axios.get(`${API_BASE_URL}/history`, {
    params: { symbol, currency, limit },
  });
  return response.data;
};
