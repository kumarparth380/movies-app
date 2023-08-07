import { render, screen } from '@testing-library/react-native';

import App from '../App';

it('renders App', () => {
  render(<App />);
  expect(
    screen.getByText('Open up App.js to start working on your app!')
  ).toBeTruthy();
});
