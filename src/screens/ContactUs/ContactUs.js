import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { styles } from "./ContactUsStyles";
import { Header } from "../../components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getUser } from "@/selectors/UserSelectors";
import { UserController } from "@/controllers";
import { showMessage } from "react-native-flash-message";
import { HandleUnhandledTouches } from "@/utils/GlobalMethods";
import { goBack } from "@/navigation/NavigationRef";

export function ContactUs(props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) {
      showMessage({
        message: 'Please enter a message.',
        type: "danger",
      });
      return
    }
    let data = {
      fullname: user?.userinfo?.user?.user_profiles?.fullname,
      email: user?.userinfo?.email,
      message,
    };
    try {
      const res = await UserController.contactRequest(data);
      showMessage({
        message: res.msg,
        type: "success",
      });
      goBack()
    } catch (error) {
      showMessage({
        message: error?.msg,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      onStartShouldSetResponder={HandleUnhandledTouches}
    >
      <Header back tintColor />
      <View style={styles.mainContainer}>
        <Text style={styles.headTxt}>Contact Us</Text>
        <Text style={styles.desTxt}>Feel free to get in touch with us</Text>

        <InputField
          color={"#05A1AB"}
          mainViewStyle={{ width: "100%" }}
          icon={"account"}
          title={"Full Name"}
          placeholder={"Enter Your Full Name"}
          value={user?.userinfo?.user?.user_profiles?.fullname}
          editable={false}
        />
        <InputField
          color={"#93AFB1"}
          icon={"email"}
          title={"Email Address"}
          placeholder={"Enter Your Email Address"}
          mainViewStyle={{ marginTop: 0, width: "100%" }}
          value={user?.userinfo?.email}
          editable={false}
        />

        <View
          style={{
            backgroundColor: "#EBF0F1",
            height: scale(200),
            borderRadius: moderateScale(15),
            width: "100%",
          }}
        >
          <Text
            style={{
              marginLeft: moderateScale(12),
              marginTop: verticalScale(10),
              marginBottom: verticalScale(5),
            }}
          >
            Message
          </Text>
          <TextInput
            style={{ paddingLeft: moderateScale(12) }}
            placeholder="Write"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <View style={{ marginTop: scale(20) }}>
          <Button title={"Send"} onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default ContactUs;
