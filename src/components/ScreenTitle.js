import { COLOR } from "@/constants/colors/colors";
import { FONTS } from "@/theme/fonts";
import { StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
    headingTxt: {
        color: COLOR.HeadingColor,
        fontFamily: FONTS.PoppinsSemiBold,
        fontSize: scale(20),
        marginVertical: scale(5)
    },
});

export function ScreenTitle(props) {
    return (
        <>
            <Text style={styles.headingTxt}>
                {props.title}
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.PoppinsLight,
                    fontSize: scale(16),
                    color: "#738485",
                }}
            >
                {props.description}
            </Text>
        </>
    );
}
