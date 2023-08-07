import { NavigationGenerationConfig } from 'types/navigations';

import HomeScreen from 'screens/home';
import MovieDetailsScreen from 'screens/movieDetails';

import { screenNames } from 'constants/screenNames';
import stackRoutesGenerator from 'navigations/generator';

const stackConfig: NavigationGenerationConfig = {
  [screenNames.Home]: {
    component: HomeScreen
  },
  [screenNames.MovieDetails]: {
    component: MovieDetailsScreen
  }
};

export default stackRoutesGenerator(stackConfig);
