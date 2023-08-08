/* eslint-disable @typescript-eslint/no-misused-promises */
import { create } from 'zustand';

import { fetchMovies } from 'api/movies';
import { mergeArrays } from 'helpers';
import NormalizeMovies from 'store/norm/movies';
import { Genre, LoadingState, Movie, NormalizedMovies } from 'types/movies';

interface State {
  movies: NormalizedMovies;
  moviesLoadingState: LoadingState;
  favorites: Record<string, boolean>;
  searchedMovies: string[];
  searchLoadingState: LoadingState;

  toggleFavorites: (id: string) => void;
  fetchMovies: () => void;
  searchMoviesByTitle: (query: string) => void;
  getMoviesByGenre: () => Array<{ title: string; data: string[] }>;
  selectMovieById: (id: string) => Movie | undefined;
  selectIsFavoriteMovie: (id: string) => boolean;
}

const saveMovies = (state: State, movies: NormalizedMovies) => {
  const byId = { ...state.movies.byId, ...movies.byId };
  const allIds = mergeArrays(state.movies.allIds, movies.allIds);

  return {
    byId,
    allIds: [...new Set(allIds)]
  };
};

export const useStore = create<State>((set, get) => ({
  movies: { allIds: [], byId: {} },
  moviesLoadingState: LoadingState.unset,
  favorites: {},
  searchedMovies: [],
  searchLoadingState: LoadingState.unset,

  toggleFavorites: (id: string) => {
    set((state) => ({
      favorites: {
        ...state.favorites,
        [id]: !state?.favorites?.[id] || false
      }
    }));
  },

  fetchMovies: async () => {
    set({ moviesLoadingState: LoadingState.loading });
    try {
      const response = await fetchMovies();
      NormalizeMovies.insertList(response?.movies);
      const normalizedMovies = NormalizeMovies.getData();
      set({
        movies: normalizedMovies,
        moviesLoadingState: LoadingState.success
      });
    } catch (error) {
      set({ moviesLoadingState: LoadingState.failed });
    }
  },

  searchMoviesByTitle: async (query: string) => {
    set({ searchLoadingState: LoadingState.loading });
    try {
      const response = await fetchMovies(query);

      NormalizeMovies.insertList(response?.movies, true);
      const normalizedMovies = NormalizeMovies.getData();
      set({
        searchedMovies: normalizedMovies?.filteredIds || [],
        movies: saveMovies(get(), normalizedMovies),
        searchLoadingState: LoadingState.success
      });
    } catch (error) {
      set({ searchLoadingState: LoadingState.failed });
    }
  },

  selectMovieById: (id: string) => {
    const { movies } = get();
    return movies.allIds.includes(id) ? movies.byId?.[id] : undefined;
  },

  selectIsFavoriteMovie: (id: string) => get()?.favorites?.[id] || false,

  getMoviesByGenre: () => {
    const { movies } = get();
    const moviesIdsByGenre = Object.values(movies?.byId || {}).reduce(
      (acc: Genre, movie: Movie) => {
        movie.genres?.forEach((genreName) => {
          if (acc[genreName]) {
            acc[genreName].add(movie.id);
          } else {
            acc[genreName] = new Set([movie.id]);
          }

          return acc;
        });

        return acc;
      },
      {}
    );

    return Object.entries(moviesIdsByGenre).map(([title, ids]) => ({
      title,
      data: Array.from(ids)
    }));
  }
}));
