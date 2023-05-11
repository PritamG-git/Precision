import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors/colors";
import { verticalScale, moderateScale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  backImage: {
    position: "absolute",
    height: scale(200.5),
    width: "100%",
  },
  myJobs: {
    fontSize: moderateScale(20),
    fontFamily: FONTS.PoppinsSemiBold,
    color: "#FFFFFF",
  },
  ongoingCompletedBox: {
    backgroundColor: "#2BC7D1",
    bottom: 5,
    flexDirection: "row",
    marginTop: verticalScale(25),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  onGoingGradientStyle: {
    padding: 15,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  completedGradientStyle: {
    padding: 15,

    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
