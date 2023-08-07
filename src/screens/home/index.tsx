import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text } from 'react-native';

import containers from 'styles/containers';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={containers.centerContent}>
      <Text>{t('homeScreen')}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
