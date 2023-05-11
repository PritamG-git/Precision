import { FONTS } from "@/theme/fonts";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    backImage: {
        position: "absolute",
        width: scale(350),
        height: scale(340),
    },
    dropdown: {
        height: scale(40),
        paddingHorizontal: scale(15),
    },
    placeholderStyle: {
        fontSize: scale(16),
        color: "#93AFB1",
    },
    selectedTextStyle: {
        fontSize: scale(16),
        color: "#05A1AB",
    },
    inputSearchStyle: {
        height: scale(40),
        fontSize: scale(16),
    },
    iconStyle: {
        width: scale(20),
        height: scale(20),
    },
});
