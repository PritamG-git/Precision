import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import { getUser } from "../../selectors/UserSelectors";
import styles from "./NotificationsStyles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { UserController } from "@/controllers";
import { goBack, navigate } from "@/navigation/NavigationRef";
import { showMessage } from "react-native-flash-message";
import { NAVIGATION } from "@/constants";

const Notifications = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [isLoading, setisLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState({});

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const acceptejob = async (id, status, notification) => {
    setSelectedNotification(JSON.parse(notification.data));
    const data = { status };
    try {
      const res = await UserController.updatejobstatus(
        data,
        id,
        notification.id
      );
      if (res.payload && status == 4) {
        setModalVisible(!isModalVisible);
      } else {
        goBack();
      }
    } catch (err) { }
  };

  const getnotifications = async () => {
    setisLoading(true);
    try {
      const res = await UserController.getnotification();
      if (res.payload) {
        setAllNotifications(res.payload.notification);
      }
    } catch (err) { }
    setisLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getnotifications();
    }, [])
  );

  const handleMarkAll = async () => {
    try {
      const res = await UserController.notificationMarkAll();
      showMessage({
        message: res.msg,
        type: "success",
      });
    } catch (err) {
      showMessage({
        message: err.msg,
        type: "danger",
      });
    }
  };

  const handleMarkRead = async (id) => {
    try {
      const res = await UserController.notificationmark(id);
    } catch (err) { }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.notificationBoxStyle}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ ...styles.leftView, backgroundColor: item.is_read == 1 ? "#93AFB1" : JSON.parse(item?.data).status == 4 ? "#26C281" : JSON.parse(item?.data).status == 5 ? "#E40101" : "#066CFA" }} />
          <View style={{ paddingHorizontal: scale(10), width: "97%" }}>
            <TouchableOpacity
              onPress={() => {
                // console.log(JSON.parse(item.data))
                handleMarkRead(item.id);
                if (item.notification_type == 1) {
                  getnotifications()
                } else if (item.notification_type == 3) {
                  navigate("HospitalDetails", { jobdata: item });
                } else {
                  JSON.parse(item?.data).id && navigate(NAVIGATION.jobdetails, { id: JSON.parse(item?.data).id })
                }
              }}
            >
              <Text style={styles.NotificationTitleStyle}>
                {item.short_description}
              </Text>
              <Text style={styles.timeTitle}>
                {moment
                  .utc(item.updated_at)
                  .local()
                  .startOf("seconds")
                  .fromNow()}
              </Text>
            </TouchableOpacity>
            {JSON.parse(item?.data).status == 2 ? (
              <View>
                <View
                  style={{
                    borderWidth: scale(0.5),
                    borderColor: "#0000001A",
                    marginTop: scale(15),
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: scale(15),
                    paddingHorizontal: scale(40),
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      acceptejob(JSON.parse(item?.data).id, 5, item)
                    }
                  >
                    <Text style={styles.rejectTitleStyle}>Reject</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: scale(0.5),
                      borderColor: "#D4DFE0",
                      marginHorizontal: scale(5),
                      height: scale(20),
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      acceptejob(JSON.parse(item?.data).id, 4, item)
                    }
                  >
                    <Text style={styles.acceptTitleStyle}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6FEFF" }}>
      <Header back tintColor />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: scale(15),
        }}
      >
        <Text
          style={{
            color: "#43686A",
            fontSize: scale(20),
            fontFamily: FONTS.PoppinsSemiBold,
          }}
        >
          Notification
        </Text>
        <TouchableOpacity onPress={handleMarkAll}>
          <Text
            style={{
              color: "#738485",
              fontSize: scale(16),
              fontFamily: FONTS.PoppinsLight,
            }}
          >
            Mark as read
          </Text>
        </TouchableOpacity>
      </View>
      {allNotifications?.length ?
        <FlatList
          data={allNotifications}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: scale(15) }}
          refreshing={isLoading}
          onRefresh={getnotifications}
        />
        : <Text style={{
          color: "#43686A50",
          fontSize: scale(20),
          fontFamily: FONTS.PoppinsSemiBold,
          alignSelf: 'center',
          marginTop: Dimensions.get('window').height / 3
        }}>No Notifications Found</Text>}

      <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            padding: scale(20),
            borderRadius: scale(20),
          }}
        >
          <Text
            style={{
              color: "#43686A",
              fontSize: scale(20),
              fontFamily: FONTS.PoppinsSemiBold,
            }}
          >
            New Job Request Accepted
          </Text>
          <Text
            style={{
              fontSize: scale(14),
              color: "#738485",
              fontFamily: FONTS.PoppinsLight,
              marginTop: scale(15),
            }}
          >
            Thanks! You have accepted job request for
            <Text
              style={{
                color: "#43686A",
                fontFamily: FONTS.PoppinsMedium,
                fontSize: scale(14),
              }}
            >
              {" "}
              {selectedNotification?.designation?.name}{" "}
            </Text>
            scheduled on
            <Text
              style={{
                color: "#43686A",
                fontSize: scale(14),
                fontFamily: FONTS.PoppinsMedium,
              }}
            >
              {" "}
              {moment(selectedNotification?.start_date).format("D MMM")} -{" "}
              {moment(selectedNotification?.end_date).format("D MMM, YYYY")}.
            </Text>{" "}
            You will get notify when your job will start.
          </Text>
          <View
            style={{
              borderWidth: scale(0.5),
              borderColor: "#0000001A",
              marginTop: scale(15),
            }}
          />
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              goBack();
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: scale(20),
            }}
          >
            <Text
              style={{
                color: "#05A1AB",
                fontSize: scale(16),
                fontFamily: FONTS.PoppinsMedium,
              }}
            >
              Okay
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Notifications;
