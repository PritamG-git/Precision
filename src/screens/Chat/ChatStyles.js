import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  messageTimeAndNameContainerRight: {
    backgroundColor: "pink",
  },
  messageTimeAndNameContainerLeft: {
    backgroundColor: "yellow",

    marginHorizontal: moderateScale(20),
  },
});

export default styles;
