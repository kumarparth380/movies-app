export const generateRatingStars = (rating?: number) => {
  const stars: Array<'star' | 'star-o' | 'star-half-empty'> = [
    'star-o',
    'star-o',
    'star-o',
    'star-o',
    'star-o'
  ];
  const normalizedRating = rating ? rating / 2 : 0;

  for (let i = 0; i < Math.floor(normalizedRating); i++) {
    stars[i] = 'star';
  }

  if (normalizedRating - Math.floor(normalizedRating) > 0) {
    stars[Math.floor(normalizedRating)] = 'star-half-empty';
  }

  return stars.map((name, index) => ({ name, id: index }));
};

export const keyExtractor = (id: string) => id;

export const genresKeyExtractor = (item: { title: string }) => item.title;

// merge N arrays into a single array with no duplicates
export function mergeArrays<T>(...arrays: Array<T[] | undefined>): T[] {
  let jointArray: T[] = [];

  arrays.forEach((array) => {
    if (array) {
      jointArray = [...jointArray, ...array];
    }
  });

  const uniqueArray: T[] = jointArray.filter(
    (item, index) => jointArray.indexOf(item) === index
  );

  return uniqueArray;
}
