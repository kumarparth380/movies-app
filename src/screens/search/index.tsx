import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { keyExtractor } from 'helpers';
import useMoviesSearch from 'hooks/useMoviesSearch';

import { EmptyState } from 'components/emptyState';
import Loading from 'components/loading';
import MovieCard from 'components/movieCard';
import SearchBar from 'components/searchBar';
import { SubHeader } from 'components/typography';
import { colors } from 'styles/colors';
import containers from 'styles/containers';
import { padding } from 'styles/utils';

const renderMovieItem = ({ item }: { item: string }) => (
  <View style={styles.movieCard}>
    <MovieCard id={item} />
  </View>
);

const SearchScreen: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const { t } = useTranslation();
  const inputRef = React.useRef<TextInput>(null);
  const { searchQuery, setSearchQuery, searchedMovies, searchLoadingState } =
    useMoviesSearch();

  const safeAreaStyle = useMemo(
    () => ({ flex: 1, paddingTop: safeAreaInsets.top }),
    [safeAreaInsets]
  );

  return (
    <View style={[styles.container, safeAreaStyle]}>
      <Loading loadingState={searchLoadingState} />
      <SubHeader>{t('search')}</SubHeader>
      <SearchBar
        ref={inputRef}
        search={searchQuery}
        setSearch={setSearchQuery}
      />
      <FlatList
        style={[padding.pt16, padding.pb32]}
        contentContainerStyle={containers.alignCenter}
        data={searchedMovies}
        renderItem={renderMovieItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState title={t('noResult')} loadingState={searchLoadingState} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24
  },
  movieCard: {
    marginBottom: 16,
    width: 200,
    height: 300
  }
});

export default SearchScreen;
