import { Dimensions, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: verticalScale(180),
    alignItems: "center",
    width: Dimensions.get('window').width, height: Dimensions.get('window').height
  },
  innerView: {
    opacity: 0.9,
    width: "100%",
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    backgroundColor: "#05A1AB",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: scale(20),
  },
  textTitle: { color: "white", paddingTop: scale(30) },
  textDes: { color: "white" },
  loginBtn: {
    width: scale(156),
    height: scale(58),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(14),
    position: "absolute",
  },
  btnContainer: {
    justifyContent: "center",
    height: scale(100),
    width: scale(300),
    alignSelf: "center",
  },
  createBtn: { backgroundColor: "transparent", right: scale(5) },
  loginTxt: {
    color: "#43686A",
    fontFamily: FONTS.PoppinsMedium,
    fontSize: scale(16),
  },
});

export default styles;
