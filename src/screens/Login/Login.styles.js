import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(20),
    flex: 1,
  },
  bottomView: {
    alignSelf: "center",
    flexDirection: "row",
    marginVertical: verticalScale(10)
  },
});
