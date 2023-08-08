import axios from 'axios';

import { API_KEY } from 'constants/gen';

export const httpGet = async (url: string) => {
  return await axios.get(url, {
    headers: {
      Authorization: API_KEY
    }
  });
};
