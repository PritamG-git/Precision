import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { GetOtPRequestt } from "../../actions/UserActions";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { COLOR } from "../../constants/colors/colors";
import { FONTS } from "../../theme/fonts";
import { TextStyles } from "../../theme/TextStyles";
import { styles } from "./otp.styles";
import { moderateScale, scale } from "react-native-size-matters";
import { showMessage } from "react-native-flash-message";
import config from "@/config";
import { UserController } from "@/controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function OTP(props) {
  const dispatch = useDispatch();
  const { navigation, route } = props;
  const { data } = route.params;
  const [Otpp, setOtpp] = useState("");
  const [timer, setTimer] = useState(30);
  const [active, setactive] = useState(timer == 0 ? false : true);

  console.log("data", data);

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 ? setTimeout(timeOutCallback, 1000) : setactive(false);
  }, [timer, timeOutCallback]);

  const validation = () => {
    if (!Otpp.trim()) {
      showMessage({
        message: "Please enter OTP",
        type: "danger",
      });
    } else if (Otpp.length < 4) {
      showMessage({
        message: "Please enter valid OTP",
        type: "danger",
      });
    } else {
      OtpRequest();
    }
  };

  const OtpRequest = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    const dataapi = {
      email: data.email,
      role_id: config.EMPLOYEE_ROLE,
      otp: Number(Otpp),
      "fcm_token": fcmToken,
      "token_type": Platform.OS == "android" ? 2 : 1,
    };
    dispatch(GetOtPRequestt(dataapi));
  };

  const resetTimer = function () {
    if (!timer) {
      setactive(true);
      setTimer(30);
    }
  };

  const OtpresenedRequest = async () => {
    const dataresend = {
      email: data.email,
      role_id: config.EMPLOYEE_ROLE,
    };
    try {
      const res = await UserController.GetOtPresendRequestt(dataresend)
      if (res.payload) {
        showMessage({
          message: res.msg,
          type: "success",
        });
        resetTimer();
      }
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "success",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Header back={true} tintColor />
      <View style={{ padding: scale(15) }}>
        <Text
          style={{
            color: "#43686A",
            fontSize: scale(30),
            fontFamily: FONTS.PoppinsSemiBold,
          }}
        >
          One Time Password
        </Text>
        <Text
          style={{
            color: "#738485",
            fontFamily: FONTS.PoppinsLight,
            fontSize: scale(16),
          }}
        >
          Enter the OTP we just sent you on your email address to login.
        </Text>
        <View style={styles.otpOuterView}>
          <OTPInputView
            onCodeChanged={(Otpp) => {
              setOtpp(Otpp);
            }}
            style={styles.otpStyle}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              // setOtpp(code);
            }}
          />
        </View>
        <Button onPress={validation} title={"Submit"} />
        <View style={styles.bottomView}>
          <Text style={[TextStyles.light, { fontSize: 14 }]}>
            Didn't get the OTP?{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.2}
            disabled={active}
            onPress={() => { OtpresenedRequest() }}
          >
            {active ? (
              <Text
                style={{
                  fontFamily: FONTS.PoppinsMedium,
                  fontSize: 14,
                  color: "grey",
                }}
              >
                Resend
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: FONTS.PoppinsMedium,
                  fontSize: 14,
                  color: COLOR.AppColor,
                }}
              >
                Resend
              </Text>
            )}
          </TouchableOpacity>
          {timer <= 0 ? (
            <Text></Text>
          ) : (
            <Text style={{ marginLeft: moderateScale(5) }}>
              {"(" + timer + ")"}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
