import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import NewsScreen from '../Screens/main/NewsScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={'NewsScreen'} component={NewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
