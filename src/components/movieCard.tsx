import React, { memo, useCallback, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { screenNames } from 'constants/screenNames';
import { navigationService } from 'navigations/navigationService';
import { useStore } from 'store/movies';

import { colors } from 'styles/colors';
import containers from 'styles/containers';

interface MovieCardProps {
  id: string;
}

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: '100%'
  },
  favoriteContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: 8
  }
});

const MovieCard: React.FC<MovieCardProps> = ({ id }) => {
  const { selectMovieById, selectIsFavoriteMovie } = useStore();
  const movieData = selectMovieById(id);
  const isFavorite = selectIsFavoriteMovie(id);

  const handlePress = useCallback(() => {
    navigationService.navigate(
      screenNames.HomeStack,
      screenNames.MovieDetails,
      {
        id
      }
    );
  }, [id]);

  const source = useMemo(
    () => ({
      uri: movieData?.poster
    }),
    [movieData?.poster]
  );

  return (
    <TouchableOpacity
      testID={movieData?.title}
      style={containers.flex1}
      onPress={handlePress}
    >
      <Image style={styles.poster} source={source} />
      <View style={styles.favoriteContainer}>
        {isFavorite ? (
          <MaterialIcons name="favorite" size={24} color={colors.rose} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default memo(MovieCard);
