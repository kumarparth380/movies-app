import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import i18next from 'i18next';

import { en } from 'constants/localization';

export const bootstrap = {
  init: async () => {
    const resources = {
      en: {
        translation: en
      }
    };

    await i18next.use(initReactI18next).init({
      resources,
      compatibilityJSON: 'v3',
      lng: Localization.locale,
      fallbackLng: 'en', // Fallback language if the device's locale is not supported
      interpolation: {
        escapeValue: false // React already handles escaping
      }
    });
  }
};
