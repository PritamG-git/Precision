import {
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: scale(50),
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
});

export function Loader(props) {
    return (
        <ActivityIndicator
            animating
            color='#05A1AB'
            size="large"
            style={[styles.activityIndicator, props.style]}
        />
    );
}
