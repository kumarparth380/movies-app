import React from 'react';
import { render } from '@testing-library/react-native';

import { AppNavigator } from 'navigations';
import { useStore } from 'store/movies';

const originalStore = useStore.getState();
beforeEach(() => {
  useStore.setState(originalStore);
});
// jest.mock('store/movies', () => ({
//   useStore: () => ({
//     favorites: [],
//     movies: []
//   })
// }));

it(`renders correctly`, async () => {
  const { findByText } = render(<AppNavigator />);
  const title = await findByText('Home');

  expect(title).toBeTruthy();
});
