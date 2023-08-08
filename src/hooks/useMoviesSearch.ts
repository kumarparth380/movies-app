import { useEffect, useState } from 'react';

import { useStore } from 'store/movies';

const useMoviesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchedMovies, searchLoadingState, searchMoviesByTitle } =
    useStore();

  useEffect(() => {
    searchMoviesByTitle(searchQuery);
  }, [searchMoviesByTitle, searchQuery]);

  return {
    searchedMovies,
    searchLoadingState,
    searchQuery,
    setSearchQuery
  };
};

export default useMoviesSearch;
