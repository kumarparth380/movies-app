import Constants from 'expo-constants';

interface Env {
  API_URL?: string;
  API_KEY?: string;
}

const ExpoConstants: Env = Constants.manifest?.extra ?? {};

export const { API_KEY, API_URL } = ExpoConstants;

export const PREVIEW_IMAGE_WIDTH = 100;
export const PREVIEW_IMAGE_HEIGHT = 150;
export const BACKDROP_IMAGE_HEIGHT = 180;

export const CONTAINER_HEIGHT =
  BACKDROP_IMAGE_HEIGHT + PREVIEW_IMAGE_HEIGHT * 0.5;
