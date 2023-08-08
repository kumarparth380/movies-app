import { useEffect } from 'react';

import { useStore } from 'store/movies';

const useMovies = () => {
  const { moviesLoadingState, fetchMovies, getMoviesByGenre } = useStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { moviesLoadingState, moviesByGenre: getMoviesByGenre() };
};

export default useMovies;
