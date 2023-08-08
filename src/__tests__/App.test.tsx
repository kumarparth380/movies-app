import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import axios from 'axios';

import { AppNavigator } from 'navigations';
import { useStore } from 'store/movies';
import mockedMovies from 'testutils/mockedMovies.json';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const originalStore = useStore.getState();
beforeEach(() => {
  useStore.setState(originalStore);
});

const renderApp = () => render(<AppNavigator />);

describe('Movies App', () => {
  it(`renders correctly`, async () => {
    const { findByTestId } = renderApp();
    const homeScreen = await findByTestId('HomeScreen');

    expect(homeScreen).toBeTruthy();
  });

  it(`renders empty home page`, async () => {
    mockedAxios.get.mockResolvedValue([]);

    const { findByTestId } = renderApp();
    const loadingBox = await findByTestId('loading-container');

    expect(loadingBox).toBeTruthy();

    const emptyBox = await findByTestId('empty-state-container');

    expect(emptyBox).toBeTruthy();
  });

  it('should show ErrorUI on failed GET request', async () => {
    mockedAxios.get.mockRejectedValue({ response: { status: 500 } });

    const { findByTestId } = renderApp();
    const loadingBox = await findByTestId('loading-container');
    expect(loadingBox).toBeTruthy();

    const errorUiContainer = await findByTestId('error-boundary-ui');

    expect(errorUiContainer).toBeTruthy();
  });

  it(`renders home page with movies`, async () => {
    mockedAxios.get.mockResolvedValue({ data: mockedMovies });

    const { queryByTestId, findAllByTestId } = renderApp();

    await waitFor(() => {
      expect(queryByTestId('loading-container')).toBeTruthy();
    });
    await waitFor(() => {
      expect(queryByTestId('loading-container')).toBeFalsy();
    });
    const movies = await findAllByTestId('The Dark Knight');

    expect(movies.length).toBe(3);
  });

  it(`clicking on movie card navigates to MovieDetails`, async () => {
    mockedAxios.get.mockResolvedValue({ data: mockedMovies });

    const { findAllByTestId, findByTestId } = renderApp();

    const movies = await findAllByTestId('The Dark Knight');

    fireEvent.press(movies[0]);

    const detailsPage = await findByTestId(
      'MovieDetailsScreen-The Dark Knight'
    );

    expect(detailsPage).toBeTruthy();
  });

  it(`opens movie details and marks favorite`, async () => {
    mockedAxios.get.mockResolvedValue({ data: mockedMovies });

    const { findAllByTestId, queryByTestId, findByTestId } = renderApp();

    const movies = await findAllByTestId('The Dark Knight');

    fireEvent.press(movies[0]);

    await findByTestId('MovieDetailsScreen-The Dark Knight');
    const inactiveFavoriteButton = await findByTestId('favorite-outline');
    fireEvent.press(inactiveFavoriteButton);

    expect(queryByTestId('favorite-outline')).toBeFalsy();
    expect(await findByTestId('favorite')).toBeTruthy();
  });
});
