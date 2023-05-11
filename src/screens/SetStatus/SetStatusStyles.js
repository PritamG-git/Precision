import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Scale, { moderateScale, verticalScale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  setStatus: {
    fontSize: scale(30),
    fontFamily: FONTS.PoppinsSemiBold,
    color: "#43686A",
  },
  availStatus: {
    fontSize: scale(16),
    color: '#738485',
    fontFamily: FONTS.PoppinsLight
  },
  select: {
    fontbackgroundImageSize: scale(15),
    fontFamily: FONTS.PoppinsLight
  },
  touchablesetstyle: {
    backgroundColor: "#05A1AB",

    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: '15%',
    padding: verticalScale(20),
    borderRadius: moderateScale(14),
    marginTop: verticalScale(30)
  }
});
