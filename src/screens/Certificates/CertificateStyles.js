import { ShadowStyles } from "@/theme";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

const styles = StyleSheet.create({
  certificateStyle: {
    fontSize: scale(30),
    fontFamily: FONTS.PoppinsSemiBold,
    color: "#43686A",
    marginVertical: scale(5)
  },
  uploadStyle: {
    fontSize: scale(16),
    fontFamily: FONTS.PoppinsLight,
  },
  filemamestyle: {
    color: "#43686A",
    fontSize: scale(14),
    fontFamily: FONTS.PoppinsMedium,
  },
  uploadedtimestyle: {
    color: "#738485",
    fontFamily: FONTS.PoppinsLight,
    fontSize: scale(11),
  },
  contentContainer: { paddingVertical: scale(8) },
  cardStyle: {
    ...ShadowStyles.shadow,
    padding: scale(15),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    marginVertical: scale(8),
    marginHorizontal: scale(3),
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: scale(250),
    bottom: 0,
    zIndex: 9999,
  },
});
export default styles;
