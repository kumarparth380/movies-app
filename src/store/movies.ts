/* eslint-disable @typescript-eslint/no-misused-promises */
import { create } from 'zustand';

import { fetchMovies } from 'api/movies';
import { Genre, Movie } from 'types/movies';

interface State {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  favorites: number[];
  searchedMovies: Movie[];
  searchLoading: boolean;
  searchError: string | null;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  fetchMovies: () => void;
  searchMoviesByTitle: (query: string) => void;
  getMoviesByGenre: () => Array<{ title: string; data: string[] }>;
  selectMovieById: (id: string) => Movie | undefined;
}

export const useStore = create<State>((set, get) => ({
  movies: [],
  loading: false,
  error: null,
  favorites: [],
  searchedMovies: [],
  searchLoading: false,
  searchError: null,

  addFavorite: (id: number) => {
    set((state) => ({ favorites: [...state.favorites, id] }));
  },
  removeFavorite: (id: number) => {
    set((state) => ({
      favorites: state.favorites.filter((bId) => bId !== id)
    }));
  },

  fetchMovies: async () => {
    set({ loading: true });
    try {
      const response = await fetchMovies();
      set({ movies: response?.movies, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'Error fetching movies.' });
    }
  },

  searchMoviesByTitle: async (query: string) => {
    set({ searchLoading: true });
    try {
      const response = await fetchMovies(query);

      set({
        searchedMovies: response?.movies,
        searchLoading: false,
        searchError: null
      });
    } catch (error) {
      set({ searchLoading: false, searchError: 'Error searching movies.' });
    }
  },
  selectMovieById: (id: string) => {
    const { movies } = get();
    return movies.find((movie) => movie.id === id);
  },
  getMoviesByGenre: () => {
    const { movies } = get();
    const moviesIdsByGenre = movies.reduce((acc: Genre, movie: Movie) => {
      movie.genres?.forEach((genreName) => {
        if (acc[genreName]) {
          acc[genreName].add(movie.id);
        } else {
          acc[genreName] = new Set([movie.id]);
        }

        return acc;
      });

      return acc;
    }, {});

    return Object.entries(moviesIdsByGenre).map(([title, ids]) => ({
      title,
      data: Array.from(ids)
    }));
  }
}));
