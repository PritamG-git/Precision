import { StyleSheet } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";

const styles = StyleSheet.create({
    setStatusStyl: {
        fontSize: scale(30),
        fontFamily: FONTS.PoppinsSemiBold,
        color: "#43686A",
    },
    availStatus: {
        fontSize: scale(16),
        color: '#738485',
        fontFamily: FONTS.PoppinsLight
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

})
export default styles