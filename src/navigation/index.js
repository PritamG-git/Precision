import { HttpClient } from '@/controllers';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
import { AppNavigator } from '../navigation/AppNavigator';
import { AuthNavigator } from '../navigation/AuthNavigator';
import { getUser } from '../selectors/UserSelectors';
import { navigationRef } from './NavigationRef';

export function RootNavigator() {
  const user = useSelector(getUser);

  useEffect(() => {
    SplashScreen.hide();
    if (user?.userinfo) {
      HttpClient.setAuthorization(user?.userinfo?.token);
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {user?.userinfo ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
