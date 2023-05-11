import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions, Image } from "react-native";
import { scale } from "react-native-size-matters";
import CustomDrawer from "../components/CustomDrawer";
import { NAVIGATION } from "../constants";
import { HomeNavigator } from "./HomeNavigator";
const drawer = createDrawerNavigator();

export function AppNavigator() {
  return (
    <drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        headerTitleAlign: "center",
        drawerStyle: {
          backgroundColor: "transparent",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          // marginLeft: scale(-10),
        },
        drawerType: "front",
        // drawerStatusBarAnimation: "slide",
        // drawerHideStatusBarOnOpen: true,
      })}
    >
      <drawer.Screen
        name={NAVIGATION.home}
        component={HomeNavigator}
      />
    </drawer.Navigator>
  );
}
