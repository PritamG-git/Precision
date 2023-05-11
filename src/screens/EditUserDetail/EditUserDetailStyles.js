import { StyleSheet } from "react-native";
import { scale, } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

const styles = StyleSheet.create({
  editDetailText: {
    fontSize: scale(30),
    color: "#43686A",
    fontFamily: FONTS.PoppinsSemiBold,
    marginLeft: scale(15),
  },
  addSkill: {
    fontSize: scale(12),
    color: "#43686A",
    fontFamily: FONTS.PoppinsRegular,
    marginLeft: scale(5),
    marginTop: scale(10),
  },
  addskillButton: {
    borderWidth: scale(1),
    borderColor: "#05A1AB",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(15),
    padding: scale(15),
    borderRadius: scale(14),
    marginTop: scale(20),
  },
  addedskills: {
    color: "#43686A",
    fontSize: scale(16),
    fontFamily: FONTS.PoppinsSemiBold,
    marginLeft: scale(15),
    marginTop: scale(10),
  },
  DoneButton: {
    backgroundColor: "#05A1AB",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(15),
    padding: scale(18),
    borderRadius: scale(14),
    marginTop: scale(15),
    marginBottom: scale(20),
  },
});
export default styles;
