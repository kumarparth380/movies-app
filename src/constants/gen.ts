import Constants from 'expo-constants';

interface Env {
  API_URL?: string;
  API_KEY?: string;
}

const ExpoConstants: Env = Constants.manifest?.extra ?? {};

export const { API_KEY, API_URL } = ExpoConstants;
