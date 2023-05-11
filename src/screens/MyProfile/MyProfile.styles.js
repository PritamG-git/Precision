import { ShadowStyles } from "@/theme";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  backImage: {
    position: "absolute",
    width: scale(350),
    height: scale(340),
  },

  MyprofileText: {
    fontSize: scale(19),
    color: "#FFFFFF",
    fontFamily: FONTS.PoppinsSemiBold,
  },
  setstatusStyle: {
    color: "#FFFFFF",
    fontSize: scale(14),
    fontFamily: FONTS.PoppinsRegular,
    textDecorationLine: 'underline'
  },
  RadiologyStyle: {
    fontSize: scale(11),
    color: "#FFFFFF",
    fontFamily: FONTS.PoppinsRegular,
    marginTop: scale(3)
  },
  gmailStyle: {
    fontSize: scale(11),
    color: "#FFFFFF",
    fontFamily: FONTS.PoppinsRegular,
    marginTop: scale(5)
  },
  adressStyle: {
    fontSize: scale(16),
    color: "#43686A",
    fontFamily: FONTS.PoppinsRegular,
    marginLeft: scale(5),
  },
  overViewStyle: {
    fontSize: scale(16),
    color: "#43686A",
    fontFamily: FONTS.PoppinsSemiBold,
    marginTop: scale(8),
    marginHorizontal: scale(15)
  },
  boxStyle: {
    ...ShadowStyles.shadow,
    backgroundColor: "#FFFFFF",
    padding: scale(13),
    borderRadius: scale(15),
    width: scale(130),
    height: scale(130),
  },
  countStyle: {
    fontSize: scale(17),
    fontFamily: FONTS.PoppinsMedium,
    color: "#43686A",
    marginTop: scale(15),
  },
  textStyleBox: {
    fontSize: scale(9),
    color: "#93AFB1",
    fontFamily: FONTS.PoppinsLight,
  }
});
