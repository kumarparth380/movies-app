import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, Text } from 'react-native';

import useMovies from 'hooks/useMovies';

import containers from 'styles/containers';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { movies } = useMovies();

  return (
    <SafeAreaView style={containers.centerContent}>
      <Text>{t('homeScreen')}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <Text>{item.id}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
