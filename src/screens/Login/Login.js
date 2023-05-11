import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { NAVIGATION } from "../../constants";
import { COLOR } from "../../constants/colors/colors";
import { navigate } from "../../navigation/NavigationRef";
import { FONTS } from "../../theme/fonts";
import { TextStyles } from "../../theme/TextStyles";
import { styles } from "./Login.styles";
import { showMessage } from "react-native-flash-message";
import { getUser } from "@/selectors/UserSelectors";
import { Approval } from "../Approval/Approval";
import { HandleUnhandledTouches, ValidateEmail } from "@/utils/GlobalMethods";
import config from "../../config.js";
import { HttpClient, UserController } from "@/controllers";
import { useFocusEffect } from "@react-navigation/native";

export function Login(props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [email, setEmail] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [userData, setUserData] = useState({});

  const HideModal = () => {
    setIsApproved(false);
    setEmail("");
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
    }, [])
  );
  const Validation = () => {
    if (!email.trim()) {
      showMessage({
        message: "Email Field is Required",
        type: "danger",
      });
      return;
    }
    if (!ValidateEmail(email)) {
      return;
    } else {
      LoginAccountAuth();
    }
  };

  const LoginAccountAuth = async () => {
    const data = {
      email: email,
      role_id: config.EMPLOYEE_ROLE,
    };
    try {
      const res = await UserController.login(data);
      if (res.payload) {
        navigate(NAVIGATION.otp, { data: { ...data, ...res.payload } });
      }
    } catch (error) {
      if (error.payload) {
        setUserData(error.payload);
        HttpClient.setAuthorization(error.payload.token);
        if (error.payload.step == 0) {
          navigate(NAVIGATION.EditUserDetail, { userDetails: error.payload });
          return;
        }
        if (!error.payload.user_documents.length) {
          navigate(NAVIGATION.uploadcert, { userDetails: error.payload });
          return;
        }
        if (!error.payload.is_admin_approved) {
          setIsApproved(true);
          return;
        }
      } else {
        showMessage({
          message: error.msg,
          type: "danger",
        });
      }
    }
  };

  const PopUp = () => {
    return (
      <Modal transparent visible={isApproved}>
        <Approval user_profilesdata={userData} setModal={HideModal} />
      </Modal>
    );
  };

  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponder={HandleUnhandledTouches}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {isApproved && <PopUp />}
      <Image
        style={{ width: "100%", height: "70%", position: "absolute" }}
        resizeMode="cover"
        source={require("../../assets/login/login.png")}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/splash/Logo.png")}
          style={{ width: scale(206), height: scale(100) }}
          resizeMode="center"
        />
      </View>

      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS == "ios" && "padding"}
      >
        <View>
          <Text style={TextStyles.title}>Login</Text>
          <Text style={TextStyles.light}>
            Welcome! Enter the below details to login.
          </Text>
        </View>
        <InputField
          placeholderColor={"#93AFB1"}
          placeholder={"Enter your email Address"}
          mainViewStyle={{ width: "100%", marginTop: verticalScale(30) }}
          title={"Email Address"}
          onChangeText={setEmail}
          value={email}
          icon={"email"}
        />
        <Button
          style={{ marginTop: verticalScale(10) }}
          onPress={Validation}
          title={"Get OTP"}
        />
        <View style={styles.bottomView}>
          <Text style={[TextStyles.light, { fontSize: scale(14) }]}>
            Don't have an account?{""}
          </Text>
          <TouchableOpacity onPress={() => navigate(NAVIGATION.createaccount)}>
            <Text
              style={[
                TextStyles.light,
                {
                  fontSize: scale(14),
                  color: COLOR.AppColor,
                  fontFamily: FONTS.PoppinsMedium,
                  marginLeft: scale(5),
                },
              ]}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
