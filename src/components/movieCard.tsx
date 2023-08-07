import React, { memo, useCallback, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { screenNames } from 'constants/screenNames';
import { navigationService } from 'navigations/navigationService';
import { useStore } from 'store/movies';

interface MovieCardProps {
  id: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 120,
    height: 180
  },
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
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image style={styles.poster} source={source} />
    </TouchableOpacity>
  );
};

export default memo(MovieCard);
