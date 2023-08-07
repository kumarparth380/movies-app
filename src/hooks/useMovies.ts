import { useEffect } from 'react';

import { useStore } from 'store/movies';

const useMovies = () => {
  const { loading, error, fetchMovies, getMoviesByGenre } = useStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { loading, error, moviesByGenre: getMoviesByGenre() };
};

export default useMovies;
