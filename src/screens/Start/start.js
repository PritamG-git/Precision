import React from "react";
import {
  StatusBar,
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TextStyles } from "../../theme/TextStyles";
import styles from "./Start.styles";
import { navigate } from "../../navigation/NavigationRef";
import { NAVIGATION } from "../../constants";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Start({ navigation }) {

  return (
    <ImageBackground
      style={styles.mainContainer}
      resizeMode="cover"
      source={require("../../assets/start/start.png")}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Image source={require("../../assets/splash/Logo.png")} style={{ width: scale(206), height: scale(100) }} resizeMode="center" />
      <View style={styles.innerView}>
        <Text style={[TextStyles.title, styles.textTitle]}>Get Started</Text>
        <Text style={[TextStyles.light, styles.textDes]}>
          Request For Your Specific Requirement. Select an specialist and make
          your job done according to your need.
        </Text>
        <View style={styles.btnContainer}>
          <LinearGradient
            colors={["#2CC7D1", "#05A1AB", "#2CC7D1"]}
            style={[styles.loginBtn, styles.createBtn]}
          >
            <TouchableOpacity
              onPress={() => navigate(NAVIGATION.createaccount)}
              style={[styles.loginBtn, styles.createBtn]}
            >
              <Text style={[styles.loginTxt, { color: "white" }]}>
                Create
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <Pressable
            onPress={() => navigate(NAVIGATION.login)}
            style={styles.loginBtn}
          >
            <Text style={styles.loginTxt}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
export default Start;
