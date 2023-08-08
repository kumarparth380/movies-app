import { useEffect, useState } from 'react';

import { useDebounce } from 'hooks/useDebounce';
import { useStore } from 'store/movies';

const useMoviesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { searchedMovies, searchLoadingState, searchMoviesByTitle } =
    useStore();

  useEffect(() => {
    searchMoviesByTitle(debouncedSearchQuery);
  }, [searchMoviesByTitle, debouncedSearchQuery]);

  return {
    searchedMovies,
    searchLoadingState,
    searchQuery,
    setSearchQuery
  };
};

export default useMoviesSearch;
