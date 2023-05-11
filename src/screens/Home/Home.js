import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Header } from "../../components/Header";
import { OnGoingCard } from "../../components/OnGoingCard";
import { styles } from "./Home.Styles";
import { navigate } from "../../navigation/NavigationRef";
import { NAVIGATION } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getUser } from "../../selectors/UserSelectors";
import { Myprofile, setNotificationCount } from "../../actions/UserActions";
import { UserController } from "@/controllers";
import { showMessage } from "react-native-flash-message";
import { ShiftCard } from "@/components/ShiftCard";
import { BaseScreen } from "@/components/BaseScreen";
import { Loader } from "@/components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home(props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [isLoading, setisLoading] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [shiftData, setShiftData] = useState([]);
  const [activeChat, setActiveChat] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(Myprofile());
      getDashboard();
      checkMessage();
    }, [])
  );

  const checkMessage = async () => {
    const ChatId = await AsyncStorage.getItem('ChatId')
    if (ChatId) {
      setActiveChat(true)
    } else {
      setActiveChat(false)
    }
  }

  const getDashboard = async () => {
    setisLoading(true)
    try {
      const res = await UserController.getHomeData()
      setJobsData(res.payload.ongoing.data)
      setShiftData(res.payload.shifts?.site?.slice(0, 2))
      dispatch(setNotificationCount(res.payload.activeNotifications))
    } catch (error) {
      console.log(error)
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
    setisLoading(false)
  }

  const SectionTitle = ({ id, title }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
        <Text style={id > 0 ? [styles.sectionHeadTxt, { color: "#43686A" }] : styles.sectionHeadTxt}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION.ongoingjobs, { id: id, title: title })}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={id > 0 ? [styles.moreTxt, { color: "#93AFB1" }] : styles.moreTxt}>
            More
            <Icon
              name="arrow-right"
              size={scale(12)}
              color={id > 0 ? "#93AFB1" : "#9BD9DD"}
            />
          </Text>

        </TouchableOpacity>
      </View>
    );
  };

  const displayNotf = async () => {
    /* await notifee.requestPermission()
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        color: 'red',
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    }); */
  }

  return (
    <BaseScreen>
      <Header activeMessage={activeChat} />
      <View style={styles.contentContainer}>
        <Text style={styles.nameTxt}>Hi {user?.profileinfo?.user_profiles.fullname}</Text>
        {isLoading ? <Loader style={{ marginTop: verticalScale(150) }} />
          : <>
            <View style={{ marginTop: scale(10) }}>
              <SectionTitle id={0} title={"Ongoing Jobs"} />
              {jobsData?.length ?
                <OnGoingCard newScreen={"JobDetails"} {...jobsData[0]} refreshFunc={getDashboard} />
                : <Text style={{ alignSelf: "center", color: "#43686A", paddingVertical: scale(75), fontSize: scale(18) }}>No ongoing jobs</Text>
              }
            </View>
            <View style={{ marginTop: 15 }}>
              <SectionTitle id={2} title={"Shift Management"} />
              {shiftData?.length ?
                <FlatList
                  data={shiftData}
                  refreshing={isLoading}
                  onRefresh={getDashboard}
                  renderItem={({ item, index }) => (
                    <ShiftCard {...item} />
                  )}
                />
                :
                <Text style={{ alignSelf: "center", color: "#43686A", paddingVertical: scale(65), fontSize: scale(18) }}>No shifts are added yet</Text>
              }
            </View>
          </>}
      </View>
    </BaseScreen>
  );
}
