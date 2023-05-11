import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  mercytextStyle: {
    marginLeft: scale(10),
    fontSize: scale(20),
    color: "#FFFFFF",
    fontFamily: FONTS.PoppinsSemiBold,
  },
  dateTxt: {
    fontFamily: FONTS.PoppinsMedium,
    color: "#43686A",
    fontSize: scale(13),
    paddingLeft: scale(5),
  },
});
export default styles;
