import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  editprofilestyle: {
    color: "#43686A",
    fontSize: scale(30),
    fontFamily: FONTS.PoppinsSemiBold,
    marginLeft: scale(15),
    marginTop: scale(10),
  },
  editprofiledetails: {
    color: "#738485",
    fontSize: scale(16),
    fontFamily: FONTS.PoppinsLight,
    marginLeft: scale(15),
  },
  buttonstyle: {
    width: "45%",
    backgroundColor: "#43686A",
    paddingVertical: scale(15),
    borderRadius: scale(14),
    justifyContent: "center",
    alignItems: "center",
  },
  savebuttonStyle: {
    width: "45%",
    backgroundColor: "#05A1AB",
    paddingVertical: scale(15),
    borderRadius: scale(14),
    justifyContent: "center",
    alignItems: "center",
  },
});
