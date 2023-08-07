import { screenNames } from 'constants/screenNames';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  [screenNames.Home]: undefined;
  [screenNames.MovieDetails]: { id: string };
  [screenNames.Search]: undefined;
  [screenNames.BottomTab]: undefined;
};
