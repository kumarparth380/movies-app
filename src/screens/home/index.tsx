import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, SectionList, View } from 'react-native';

import useMovies from 'hooks/useMovies';
import { Section } from 'types/movies';

import MovieCard from 'components/movieCard';
import { Header, SubHeader } from 'components/typography';
import containers from 'styles/containers';
import { margins, padding } from 'styles/utils';

const keyExtractor = (id: string) => id;

const renderSectionItem = () => null;

const renderGenreItem = ({
  item: id,
  index
}: {
  item: string;
  index: number;
}) => (
  <View style={[margins.mr8, index === 0 && margins.ml12]}>
    <MovieCard id={id} />
  </View>
);

const renderSectionHeader = ({ section }: { section: Section }) => (
  <>
    <View style={margins.ml24}>
      <SubHeader>{section.title}</SubHeader>
    </View>
    <FlatList
      contentContainerStyle={[padding.pt8, padding.pb32, margins.mt8]}
      horizontal
      data={section.data}
      keyExtractor={keyExtractor}
      renderItem={renderGenreItem}
      showsHorizontalScrollIndicator={false}
    />
  </>
);

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { moviesByGenre } = useMovies();

  return (
    <SafeAreaView style={containers.centerContent}>
      <Header style={margins.mv8}>{t('appTitle')}</Header>
      <SectionList
        sections={moviesByGenre}
        renderItem={renderSectionItem}
        contentContainerStyle={[margins.mt8, padding.pb24]}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
