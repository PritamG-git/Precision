import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { FONTS } from "../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { ShadowStyles } from "@/theme";
import { useSelector } from "react-redux";
import { getUser } from "@/selectors/UserSelectors";
import { UserController } from "@/controllers";
import { showMessage } from "react-native-flash-message";

const styles = StyleSheet.create({
  cardStyle: {
    ...ShadowStyles.shadow,
    padding: scale(12),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    marginVertical: scale(8),
    marginHorizontal: scale(3)
  },
  addressTxt: {
    color: "#43686A",
    fontFamily: FONTS.PoppinsMedium,
    fontSize: scale(16),
    marginLeft: moderateScale(10),
  },
  dateTxt: {
    fontFamily: FONTS.PoppinsMedium,
    color: "#43686A",
    fontSize: scale(10),
    paddingHorizontal: scale(5),
  },
});

export function OnGoingCard(props) {
  const navigation = useNavigation();
  const user = useSelector(getUser);

  const timeIn = async () => {
    let param = {
      "job_id": props.id,
      "start_date_time": moment().utc().toISOString(),
      "user_id": user?.userinfo?.id
    }
    try {
      const res = await UserController.timeIn(param)
      showMessage({
        message: res.msg,
        type: "success",
      });
      res.payload && props.refreshFunc()
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
  }

  const timeOut = async () => {
    let param = {
      "end_date_time": moment().utc().toISOString(),
      "total": moment().diff(moment(props?.job_hours[0]?.start_date_time), 'seconds')
    }
    try {
      const res = await UserController.timeOut(props.job_hours[0].id, param)
      showMessage({
        message: res.msg,
        type: "success",
      });
      props.refreshFunc()
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
  }

  const AddressSection = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: scale(11), height: scale(13) }}
            source={require("../assets/Home/Locationnn.png")}
            resizeMode="contain"
          />
          <Text style={styles.addressTxt}>{props.sites?.name}, {props.sites?.territory}, {props.sites?.city}</Text>
        </View>

        <Text
          style={{
            color: "#93AFB1",
            fontSize: scale(11),
            fontFamily: FONTS.PoppinsRegular,
            marginLeft: scale(22)
          }}
        >
          {props.sites?.address}
        </Text>
      </View>
    );
  };

  const DateTimeSection = () => {
    return (
      <>
        <Text
          style={{
            fontSize: scale(10),
            fontFamily: FONTS.PoppinsRegular,
            color: "#93AFB1",
            marginTop: scale(10),
            paddingLeft: scale(22)
          }}
        >
          Scheduled {props?.shift_type == 1 ? '(Full Time)' : props?.shift_type == 2 ? '(Half Time)' : '(Hourly)'}
        </Text>

        <View
          style={{
            flexDirection: "row",
            paddingLeft: scale(22),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: scale(13), height: scale(15) }}
              source={require("../assets/Home/calendar.png")}
              resizeMode="contain"
            />
            <Text style={styles.dateTxt}>{moment(props.start_date).format('D MMM')} - {moment(props.end_date).format('D MMM, YYYY')}</Text>
          </View>


          <View
            style={{
              borderWidth: scale(0.7),
              borderColor: "#D4DFE0",
              marginHorizontal: scale(5),
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

        <View
          style={{
            borderWidth: scale(0.6),
            borderColor: "#D4DFE0",
            marginTop: scale(10),
          }}
        />

        <View style={{ marginTop: scale(15), flexDirection: "row", justifyContent: "space-between" }}>

          <View>
            {props.status == 6 && <>
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: FONTS.PoppinsRegular,
                }}
              >
                Hrs Logged
              </Text>
              <Text
                style={{
                  fontSize: scale(10),
                  fontFamily: FONTS.PoppinsMedium,
                  color: "#43686A",
                }}
              >
                {Math.floor(parseInt(props?.job_hours[0]?.total) / 3600) == 0 ? Math.floor(parseInt(props?.job_hours[0]?.total) / 60) == 0 ? `${props?.job_hours[0]?.total} Secs` : `${Math.floor(parseInt(props?.job_hours[0]?.total) / 60)} Mins` : `${Math.floor(parseInt(props?.job_hours[0]?.total) / 3600)} Hrs`}
              </Text>
            </>}
          </View>
          {props.status == 4 && <TouchableOpacity
            style={{
              backgroundColor: "#05A1AB",
              paddingHorizontal: scale(15),
              paddingVertical: scale(8),
              alignItems: "center",
              borderRadius: scale(6),
              flexDirection: "row",
              justifyContent: 'center'
            }}
            onPress={() => { props.status == 4 && !props?.job_hours?.length ? timeIn() : timeOut() }}
          >
            <Image
              style={{ height: scale(14), width: scale(14) }}
              source={require("../assets/Home/timeleft.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: scale(12),
                fontFamily: FONTS.PoppinsRegular,
                color: "white",
                marginLeft: scale(5),
              }}
            >
              {props.status == 4 && !props?.job_hours?.length ? "Time In" : "Time Out"}
            </Text>
          </TouchableOpacity>}
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(props.newScreen, { id: props.id })}
      style={styles.cardStyle}
    >
      <View style={{ flexDirection: "row" }}>
        {props.strip && (
          <View
            style={{
              backgroundColor: props.strip,
              width: scale(4),
              height: scale(42),
              right: scale(12),
              borderTopEndRadius: scale(10),
              borderBottomEndRadius: scale(10),
            }}
          />
        )}
        <AddressSection />
      </View>
      <DateTimeSection />
    </TouchableOpacity>
  );
}
