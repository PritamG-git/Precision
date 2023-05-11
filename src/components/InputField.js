import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { FONTS } from "../theme/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { scale } from "react-native-size-matters";

export function InputField({
  mainViewStyle,
  inputViewStyle,
  textInputStyle,
  title,
  icon,
  color,
  right,
  props,
  placeholderColor,
  placeholder,
  iconSize,
  urii,
  value,
  uri,
  onChangeText,
  ...rest
}) {
  const [isActive, setActive] = useState(false);
  return (
    <View style={[styles.mainViewStyle, mainViewStyle]}>
      <Text
        style={{
          color: "#43686A",
          fontFamily: FONTS.PoppinsRegular,
          fontSize: scale(12),
        }}
      >
        {title}
      </Text>
      <View style={[styles.inputViewStyle, inputViewStyle]}>
        {right && <Image source={isActive ? uri : urii} />}
        <Icon
          name={icon}
          size={iconSize ? iconSize : scale(24)}
          color={isActive ? "#05A1AB" : "#93AFB1"}
        />
        <TextInput
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => setActive(false)}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={[styles.textInputStyle, textInputStyle]}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: "#EBF0F1",
    height: scale(65),
    width: scale(335),
    paddingVertical: scale(5),
    paddingHorizontal: scale(15),
    borderRadius: scale(15),
    justifyContent: "center",
    marginVertical: scale(20),
  },
  inputViewStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInputStyle: {
    fontSize: scale(16),
    color: "#05A1AB",
    fontFamily: FONTS.PoppinsLight,
    paddingVertical: 0,
    width: "90%",
    marginLeft: scale(3),
  },
});
