import { ShadowStyles } from "@/theme";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  nameTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(20),
    color: "white",
  },
  contentContainer: { paddingHorizontal: scale(20), paddingVertical: scale(5) },
  cardStyle: {
    ...ShadowStyles.shadow,
    padding: scale(12),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    marginTop: scale(10),
  },
  sectionHeadTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(16),
    color: "white",
  },
  moreTxt: {
    color: "#9BD9DD",
    fontSize: scale(12),
    fontFamily: FONTS.PoppinsRegular,
  },
});
