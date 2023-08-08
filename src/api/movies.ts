import { httpGet } from 'api';
import { API_URL } from 'constants/gen';

export const fetchMovies = async (search?: string) => {
  try {
    const queryString = search ?? search === '' ? `?q=${search}` : '';
    const response = await httpGet(`${API_URL as string}/movies${queryString}`);
    return response?.data;
  } catch (error) {
    console.log('error is ', error);
    throw error;
  }
};
