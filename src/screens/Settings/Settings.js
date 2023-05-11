import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Header } from "../../components/Header";
import { styles } from "./SettingsStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import { useState } from "react";
import { newIcon } from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../selectors/UserSelectors";
import { UserController } from "@/controllers";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  {
    id: 1,
    status: "Notifications",
    image: require("../../assets/Home/notification.png"),
  },
  {
    id: 6,
    status: "Job Reminder",
    image: require("../../assets/Home/notification.png"),
  },
  {
    id: 2,
    status: "About Us",
    image: newIcon.about_us,
    Screen: "AboutUs",
  },
  {
    id: 3,
    status: "Terms & Conditions",
    image: require("../../assets/Home/terms.png"),
    Screen: "Terms",
  },
  {
    id: 4,
    status: "Privacy Policy",
    image: require("../../assets/Home/privacy.png"),
    Screen: "Privacy",
  },
  {
    id: 5,
    status: "Contact Us",
    image: require("../../assets/Home/contact.png"),
    Screen: "ContactUs",
  },
];

const timeInterval = [
  { value: 10, label: '10 Min' },
  { value: 30, label: '30 Min' },
  { value: 60, label: '1 Hr' },
  { value: 120, label: '2 Hr' },
]

const Settings = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [Enabled, setEnabled] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [interval, setInterval] = useState();

  const getProfile = async () => {
    try {
      const res = await UserController.MyProfileRequesttt();
      if (res.payload) {
        setEnabled(res?.payload?.user_settings?.is_notification);
        setShowInput(res?.payload?.user_settings?.job_reminder_status);
        if (res?.payload?.user_settings?.job_reminder_status) {
          setInterval(res?.payload?.user_settings?.job_reminder_value)
        }
      }
    } catch (err) { }
  };

  const updatenotification = async () => {
    const data = {
      is_notification: !Enabled,
    };
    try {
      const res = await UserController.updatenotification(
        data,
        user?.profileinfo?.user_settings?.id
      );
      if (res.payload) {
        setEnabled(!Enabled);
        showMessage({
          message: res.msg,
          type: "success",
        });
      }
    } catch (err) { }
  };

  const updateJobReminder = async (val) => {
    setInterval(val)
    const data = {
      "job_reminder_status": showInput,
      "job_reminder_value": val
    };
    try {
      const res = await UserController.updateJobReminder(data);
      if (res.payload) {
        showMessage({
          message: res.msg,
          type: "success",
        });
      }
    } catch (err) {
      showMessage({
        message: err.msg,
        type: "danger",
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity key={item.id} onPress={updatenotification}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: scale(15),
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={{ width: scale(30), height: scale(30) }}
            />
            <Text
              style={{
                marginLeft: scale(8),
                fontSize: scale(14),
                fontf: FONTS.PoppinsRegular,
                color: "#43686A",
              }}
            >
              {item.status}
            </Text>
          </View>

          <Image
            source={
              Enabled
                ? require("../../assets/Home/ontoggle.png")
                : require("../../assets/Home/offtoggle.png")
            }
            resizeMode="contain"
            style={{ width: scale(40), height: scale(20) }}
          />
        </TouchableOpacity>
      );
    } else if (index === 1) {
      return (
        <View style={{ padding: scale(15), }}>
          <TouchableOpacity key={item.id} onPress={() => setShowInput(!showInput)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={{ width: scale(30), height: scale(30) }}
              />
              <Text
                style={{
                  marginLeft: scale(8),
                  fontSize: scale(14),
                  fontf: FONTS.PoppinsRegular,
                  color: "#43686A",
                }}
              >
                {item.status}
              </Text>
            </View>

            <Image
              source={
                showInput
                  ? require("../../assets/Home/ontoggle.png")
                  : require("../../assets/Home/offtoggle.png")
              }
              resizeMode="contain"
              style={{ width: scale(40), height: scale(20) }}
            />
          </TouchableOpacity>
          {showInput &&
            <View
              style={{
                backgroundColor: "#EBF0F1",
                borderRadius: scale(10),
                marginTop: scale(10)
              }}
            >
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={{
                  bottom: verticalScale(25),
                }}
                data={timeInterval}
                maxHeight={verticalScale(300)}
                labelField="label"
                valueField="value"
                placeholder='Select Time'
                value={interval}
                onChange={(item) => {
                  updateJobReminder(item.value);
                }}
                renderRightIcon={() => (
                  <Image
                    style={{ alignSelf: 'center', tintColor: "#93AFB1" }}
                    source={require("../../assets/Home/droparrow.png")}
                  />
                )}
              />
            </View>}
        </View>
      )
    } else {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => props.navigation.navigate(item.Screen)}
          style={{
            margin: scale(15),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ width: scale(30), height: scale(30) }}
          />
          <Text
            style={{
              marginLeft: scale(10),
              fontSize: scale(14),
              fontFamily: FONTS.PoppinsRegular,
              color: "#43686A",
            }}
          >
            {item.status}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6FEFF" }}>
      <Image
        source={require("../../assets/Home/MyProfile.png")}
        style={styles.backImage}
        resizeMode="stretch"
      />
      <Header rightIcon={true} />
      <Text
        style={{
          fontSize: scale(20),
          fontFamily: FONTS.PoppinsSemiBold,
          color: "#FFFFFF",
          marginLeft: scale(15),
        }}
      >
        Settings
      </Text>

      <FlatList
        contentContainerStyle={{
          marginLeft: scale(15),
          paddingTop: scale(220),
        }}
        data={data}
        renderItem={renderItem}
      />

      <Text
        style={{
          color: "#DDE5E4",
          fontSize: scale(10),
          fontFamily: FONTS.PoppinsLight,
          alignSelf: "center",
        }}
      >
        v1.0 All Rights Reserved
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
