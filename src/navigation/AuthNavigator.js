import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from "../constants";
import { Approval } from "../screens/Approval/Approval";
import { CreateAccount } from "../screens/CreateAccount/CreateAccount";
import Intro from "../screens/Intro/intro";
import { Login } from "../screens/Login/Login";
import { OTP } from "../screens/OTP/otp";
import Start from "../screens/Start/start";
import { UploadCert } from "../screens/UploadCert/UploadCert";
import { AppNavigator } from "./AppNavigator";
import Terms from "../screens/Terms/Terms";
import Privacy from "../screens/Privacy/Privacy";
import EditUserDetail from "../screens/EditUserDetail/EditUserDetail";

const Stack = createStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen
        component={Intro}
        name={NAVIGATION.intro}
      />
      <Stack.Screen
        component={Start}
        name={NAVIGATION.start}
      />
      <Stack.Screen
        component={UploadCert}
        name={NAVIGATION.uploadcert}
      />
      <Stack.Screen
        name={NAVIGATION.EditUserDetail}
        component={EditUserDetail}
      />
      <Stack.Screen
        component={CreateAccount}
        name={NAVIGATION.createaccount}
      />
      <Stack.Screen
        component={OTP}
        name={NAVIGATION.otp}
      />
      <Stack.Screen
        component={Login}
        name={NAVIGATION.login}
      />
      <Stack.Screen
        name={NAVIGATION.home}
        component={AppNavigator}
      />
      <Stack.Screen
        name={NAVIGATION.Terms}
        component={Terms}
      />
      <Stack.Screen
        name={NAVIGATION.Privacy}
        component={Privacy}
      />
    </Stack.Navigator>
  );
}
