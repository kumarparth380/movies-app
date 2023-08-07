import React, { memo, useCallback, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { screenNames } from 'constants/screenNames';
import { navigationService } from 'navigations/navigationService';
import { useStore } from 'store/movies';

import containers from 'styles/containers';

interface MovieCardProps {
  id: string;
}

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: '100%'
  }
});

const MovieCard: React.FC<MovieCardProps> = ({ id }) => {
  const movieData = useStore()?.selectMovieById(id);

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
    <TouchableOpacity style={containers.flex1} onPress={handlePress}>
      <Image style={styles.poster} source={source} />
    </TouchableOpacity>
  );
};

export default memo(MovieCard);
