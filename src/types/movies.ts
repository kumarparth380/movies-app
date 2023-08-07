export interface Movie {
  backdrop?: string;
  cast?: string[];
  classification?: string;
  director?: string;
  genres?: string[];
  id: string;
  imdb_rating?: number;
  length?: string;
  overview?: string;
  poster?: string;
  released_on?: string;
  slug?: string;
  title?: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface Genre {
  [name: string]: Set<string>;
}

export interface Section {
  title: string;
  data: string[];
}
