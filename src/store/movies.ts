/* eslint-disable @typescript-eslint/no-misused-promises */
import { create } from 'zustand';

import { fetchMovies } from 'api/movies';
import { Movie } from 'types/movies';

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
}

export const useStore = create<State>((set) => ({
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
  }
}));
