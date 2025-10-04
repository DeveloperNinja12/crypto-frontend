import { axiosClient } from './axiosClient';


export const getHistory = async (symbol: string, currency: string, limit: number) => {
    const params = new URLSearchParams({
    symbol,
    currency,
    limit: limit.toString(),
    }).toString();

    const response = await axiosClient(`/history?${params}`, {}, 'GET');
  return response.data;
};

