import React, { useState } from "react";
import { View, Text, ImageBackground, StatusBar } from "react-native";
import { scale, verticalScale } from "../../helper/Scale";
import { TextStyles } from "../../theme/TextStyles";
import Swiper from "react-native-swiper";
import Start from "../Start/start";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export function Intro({ navigation }) {
  const [isScrollingOff, setIsScrollingOff] = useState(true);
  const [isFirst, setIsFirst] = useState(false);

  const Slide = ({ img, title, text }) => {
    return (
      <ImageBackground
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          width: "100%",
          height: "100%",
        }}
        source={img}
        resizeMode="cover"
      >
        <View
          style={{
            paddingVertical: verticalScale(50),
            paddingHorizontal: scale(20),
          }}
        >
          <Text style={[TextStyles.title, { color: "#43686A" }]}>{title}</Text>
          <Text style={[TextStyles.light, { color: "#738485" }]}>{text}</Text>
        </View>
      </ImageBackground>
    );
  };

  const checkFirst = async () => {
    let first = await AsyncStorage.getItem("FirstLoad");
    if (!first) {
      setIsFirst(true);
      await AsyncStorage.setItem("FirstLoad", "1");
    } else {
      setIsFirst(false);
    }
  };

  useEffect(() => {
    checkFirst();
  }, []);

  return (
    <>
      <Swiper
        onIndexChanged={(index) => {
          if (index == 2) {
            setIsScrollingOff(false);
          }
        }}
        scrollEnabled={isScrollingOff}
        loop={false}
        showsPagination={false}
        showsButtons={false}
        index={isFirst ? 0 : 2}
      >
        <>
          <Slide
            img={require("../../assets/Intro/int1.png")}
            title={"Find Jobs"}
            text={"Have a dream job?\nGo for it now!"}
          />
        </>
        <>
          <Slide
            img={require("../../assets/Intro/int2.png")}
            title={"Apply Jobs"}
            text={
              "Select an specialist and make your job done according to your need."
            }
          />
        </>
        <>
          <Start />
        </>
      </Swiper>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
    </>
  );
}

export default Intro;
