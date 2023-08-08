import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

import {
  BACKDROP_IMAGE_HEIGHT,
  CONTAINER_HEIGHT,
  PREVIEW_IMAGE_HEIGHT,
  PREVIEW_IMAGE_WIDTH
} from 'constants/gen';
import { screenNames } from 'constants/screenNames';
import { generateRatingStars } from 'helpers';
import { useStore } from 'store/movies';
import { Movie } from 'types/movies';
import { RootStackParamList } from 'types/rootStackParamList';

import Header from 'components/header';
import { Body } from 'components/typography';
import MovieDescription from 'screens/movieDetails/components/movieDescription';
import { colors } from 'styles/colors';

const MovieDetailsHeader: React.FC = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, screenNames.MovieDetails>>();
  const { id } = route.params;
  const movieData = useStore()?.selectMovieById(id) as Movie;
  const insets = useSafeAreaInsets();

  if (!movieData) {
    return null;
  }

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

  const {
    title,
    imdb_rating: imdbRating,
    backdrop,
    overview,
    released_on: released,
    poster,
    cast,
    director,
    length
  } = movieData || {};

  return (
    <View
      testID={`MovieDetailsScreen-${title as string}`}
      style={[styles.container, { minHeight: containerHeight }]}
    >
      <Image
        source={{ uri: backdrop }}
        style={[
          styles.backdropImage,
          {
            maxHeight: backdropImageHeight
          }
        ]}
      />

      <Header id={id} />

      <View style={styles.titleContainer}>
        <Body color={colors.white}>{titleLabel}</Body>
      </View>
      <View style={styles.rating}>
        {generateRatingStars(imdbRating)?.map(({ name, id: starId }) => (
          <FontAwesome key={starId} name={name} size={20} color="orange" />
        ))}
      </View>

      <MovieDescription
        overview={overview}
        cast={cast}
        director={director}
        length={length}
        released={released}
      />

      <View style={[styles.posterContainer, { top: movieCardTopOffset }]}>
        <Image source={{ uri: poster }} style={styles.posterImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
