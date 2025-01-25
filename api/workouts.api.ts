import axios from 'axios';
import env from '@/config/env';

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${env.AUTH_TOKEN}`,
  },
});

export const fetchWorkouts = async ({ pageParam = 1 }) => {
  const response = await api.get('/workout-feed', {
    params: {
      page: pageParam,
    },
  });

  return response.data;
};
