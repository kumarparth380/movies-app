import { useEffect } from 'react';

import { useStore } from 'store/movies';

const useMovies = () => {
  const { movies, loading, error, fetchMovies } = useStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error };
};

export default useMovies;
