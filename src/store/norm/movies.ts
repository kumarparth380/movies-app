import { Movie, MoviesById } from 'types/movies';

class NormMovies {
  private readonly allIds: Set<string>;
  private readonly filteredIds: Set<string>;
  private byId: MoviesById;
  constructor() {
    this.allIds = new Set();
    this.byId = {};
    this.filteredIds = new Set();
  }

  getData() {
    return {
      allIds: [...this.allIds],
      byId: this.byId,
      filteredIds: [...this.filteredIds]
    };
  }

  insert(movie: Movie, filter: boolean) {
    this.allIds.add(movie.id);
    this.byId[movie.id] = movie;
    if (filter) {
      this.filteredIds.add(movie.id);
    }
  }

  insertList(movies: Movie[], filter: boolean = false) {
    this.filteredIds.clear();
    movies.forEach((movie) => {
      this.insert(movie, filter);
    });
  }
}
const NormalizeMovies = new NormMovies();
export default NormalizeMovies;
