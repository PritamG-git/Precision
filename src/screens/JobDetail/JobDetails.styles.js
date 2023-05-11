import { StyleSheet } from "react-native";
import { ms, scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  mercytextStyle: {
    fontSize: scale(20),
    color: "#FFFFFF",
    fontFamily: FONTS.PoppinsSemiBold,
    marginLeft: scale(10),
  },
  contentContainer: {
    paddingHorizontal: scale(15),
    marginTop: ms(60),
  },
  dateTxt: {
    fontFamily: FONTS.PoppinsMedium,
    color: "#43686A",
    fontSize: scale(13),
    paddingLeft: scale(5),
  },
});
