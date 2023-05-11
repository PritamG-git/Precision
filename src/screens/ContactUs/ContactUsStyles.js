import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors/colors";
import Scale, { moderateScale, verticalScale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: scale(15),
  },
  desTxt: {
    color: "#738485",
    fontFamily: FONTS.PoppinsLight,
    fontSize: scale(16)
  },
  headTxt: {
    color: "#43686A",
    fontSize: scale(20),
    fontFamily: FONTS.PoppinsSemiBold,
  },
  listItemView: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  listTitleTxt: {
    paddingHorizontal: 5,
    fontFamily: FONTS.PoppinsLight,
    color: "#93AFB1",
  },
  termsView: {
    flexDirection: "row",
    padding: verticalScale(10),
    alignSelf: "center",
    alignItems: "flex-start",
  },
  termsHighlightTxt: {
    color: COLOR.AppColor,
    fontFamily: FONTS.PoppinsMedium,
  },
  termsTxt: {
    fontFamily: FONTS.PoppinsLight,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  picView: {
    width: verticalScale(90),
    height: verticalScale(90),
    backgroundColor: "#EBF0F1",
    // backgroundColor: 'red',
    alignSelf: "center",

    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  submitButton: {
    marginTop: 30,
  },
  Title: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontStyle: "normal",
    fontSize: Scale.moderateScale(32),
    color: "#000000",
    fontWeight: "600",
  },
  TitleDis: {
    fontFamily: FONTS.PoppinsRegular,
    paddingTop: 10,
    fontSize: Scale.moderateScale(14),
    color: "#615B5B",
    fontWeight: "400",
  },
  textTitle: {
    fontFamily: FONTS.PoppinsRegular,
    paddingTop: 10,
    fontSize: Scale.moderateScale(14),
    color: "#313131",
    fontWeight: "400",
  },
  bottomView: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: verticalScale(30),
  },
});
