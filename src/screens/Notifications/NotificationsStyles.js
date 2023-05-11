import { ShadowStyles } from "@/theme";
import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

const styles = StyleSheet.create({
  notificationBoxStyle: {
    ...ShadowStyles.shadow,
    paddingVertical: scale(12),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    marginVertical: scale(8),
    marginHorizontal: scale(3),
  },
  leftView: {
    backgroundColor: "#0D625B",
    height: scale(40),
    width: scale(4),
    borderBottomEndRadius: scale(15),
    borderTopEndRadius: scale(15),
  },
  NotificationTitleStyle: {
    fontSize: scale(11),
    fontFamily: FONTS.PoppinsRegular,
    color: "#43686A",
  },
  timeTitle: {
    color: "#93AFB1",
    fontSize: scale(9),
    fontFamily: FONTS.PoppinsLight,
    marginTop: scale(3),
  },
  rejectTitleStyle: {
    color: "#43686A",
    fontSize: scale(16),
    fontFamily: FONTS.PoppinsMedium,
  },
  acceptTitleStyle: {
    color: "#05A1AB",
    fontFamily: FONTS.PoppinsMedium,
    fontSize: scale(16),
  },
});

export default styles;
