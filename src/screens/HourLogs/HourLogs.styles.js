import { ShadowStyles } from "@/theme";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FEFF'
  },
  hourLogsTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(20),
    color: "#43686A",
    marginBottom: scale(10)
  },
  imageInnerView: {
    position: "absolute",
    top: scale(20),
    left: scale(20),
  },
  imageInnerTxt: {
    fontFamily: FONTS.PoppinsMedium,
    fontSize: scale(28),
    color: "white",
  },
  imageInnerTxt2: {
    fontFamily: FONTS.PoppinsLight,
    fontSize: scale(12),
    color: "white",
    width: scale(100),
  },
  listHeadTxt: {
    marginTop: scale(20),
    fontFamily: FONTS.PoppinsLight,
    fontSize: scale(14),
    color: "#93AFB1",
  },
  flatListView: {
    ...ShadowStyles.shadow,
    flexDirection: "row",
    paddingVertical: scale(10),
    borderRadius: scale(12),
    marginVertical: scale(10),
    marginHorizontal: scale(6),
    backgroundColor: "#FFF",
  },
  sideBar: {
    width: scale(4),
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
    marginRight: scale(10),
  },
  listInnerSectionView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeinTxt: {
    fontFamily: FONTS.PoppinsLight,
    fontSize: scale(12),
    color: "#93AFB1",
  },
  listHoursTxt: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: scale(14),
    color: "#05A1AB",
  },
  dateTxt: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: scale(14),
    color: "#43686A",
  },

});
