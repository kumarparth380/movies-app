import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { genresKeyExtractor, keyExtractor } from 'helpers';
import useMovies from 'hooks/useMovies';
import { Section } from 'types/movies';

import { EmptyState } from 'components/emptyState';
import Loading from 'components/loading';
import MovieCard from 'components/movieCard';
import { Header, SubHeader } from 'components/typography';
import containers from 'styles/containers';
import { margins, padding } from 'styles/utils';

const renderGenreItem = ({
  item: id,
  index
}: {
  item: string;
  index: number;
}) => (
  <View style={[styles.movieCard, index === 0 && margins.ml12]}>
    <MovieCard id={id} />
  </View>
);

const renderGenre = ({ item }: { item: Section }) => (
  <>
    <View style={margins.ml24}>
      <SubHeader>{item.title}</SubHeader>
    </View>
    <FlatList
      contentContainerStyle={[padding.pt8, padding.pb32, margins.mt8]}
      horizontal
      data={item.data}
      keyExtractor={keyExtractor}
      renderItem={renderGenreItem}
      showsHorizontalScrollIndicator={false}
    />
  </>
);

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { moviesByGenre, moviesLoadingState } = useMovies();
  return (
    <SafeAreaView style={containers.centerContent}>
      <Loading loadingState={moviesLoadingState} />
      <Header style={margins.mv8}>{t('appTitle')}</Header>
      <FlatList
        data={moviesByGenre}
        renderItem={renderGenre}
        contentContainerStyle={[margins.mt8, padding.pb24]}
        keyExtractor={genresKeyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState title={t('noResult')} loadingState={moviesLoadingState} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    marginRight: 8,
    width: 120,
    height: 180
  }
});

export default HomeScreen;
