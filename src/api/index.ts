import axios from 'axios';

import { API_KEY, API_URL } from 'constants/gen';

const http = axios.create({
  baseURL: API_URL
});

export const httpGet = async (url: string) => {
  return await http.get(url, {
    headers: {
      Authorization: API_KEY
    }
  });
};
