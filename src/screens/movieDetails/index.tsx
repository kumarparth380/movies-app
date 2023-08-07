import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

import { screenNames } from 'constants/screenNames';
import { navigationService } from 'navigations/navigationService';
import { useStore } from 'store/movies';
import { Movie } from 'types/movies';
import { RootStackParamList } from 'types/rootStackParamList';

import { Body } from 'components/typography';
import { colors } from 'styles/colors';
import containers from 'styles/containers';
import { margins, padding } from 'styles/utils';

import { generateRatingStars } from '../../helpers';

const PREVIEW_IMAGE_WIDTH = 100;
const PREVIEW_IMAGE_HEIGHT = 150;
const BACKDROP_IMAGE_HEIGHT = 180;

const CONTAINER_HEIGHT = BACKDROP_IMAGE_HEIGHT + PREVIEW_IMAGE_HEIGHT * 0.5;

const MovieDetailsHeader: React.FC = () => {
  const { t } = useTranslation();
  const route =
    useRoute<RouteProp<RootStackParamList, screenNames.MovieDetails>>();
  const { id } = route.params;
  const movieData = useStore()?.selectMovieById(id) as Movie;
  const insets = useSafeAreaInsets();

  if (!movieData) {
    return null;
  }

  const handleBackPress = () => {
    navigationService.pop();
  };

  const topInset = insets.top || 0;

  const titleLabel = `${movieData.title as string} (${
    movieData.classification as string
  })`;

  const containerHeight = CONTAINER_HEIGHT + topInset;
  const backdropImageHeight = BACKDROP_IMAGE_HEIGHT + topInset;
  const movieCardTopOffset =
    BACKDROP_IMAGE_HEIGHT * 0.5 +
    (BACKDROP_IMAGE_HEIGHT - PREVIEW_IMAGE_HEIGHT) * 0.5 +
    topInset;

  const year = movieData?.released_on
    ? new Date(movieData.released_on).getFullYear()
    : '???';

  return (
    <View style={[styles.container, { minHeight: containerHeight }]}>
      <Image
        source={{ uri: movieData?.backdrop }}
        style={[
          styles.backdropImage,
          {
            maxHeight: backdropImageHeight
          }
        ]}
      />

      <TouchableOpacity
        onPress={handleBackPress}
        style={[styles.backIconContainer, { top: insets.top + 10 }]}
      >
        <Feather name="chevron-left" color="white" size={26} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Body color={colors.white}>{titleLabel}</Body>
      </View>
      <View style={styles.rating}>
        {generateRatingStars(movieData.imdb_rating).map(
          ({ name, id: starId }) => (
            <FontAwesome key={starId} name={name} size={20} color="orange" />
          )
        )}
      </View>
      <View
        style={[
          padding.ph24,
          containers.flex1,
          {
            marginTop: PREVIEW_IMAGE_HEIGHT * 0.5 + 8
          }
        ]}
      >
        <Body>
          {year} | {movieData?.length} | {movieData?.director}
        </Body>

        <Body style={margins.mt16}>
          {t('movieDetailsScreen.cast')}: {movieData?.cast?.join(', ')}
        </Body>

        <Body style={margins.mt16}>{movieData?.overview}</Body>
      </View>
      <View style={[styles.posterContainer, { top: movieCardTopOffset }]}>
        <Image source={{ uri: movieData?.poster }} style={styles.posterImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backIconContainer: {
    zIndex: 2,
    position: 'absolute',
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    width: '100%'
  },
  posterContainer: {
    left: 24,
    position: 'absolute'
  },
  titleContainer: {
    zIndex: 1,
    left: PREVIEW_IMAGE_WIDTH + 32,
    bottom: PREVIEW_IMAGE_HEIGHT * 0.2 + 8
  },
  rating: {
    zIndex: 1,
    left: PREVIEW_IMAGE_WIDTH + 32,
    top: PREVIEW_IMAGE_HEIGHT * 0.2 + 8,
    flexDirection: 'row'
  },
  backdropImage: {
    flex: 1,
    maxHeight: BACKDROP_IMAGE_HEIGHT
  },
  posterImage: {
    width: PREVIEW_IMAGE_WIDTH,
    height: PREVIEW_IMAGE_HEIGHT
  }
});

export default MovieDetailsHeader;
