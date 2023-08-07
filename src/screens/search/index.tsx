import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, Text, TextInput } from 'react-native';

import containers from 'styles/containers';

import useMoviesSearch from '../../hooks/useMoviesSearch';

const SearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery, searchedMovies } = useMoviesSearch();
  return (
    <SafeAreaView style={containers.centerContent}>
      <Text>{t('searchScreen')}</Text>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search movies"
      />
      <FlatList
        data={searchedMovies}
        renderItem={({ item }) => <Text>{item.id}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
