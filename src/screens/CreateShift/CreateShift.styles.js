import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors/colors";
import { verticalScale, moderateScale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(15),
  },
  headingTxt: {
    color: COLOR.HeadingColor,
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(20),
  },
  TxtInput: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    borderRadius: scale(15),
    alignItems: "flex-start",
    backgroundColor: "#EBF0F1",
    marginVertical: scale(5),
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
    paddingHorizontal: scale(5),
  },
  addedTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(16),
    color: COLOR.HeadingColor,
    marginTop: scale(15),
    marginBottom: scale(5)
  },
  listView: {
    flexDirection: "row",
    alignItems: "center",
    margin: scale(5),
  },
  textInputStyle: {
    fontFamily: FONTS.PoppinsLight,
    fontSize: scale(16),
    color: COLOR.AppColor,
    paddingVertical: 0,
    alignSelf: "flex-start",
    width: "100%",
    height: scale(150),
  },
  bottomBtn: {
    alignSelf: "center",
    marginVertical: scale(10),
  },

  iconView: {
    backgroundColor: "#F6FEFF",
    flex: 2,
    marginLeft: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },

  addSkillBtn: {
    backgroundColor: "white",
    borderColor: COLOR.AppColor,
    borderWidth: 1,
    height: verticalScale(58),
    width: "90%",
    marginTop: 20,
  },

  listTxt: {
    paddingHorizontal: scale(10),
    fontSize: 14,
    color: COLOR.HeadingColor,
    fontFamily: FONTS.PoppinsRegular,
  },

  modalView: {
    flex: 1,
    backgroundColor: "#000000aa",
    padding: 20,
    justifyContent: "center",
  },
  modalInnerView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: verticalScale(20),
    paddingVertical: verticalScale(20),
  },
  modalTitleTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    color: "#43686A",
    fontSize: 20,
  },
  modalContentView: {
    paddingRight: verticalScale(30),
    borderBottomWidth: 2,
    borderBottomColor: "#EBF0F1",
    paddingVertical: verticalScale(0),
  },
  desTxt: {
    color: "#738485",
    paddingVertical: verticalScale(10),
    fontSize: 14,
  },
  shiftTxt: {
    fontFamily: FONTS.PoppinsMedium,
    fontSize: 14,
    color: "#43686A",
  },
  okayView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(15),
  },
  okayTxt: {
    fontFamily: FONTS.PoppinsMedium,
    color: "#05A1AB",
    fontSize: 16,
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
  desTxt: {
    fontFamily: FONTS.PoppinsLight,
    paddingVertical: 20,
    color: "#738485",
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
  backStyle: {
    paddingHorizontal: moderateScale(10),
  },
});
