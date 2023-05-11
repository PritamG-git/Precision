import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FONTS } from "../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../constants";
import { logout } from "../actions/UserActions";
import { scale, verticalScale } from "react-native-size-matters";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const logoutUser = () => {
    Alert.alert("", "Are you sure you want to logout?", [
      //   { text: 'OK', onPress: () => dispatch(logout()) },
      { text: "OK", onPress: () => dispatch(logout()) },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };
  return (
    <ImageBackground
      resizeMode="stretch"
      source={require("../assets/Drawer/drawergraphics.png")}
      style={{
        marginTop:
          Platform.OS == "android" ? StatusBar.currentHeight : verticalScale(25),
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width / 1.2,
        padding: scale(18),
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("CreateShift");
        }}
      >
        <Image
          resizeMode="stretch"
          style={{ alignSelf: "center", width: scale(280), height: scale(220) }}
          source={require("../assets/Drawer/createShift.png")}
        />
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={{
          alignSelf: "center",
          left: scale(-10)
        }}
        data={[
          { title: "Home", icon: "home", Screen: NAVIGATION.mainHome },
          {
            title: "My Jobs",
            icon: "briefcase-variant",
            Screen: NAVIGATION.MyJobs,
          },
          {
            title: "My Profile",
            icon: "user",
            Screen: NAVIGATION.MyProfile,
          },
          {
            title: "Settings",
            icon: "cog",
            Screen: NAVIGATION.Settings,
          },
        ]}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedIndex(index);
              navigation.navigate(item.Screen);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#37B4BC",
                alignItems: "center",
                width: scale(32),
                borderTopLeftRadius: index == 0 ? scale(8) : 0,
                borderTopRightRadius: index == 0 ? scale(8) : 0,
                borderBottomLeftRadius: index == 3 ? scale(8) : 0,
                borderBottomRightRadius: index == 3 ? scale(8) : 0,
                paddingVertical: verticalScale(15),
              }}
            >
              <View
                style={{
                  padding: scale(2),
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    index == selectedIndex ? "white" : "transparent",
                  borderRadius: scale(4),
                }}
              >
                {item.icon === "cog" ? (
                  <Entypo
                    name={item.icon}
                    size={scale(20)}
                    color={index == selectedIndex ? "#05A1AB" : "white"}
                  />
                ) : item.icon === "user" ? (
                  <FontAwesome
                    name={item.icon}
                    size={scale(20)}
                    color={index == selectedIndex ? "#05A1AB" : "white"}
                  />
                ) : <Icon
                  name={item.icon}
                  size={scale(20)}
                  color={index == selectedIndex ? "#05A1AB" : "white"}
                />}
              </View>
            </View>

            <Text
              style={{
                fontFamily:
                  index == selectedIndex
                    ? FONTS.PoppinsSemiBold
                    : FONTS.PoppinsLight,
                fontSize: scale(18),
                color: "#FFFFFF",
                paddingLeft: scale(18),
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => logoutUser()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          bottom: Platform.OS == "android" ? scale(40) : scale(30),
          right: Platform.OS == "android" ? scale(40) : scale(30),
        }}
      >
        <Image
          resizeMode="contain"
          style={{ width: scale(20), height: scale(17) }}
          source={require("../assets/Home/signoutoption.png")}
        />
        <Text
          style={{
            fontFamily: FONTS.PoppinsLight,
            color: "white",
            fontSize: scale(18),
            paddingLeft: scale(10),
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default CustomDrawer;
