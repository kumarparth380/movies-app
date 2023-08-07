import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from 'types/rootStackParamList';

import { screenNames } from 'constants/screenNames';
import BottomTabs from 'navigations/bottomTabs';

const RootStack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={screenNames.BottomTab} component={BottomTabs} />
    </RootStack.Navigator>
  </NavigationContainer>
);
