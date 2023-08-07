import React from 'react';
import { render } from '@testing-library/react-native';

import { AppNavigator } from 'navigations';

it(`renders correctly`, async () => {
  const { findByText } = render(<AppNavigator />);
  const title = await findByText('Home');

  expect(title).toBeTruthy();
});
