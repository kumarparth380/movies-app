import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { useStore } from 'store/movies';
import { getMockMovie } from 'testutils/mockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Movies Store', () => {
  // Helper function to reset the store before each test
  const resetStore = () => {
    useStore.setState({ movies: { allIds: [], byId: {} }, favorites: {} });
  };

  // Cleanup and reset the store after each test
  afterEach(() => {
    jest.clearAllMocks();
    resetStore();
  });

  it('should fetch and store movies', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { movies: [getMockMovie()] }
    });

    // Arrange
    const { result, waitForNextUpdate } = renderHook(() => useStore());

    // Act
    result.current.fetchMovies();

    // Assert
    expect(result.current.moviesLoadingState).toBe('loading');
    await waitForNextUpdate();
    expect(result.current.moviesLoadingState).toBe('success');

    expect(result.current.movies.allIds).toStrictEqual([getMockMovie()?.id]);
    expect(result.current.searchedMovies).toEqual([]);
  });

  it('should toggle favorite status', () => {
    // Arrange
    const { result } = renderHook(() => useStore());

    // Act
    result.current.toggleFavorites('movie_id_1');
    result.current.toggleFavorites('movie_id_2');

    // Assert
    expect(result.current.favorites).toEqual({
      movie_id_1: true,
      movie_id_2: true
    });

    // Toggle again
    result.current.toggleFavorites('movie_id_1');

    // Assert
    expect(result.current.favorites).toEqual({
      movie_id_1: false,
      movie_id_2: true
    });
  });

  it('should get movies by genre', () => {
    const { result } = renderHook(() => useStore());

    result.current.fetchMovies();

    const moviesByGenre = result.current.getMoviesByGenre();
    expect(moviesByGenre).toEqual([]);
  });

  it('should select movie by id', () => {
    const { result } = renderHook(() => useStore());
    result.current.fetchMovies();

    const movie = result.current.selectMovieById('movie_id_1');
    const nonExistentMovie = result.current.selectMovieById('non_existent_id');

    expect(movie).toBeUndefined();
    expect(nonExistentMovie).toBeUndefined();
  });

  it('should select favorite movie status', () => {
    const { result } = renderHook(() => useStore());
    result.current.fetchMovies();

    const isFavorite = result.current.selectIsFavoriteMovie('movie_id_1');
    const nonExistentFavorite =
      result.current.selectIsFavoriteMovie('non_existent_id');

    expect(isFavorite).toBe(false);
    expect(nonExistentFavorite).toBe(false);

    // Toggle favorite status
    result.current.toggleFavorites('movie_id_1');

    const newIsFavorite = result.current.selectIsFavoriteMovie('movie_id_1');

    expect(newIsFavorite).toBe(true);
  });
});
