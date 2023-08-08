import NormMovies from 'store/norm/movies';
import MockedMovies from 'testutils/mockedMovies.json';
import { Movie } from 'types/movies';

const movies = MockedMovies.movies as Movie[];

describe('NormMovies', () => {
  beforeEach(() => {
    // Clear the NormMovies instance before each test
    // NormMovies.getData().allIds.forEach((id) => {
    //   NormMovies.remove(id);
    // });
  });

  it('inserts and retrieves a single movie', () => {
    const movie = { id: '1', title: 'Movie 1' };

    NormMovies.insert(movie, false);

    const data = NormMovies.getData();
    expect(data.allIds).toContain(movie.id);
    expect(data.byId[movie.id]).toEqual(movie);
  });

  it('inserts a list of movies', () => {
    NormMovies.insertList(movies, false);

    const data = NormMovies.getData();
    expect(data.allIds).toEqual(
      expect.arrayContaining(movies.map((movie) => movie.id))
    );
    movies.forEach((movie) => {
      expect(data.byId[movie.id]).toEqual(movie);
    });
  });

  it('inserts a movie with filtering', () => {
    const movie = { id: '1', title: 'Filtered Movie' };

    NormMovies.insert(movie, true);

    const data = NormMovies.getData();
    expect(data.filteredIds).toContain(movie.id);
  });

  it('inserts a list of movies with filtering', () => {
    NormMovies.insertList(movies, true);

    const data = NormMovies.getData();
    expect(data.filteredIds).toEqual(
      expect.arrayContaining(movies.map((movie) => movie.id))
    );
  });

  it('clears the filteredIds when inserting a list without filtering', () => {
    NormMovies.insertList(movies, true);
    NormMovies.insertList(movies, false);

    const data = NormMovies.getData();
    expect(data.filteredIds).toEqual([]);
  });
});
