import { ShadowStyles } from "@/theme";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors/colors";
import { verticalScale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
    backgroundColor: "white",
  },
  TxtInput: {
    padding: scale(15),
    borderRadius: scale(15),
    alignItems: "flex-start",
    backgroundColor: "#EBF0F1",
    marginVertical: scale(10),
  },
  addTxt: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: scale(12),
    color: COLOR.HeadingColor,
  },
  chooseTxt: {
    fontFamily: FONTS.PoppinsLight,
    color: "#93AFB1",
    fontSize: scale(16),
  },
  errorTxt: {
    fontSize: scale(12),
    color: "#FF4040",
    fontFamily: FONTS.PoppinsLight,
  },
  addSkillBtn: {
    backgroundColor: "white",
    borderColor: COLOR.AppColor,
    borderWidth: scale(1),
    marginTop: scale(20),
  },
  addedTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(16),
    color: COLOR.HeadingColor,
    margin: scale(5)
  },
  bottomBtn: {
    alignSelf: "center",
    padding: scale(15)
  },
  listView: {
    ...ShadowStyles.shadow,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: scale(12),
    marginVertical: scale(8),
    marginHorizontal: scale(3),
    borderRadius: scale(10),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(10),
  },
  iconView: {
    borderRadius: scale(8),
    backgroundColor: "#EBF0F1",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(5),
  },




  textInputStyle: {
    fontFamily: FONTS.PoppinsLight,
    fontSize: 16,
    color: COLOR.AppColor,
    paddingVertical: 0,
    alignSelf: "flex-start",
    height: verticalScale(60),
  },
  listTxt: {
    paddingHorizontal: scale(10),
    fontSize: 14,
    color: COLOR.HeadingColor,
    fontFamily: FONTS.PoppinsRegular,
  },



  nameTxt: {
    fontFamily: FONTS.PoppinsMedium,
    color: COLOR.HeadingColor,
    fontSize: 16,
  },
  postTxt: { color: COLOR.AppColor, fontFamily: FONTS.props },
  emailTxt: {
    marginTop: verticalScale(10),
    fontFamily: FONTS.PoppinsLight,
    color: "#93AFB1",
  },
  waitTxt: {
    color: "#43686A",
    fontFamily: FONTS.PoppinsLight,
    paddingHorizontal: 5,
  },
  bottomView: { alignSelf: "center", paddingVertical: verticalScale(30) },
  loginTxt: {
    color: "#05A1AB",
    fontFamily: FONTS.PoppinsMedium,
    fontSize: 18,
  },
});
