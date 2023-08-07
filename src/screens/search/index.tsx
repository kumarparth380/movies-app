import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text } from 'react-native';

import containers from 'styles/containers';

const SearchScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={containers.centerContent}>
      <Text>{t('searchScreen')}</Text>
    </SafeAreaView>
  );
};

export default SearchScreen;
