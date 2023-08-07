import React from 'react';
import { Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { screenNames } from 'constants/screenNames';

import SearchScreen from 'screens/search';

import HomeStack from './home';

const BottomTabNavigator = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <BottomTabNavigator.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabNavigator.Screen
        name={screenNames.HomeStack}
        component={HomeStack}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>{screenNames.Home}</Text>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name="home"
              color={color}
            />
          )
        }}
      />
      <BottomTabNavigator.Screen
        name={screenNames.Search}
        component={SearchScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>{screenNames.Search}</Text>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name="search"
              color={color}
            />
          )
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomTabs;
