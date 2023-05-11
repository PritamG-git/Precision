import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { ShadowStyles } from "@/theme";
import { NAVIGATION } from "@/constants";

const styles = StyleSheet.create({
    cardStyle: {
        ...ShadowStyles.shadow,
        padding: scale(12),
        backgroundColor: "#FFFFFF",
        borderRadius: scale(12),
        marginVertical: scale(8),
        marginHorizontal: scale(3)
    },
    dateTxt: {
        fontFamily: FONTS.PoppinsMedium,
        color: "#43686A",
        fontSize: scale(10),
        paddingHorizontal: scale(5),
    },
});

export function ShiftCard(props) {
    const navigation = useNavigation();


    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.ShiftManagementDetails, { id: props?.id })}
            style={styles.cardStyle}
        >
            <View
                style={{
                    backgroundColor: "#E5F5F7",
                    borderRadius: scale(10),
                    paddingVertical: scale(6),
                    paddingHorizontal: scale(10),
                    alignSelf: 'flex-start'
                }}
            >
                <Text
                    style={{
                        fontSize: scale(12),
                        fontFamily: FONTS.PoppinsRegular,
                        color: "#05A1AB",
                    }}
                >
                    {props?.user_designation?.name}
                </Text>
            </View>

            <Text
                style={{
                    fontSize: scale(11),
                    fontFamily: FONTS.PoppinsLight,
                    color: "#93AFB1",
                    marginTop: scale(10),
                    marginBottom: scale(5),
                }}
            >
                Availability {props?.shift_type == 1 ? '(Full Time)' : props?.shift_type == 2 ? '(Half Time)' : '(Hourly)'}
            </Text>

            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image resizeMode="contain" style={{ width: scale(13), height: scale(15) }} source={require("../assets/Home/calendar.png")} />
                    <Text style={styles.dateTxt}> {moment(props.start_date).format("DD MMM, YYYY")}</Text>
                </View>


                <View
                    style={{
                        borderWidth: scale(0.5),
                        borderColor: "#D4DFE0",
                        marginHorizontal: scale(5),
                        height: scale(20)
                    }}
                />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Image source={require("../assets/Home/timee.png")} resizeMode="contain" style={{ width: scale(13), height: scale(15) }} />
                    <Text style={styles.dateTxt}>{moment(props.time_start).format('LT')} - {moment(props.time_end).format('LT')}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}
