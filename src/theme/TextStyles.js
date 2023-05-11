import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../theme/fonts";
export const TextStyles = StyleSheet.create({
  title: {
    fontSize: scale(30),
    fontFamily: FONTS.PoppinsSemiBold,
    color: "#43686A",
  },
  light: {
    color: "#738485",
    fontSize: scale(14.5),
    fontFamily: FONTS.PoppinsLight,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: FONTS.PoppinsRegular,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: FONTS.PoppinsRegular,
  },
  error: {
    fontSize: 14,
    fontWeight: "400",
  },
});
