import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  NavigationGenerationConfig,
  RootNavigatorProps
} from 'types/navigations';
import { RootStackParamList } from 'types/rootStackParamList';

/*
    Return the same instance always(closures)
    Else you'll get Maximum update depth errors
 */
const getRoutesList = (
  Stack: any,
  stackConfig: NavigationGenerationConfig
): any => {
  const routeLists = Object.keys(stackConfig).map((route: string) => {
    const { nested, navigator, component, initialParams } = stackConfig[route];
    if ((nested ?? false) && navigator != null) {
      return stackRoutesGenerator(navigator);
    }
    return (
      <Stack.Screen
        key={route}
        name={route}
        component={component}
        options={{ animationEnabled: false }}
        initialParams={initialParams}
      />
    );
  });
  return () => routeLists;
};

const stackRoutesGenerator = (stackConfig: NavigationGenerationConfig) => {
  const Stack = createStackNavigator<RootStackParamList>();
  const routesList = getRoutesList(Stack, stackConfig);
  // eslint-disable-next-line react/display-name
  return ({ initialRoute }: RootNavigatorProps) => {
    return (
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#fff'
          }
        }}
      >
        {routesList()}
      </Stack.Navigator>
    );
  };
};

export default stackRoutesGenerator;
