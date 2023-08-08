import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppNavigator } from 'navigations';

import ErrorBoundary from 'components/errorBoundary';

import { bootstrap } from './src/bootstrap';

void (async () => {
  await bootstrap.init();
})();

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar />
        <AppNavigator />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
