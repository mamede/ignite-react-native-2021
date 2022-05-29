import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SplashRoutes } from './splash.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export function Routes(){
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <SplashRoutes />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}