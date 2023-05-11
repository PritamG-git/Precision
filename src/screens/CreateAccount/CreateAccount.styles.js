import { StatusBar, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors/colors";
import Scale, { verticalScale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(15),
    paddingTop: scale(30),
  },
  headTxt: {
    color: "#43686A",
    fontSize: scale(30),
    fontFamily: FONTS.PoppinsSemiBold,
    marginBottom: scale(5),
  },
  desTxt: {
    color: "#738485",
    fontFamily: FONTS.PoppinsLight,
    fontSize: scale(14),
  },
  picView: {
    marginTop: scale(25),
    alignSelf: "center",
  },
  placeNameTextStyle: {
    color: "#43686A",
    fontSize: scale(12),
    fontFamily: FONTS.PoppinsRegular,
    marginLeft: scale(15),
    marginTop: scale(5),
  },
  dropdown: {
    height: scale(40),
    paddingHorizontal: scale(15),
  },
  AddressViewStyle: {
    backgroundColor: "#EBF0F1",
    paddingVertical: scale(5),
    paddingHorizontal: scale(15),
    borderRadius: scale(15),
    marginTop: scale(2),
  },
  AddressTextStyle: {
    color: "#43686A",
    fontSize: scale(12),
    fontFamily: FONTS.PoppinsRegular,
  },
  roletextStyle: {
    color: "#93AFB1",
    marginLeft: scale(6),
  },
  termsView: {
    flexDirection: "row",
    paddingVertical: scale(10),
    alignSelf: "center",
    // alignItems: "center",
  },
  termsHighlightTxt: {
    color: COLOR.AppColor,
    fontFamily: FONTS.PoppinsMedium,
  },
  termsTxt: {
    fontFamily: FONTS.PoppinsLight,
    paddingHorizontal: scale(5),
    textAlign: "center",
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
    marginTop: verticalScale(15),
    marginBottom: verticalScale(25),
  },

  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#93AFB1",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#05A1AB",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
});
