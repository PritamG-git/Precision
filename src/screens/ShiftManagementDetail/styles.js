import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: scale(15), paddingVertical: scale(10)
  },
  shiftTextStyles: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(19),
    color: "white",
  },
  dateTimeTxt: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTimeTxt2: {
    paddingHorizontal: scale(5),
    color: "#43686A",
    fontFamily: FONTS.PoppinsMedium,
    fontSize: scale(13),
    textAlign: "center",
    marginTop: scale(3),
  },
});
