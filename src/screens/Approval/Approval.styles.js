import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors/colors";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    borderRadius: scale(20),
    justifyContent: "center",
    backgroundColor: "white",
  },
  headingTxt: {
    color: COLOR.HeadingColor,
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(20),
    paddingBottom: scale(10),
  },
  userSection: {
    flexDirection: "row",
    paddingBottom: scale(15),
    alignItems: 'center',
    borderBottomColor: '#DEE7E7',
    borderBottomWidth: 1
  },
  nameTxt: {
    fontFamily: FONTS.PoppinsMedium,
    color: COLOR.HeadingColor,
    fontSize: scale(16),
  },
  postTxt: { color: COLOR.AppColor, fontFamily: FONTS.props, fontSize: scale(12), },
  emailTxt: {
    marginTop: scale(10),
    fontFamily: FONTS.PoppinsLight,
    color: "#93AFB1",
    fontSize: scale(10),
  },
  desTxt: {
    fontFamily: FONTS.PoppinsLight,
    paddingVertical: scale(15),
    color: "#738485",
    fontSize: scale(14),
  },
  waitTxt: {
    color: "#43686A",
    fontFamily: FONTS.PoppinsLight,
    marginLeft: scale(8),
  },
  bottomView: {
    paddingTop: scale(15), borderColor: '#DEE7E7',
    borderTopWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: scale(10)
  },
  loginTxt: {
    color: "#05A1AB",
    fontFamily: FONTS.PoppinsMedium,
    fontSize: scale(18),
  },
});
