import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { screenNames } from 'constants/screenNames';
import BottomTabs from 'navigations/bottomTabs';
import { navigationService } from 'navigations/navigationService';
import { RootStackParamList } from 'types/rootStackParamList';

const RootStack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const setNavRef = (ref: NavigationContainerRef<any> | null) => {
    navigationService.setRef(ref);
  };
  return (
    <NavigationContainer ref={setNavRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={screenNames.BottomTab} component={BottomTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
