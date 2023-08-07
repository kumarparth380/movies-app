import NormMovies from 'store/norm/movies';

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
    const movies = [
      { id: '1', title: 'Movie 1' },
      { id: '2', title: 'Movie 2' },
      { id: '3', title: 'Movie 3' }
    ];

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
    const movies = [
      { id: '1', title: 'Filtered Movie 1' },
      { id: '2', title: 'Filtered Movie 2' },
      { id: '3', title: 'Filtered Movie 3' }
    ];

    NormMovies.insertList(movies, true);

    const data = NormMovies.getData();
    expect(data.filteredIds).toEqual(
      expect.arrayContaining(movies.map((movie) => movie.id))
    );
  });

  it('clears the filteredIds when inserting a list without filtering', () => {
    const movies = [
      { id: '1', title: 'Filtered Movie 1' },
      { id: '2', title: 'Filtered Movie 2' },
      { id: '3', title: 'Filtered Movie 3' }
    ];

    NormMovies.insertList(movies, true);
    NormMovies.insertList(movies, false);

    const data = NormMovies.getData();
    expect(data.filteredIds).toEqual([]);
  });
});
