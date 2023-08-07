import { useEffect, useState } from 'react';

import { useStore } from 'store/movies';

const useMoviesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchedMovies, searchLoading, searchError, searchMoviesByTitle } =
    useStore();

  useEffect(() => {
    searchMoviesByTitle(searchQuery);
  }, [searchMoviesByTitle, searchQuery]);

  return {
    searchedMovies,
    searchLoading,
    searchError,
    searchQuery,
    setSearchQuery
  };
};

export default useMoviesSearch;
