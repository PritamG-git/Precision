import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: scale(15), paddingVertical: scale(10) },
  sectionHeadTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(20),
    color: "white",
  },
});
