import { by, element, expect } from 'detox';

beforeAll(async () => {
  await device.launchApp({ newInstance: true });

  await device.openURL({
    url: `exp+wookie-movies-app-qxzotb://expo-development-client/?url=${encodeURIComponent(
      `http://localhost:8081`
    )}`
  });
});

beforeEach(async () => {
  await device.reloadReactNative();
});

describe('Basic app flow', () => {
  it('should have home screen', async () => {
    await expect(element(by.id('HomeScreen'))).toBeVisible();
  });

  it('shows app with bottom nav', async () => {
    await expect(element(by.text('Home'))).toBeVisible();
    await expect(element(by.text('Search'))).toBeVisible();
  });

  it('shows list of movies', async () => {
    await expect(element(by.text('Action'))).toBeVisible();
    await expect(element(by.text('Crime'))).toBeVisible();
  });

  it('navigate and search movies', async () => {
    await element(by.text('Search')).tap();

    await element(by.type('RCTUITextField')).typeText('pp');
    await expect(element(by.text('No result found!'))).toBeVisible();
  });
});
