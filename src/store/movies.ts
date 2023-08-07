/* eslint-disable @typescript-eslint/no-misused-promises */
import { create } from 'zustand';

import { fetchMovies } from 'api/movies';
import { mergeArrays } from 'helpers';
import NormalizeMovies from 'store/norm/movies';
import { Genre, Movie, NormalizedMovies } from 'types/movies';

interface State {
  movies: NormalizedMovies;
  loading: boolean;
  error: string | null;
  favorites: number[];
  searchedMovies: string[];
  searchLoading: boolean;
  searchError: string | null;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  fetchMovies: () => void;
  searchMoviesByTitle: (query: string) => void;
  getMoviesByGenre: () => Array<{ title: string; data: string[] }>;
  selectMovieById: (id: string) => Movie | undefined;
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
      NormalizeMovies.insertList(response?.movies);
      const normalizedMovies = NormalizeMovies.getData();
      set({ movies: normalizedMovies, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'Error fetching movies.' });
    }
  },

  searchMoviesByTitle: async (query: string) => {
    set({ searchLoading: true });
    try {
      const response = await fetchMovies(query);

      NormalizeMovies.insertList(response?.movies, true);
      const normalizedMovies = NormalizeMovies.getData();
      set({
        searchedMovies: normalizedMovies?.filteredIds || [],
        movies: saveMovies(get(), normalizedMovies),
        searchLoading: false,
        searchError: null
      });
    } catch (error) {
      set({ searchLoading: false, searchError: 'Error searching movies.' });
    }
  },
  selectMovieById: (id: string) => {
    const { movies } = get();
    return movies.allIds.includes(id) ? movies.byId[id] : undefined;
  },
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
