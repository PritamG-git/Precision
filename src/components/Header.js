import { FONTS } from "../theme/fonts";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { ms, scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { ShadowStyles } from "@/theme";
import { useSelector } from "react-redux";
import { getUser } from "@/selectors/UserSelectors";

export function Header(props) {
  const navigation = useNavigation();
  const user = useSelector(getUser);
  const notificationCount = user?.activeNotification;

  return (
    <View style={styles.headercontainer}>
      <StatusBar translucent barStyle={props.barWhite ? "light-content" : "dark-content"} backgroundColor={props.backcolor ? props.backcolor : "transparent"} />
      {props.back && (
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.backStyle}
            onPress={() => navigation.goBack()}
          >
            <Image source={require("../assets/Home/greenarrow.png")} style={{ tintColor: props.tintColor ? "#05A1AB" : '#FFF', width: scale(24), height: scale(15) }} resizeMode="contain" />
          </TouchableOpacity>
          <Text
            style={{
              color: "#FFFFFF",
              fontFamily: FONTS.PoppinsRegular,
              fontSize: scale(12),
              marginLeft: ms(8)
            }}
          >
            {props.jobcompletedtitle}
          </Text>
        </View>
      )}

      {!props.back && (
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.backStyle}
              onPress={() => navigation.toggleDrawer()}
            >
              <Image source={require("../assets/Home/menu.png")} style={{ width: scale(20), height: scale(15) }} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{props.title}</Text>
          </View>

          {!props.rightIcon && (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                <Image
                  style={styles.logo}
                  source={require("../assets/Home/notif.png")}
                  resizeMode="contain"
                />
                {notificationCount > 0 && <View style={{ position: 'absolute', right: scale(5), borderRadius: scale(100), backgroundColor: '#FFBB00', padding: scale(3) }}><Text style={{ fontSize: scale(5) }}>{notificationCount}</Text></View>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Image
                  style={styles.logo}
                  source={require("../assets/Home/msg.png")}
                  resizeMode="contain"
                />
                {props.activeMessage && <View style={{ position: 'absolute', right: scale(10), borderRadius: scale(100), backgroundColor: 'red', padding: scale(3) }}></View>}
              </TouchableOpacity>
            </View>
          )
          }
        </>
      )}

      {
        props.rightButton && (
          <TouchableOpacity
            onPress={props.toggleModal}
            style={styles.rtButtonView}
          >
            <Image
              source={props.imageUri}
              style={{
                height: scale(30),
                width: scale(30)
              }}
              resizeMode="contain"
            />
            {props.buttonTitle && <Text style={[styles.rtButtonTxt, props.styless]}>
              {props.buttonTitle}
            </Text>}
          </TouchableOpacity>
        )
      }

      {
        props.rightheaderText && (
          <TouchableOpacity
            style={{
              ...ShadowStyles.shadow,
              backgroundColor: "#FFFFFF",
              padding: scale(8),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: scale(6),
              marginRight: scale(5)
            }}
            onPress={() => navigation.navigate("HourLogs", { id: props.jobId })}
          >
            <Text style={{ color: "#05A1AB" }}>Hour Logs</Text>
          </TouchableOpacity>
        )
      }

      {
        props.Skip && (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFFFF",
              paddingVertical: scale(7),
              paddingHorizontal: scale(24),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: scale(6),
              borderWidth: scale(1),
              borderColor: "#93AFB1"
            }}
            onPress={props.Skip}
          >
            <Text style={{ color: "#93AFB1" }}>SKIP</Text>
          </TouchableOpacity>
        )
      }

      {
        props.EditImage && (
          <TouchableOpacity onPress={() => navigation.navigate(props.editcer, props.param)}>
            <Image resizeMode="contain" style={{ marginRight: scale(5), width: scale(30), height: scale(30) }} source={props.Uri} />
          </TouchableOpacity>
        )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  headercontainer: {
    width: "100%",
    marginTop: StatusBar.currentHeight + scale(8),
    alignItems: "center",
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rtButtonView: {
    paddingHorizontal: scale(10),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  rtButtonTxt: {
    fontSize: scale(12),
    fontFamily: FONTS.PoppinsMedium,
    color: "white",
  },
  headerTitle: {
    fontFamily: FONTS.PTBold,
    fontSize: scale(22),
    color: "#FFFFFF",
  },
  backStyle: {
    paddingHorizontal: scale(5),
  },
  logo: {
    marginHorizontal: scale(10),
    alignSelf: "flex-end",
    height: scale(30),
    width: scale(30)
  },
});
