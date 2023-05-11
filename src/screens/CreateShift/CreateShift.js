import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import DatePicker from "react-native-date-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scale, moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { COLOR } from "../../constants/colors/colors";
import { FONTS } from "../../theme/fonts";
import { styles } from "./CreateShift.styles";
import { getUser } from "../../selectors/UserSelectors";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { UserController } from "@/controllers";
import { HandleUnhandledTouches } from "@/utils/GlobalMethods";
import { ScreenTitle } from "@/components/ScreenTitle";

export function CreateShift(props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const Data = [
    { name: "Full Time", value: 1 },
    { name: "Half Time", value: 2 },
    { name: "Hourly", value: 3 },
  ];
  const designation = user.userinfo.user.user_designation;
  const isEditDetails = props.route.params?.shiftDetail;

  const [open, setOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [start_date, setstart_date] = useState(
    isEditDetails ? new Date(isEditDetails.start_date) : new Date()
  );
  const [time_start, settime_start] = useState(
    isEditDetails ? isEditDetails.time_start : null
  );
  const [time_end, settime_end] = useState(
    isEditDetails ? isEditDetails.time_end : null
  );
  const [description, setdescription] = useState(
    isEditDetails ? isEditDetails.description : null
  );
  const [shift_type, setshift_type] = useState(
    isEditDetails ? isEditDetails.shift_type : 1
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  const handleConfirm = (date) => {
    if (
      moment(start_date).format("YYYY-MM-DD") ==
      moment(new Date()).format("YYYY-MM-DD")
    ) {
      if (moment(date).format("HH:mm") >= moment(new Date()).format("HH:mm")) {
        settime_start(moment(date).utc().toISOString());
        setDatePickerVisibility(false);
      } else {
        alert("Past time Cannot be Added");
        setDatePickerVisibility(false);
      }
    } else {
      settime_start(moment(date).utc().toISOString());
      setDatePickerVisibility(false);
    }
  };

  const handleConfirm2 = (date) => {
    if (
      moment(start_date).format("YYYY-MM-DD") ==
      moment(new Date()).format("YYYY-MM-DD")
    ) {
      if (moment(date).format("HH:mm") >= moment(new Date()).format("HH:mm")) {
        settime_end(moment(date).utc().toISOString());
        setDatePickerVisibility2(false);
      } else {
        alert("Past time Cannot be Added");
        setDatePickerVisibility2(false);
      }
    } else {
      settime_end(moment(date).utc().toISOString());
      setDatePickerVisibility2(false);
    }
  };


  const Validation = async () => {
    if (!start_date) {
      showMessage({
        message: "Please Select start date",
        type: "danger",
      });
      return;
    }
    if (!shift_type) {
      showMessage({
        message: "Please Select shift type",
        type: "danger",
      });
      return;
    }
    if (!time_start) {
      showMessage({
        message: "Please Select Time from",
        type: "danger",
      });
      return;
    }
    if (!time_end) {
      showMessage({
        message: "Please Select Time to",
        type: "danger",
      });
      return;
    }
    if (shift_type == 1 && moment(time_end).diff(moment(time_start), 'hours') < 8) {
      showMessage({
        message: "Please select atleast 8 hrs",
        type: "danger",
      });
      return;
    }
    if (shift_type == 2 && moment(time_end).diff(moment(time_start), 'hours') < 4) {
      showMessage({
        message: "Please select atleast 4 hrs",
        type: "danger",
      });
      return;
    }
    if (!description) {
      showMessage({
        message: "Please Enter Description",
        type: "danger",
      });
      return;
    }

    const datasave = {
      designation_id: designation.designation_id,
      start_date: time_start,
      shift_type,
      time_start: time_start,
      time_end: time_end,
      description,
    }

    try {
      const res = isEditDetails
        ? await UserController.editshift(isEditDetails.id, datasave)
        : await UserController.createshifts(datasave);
      if (res.payload) {
        setShowModal(true);
      }
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
  };

  const PopUp = () => {
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalView}>
          <View style={styles.modalInnerView}>
            <Text style={styles.modalTitleTxt}>Shift Management</Text>
            <View style={styles.modalContentView}>
              <Text style={styles.desTxt}>
                Thank You! Your request for{" "}
                <Text style={styles.shiftTxt}> Shift Management </Text> has been
                {isEditDetails ? " updated" : " created"} successfully.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.okayView}
            >
              <Text style={styles.okayTxt}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      onStartShouldSetResponder={HandleUnhandledTouches}
    >
      <Header back tintColor />
      <ScrollView style={styles.container}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          // is24Hour={true}
          date={new Date(start_date)}
          minimumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <DateTimePickerModal
          isVisible={time_start && isDatePickerVisible2}
          mode="time"
          date={new Date(time_start)}
          // is24Hour={true}
          minimumDate={new Date(time_start)}
          onConfirm={handleConfirm2}
          onCancel={() => setDatePickerVisibility2(false)}
        />
        {showModal && <PopUp />}
        <ScreenTitle
          title={`${isEditDetails ? "Edit" : "Create"} Shift Management`}
          description={`${isEditDetails ? "Edit" : "Add"} details for shift.`}
        />

        {/* SELECT ROLE SECTION */}
        <View style={{ marginVertical: scale(8) }}>
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: scale(16),
              color: COLOR.HeadingColor,
              marginBottom: scale(5),
            }}
          >
            Role
          </Text>
          <View
            style={{
              backgroundColor: "#E5F5F7",
              paddingVertical: scale(8),
              paddingHorizontal: scale(15),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: scale(10),
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "#05A1AB", fontSize: scale(14) }}>
              {designation?.designation?.name}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setOpen(true)} style={styles.TxtInput}>
          <Text style={styles.addTxt}>Available From (Date)</Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Image
              style={{ width: scale(19), height: scale(21) }}
              source={require("../../assets/Home/calender.png")}
            />
            <Text style={styles.chooseTxt}>
              {moment(start_date).format("D MMM, YYYY")}
            </Text>
          </View>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={start_date}
          minimumDate={new Date()}
          onConfirm={(date) => {
            setOpen(false);
            setstart_date(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode={"date"}
        />

        <Text style={styles.addedTxt}>Shift Type</Text>
        <FlatList
          data={Data}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setshift_type(item.value)}
              style={styles.listView}
              key={index}
            >
              <Image
                style={{ height: scale(15), width: scale(15) }}
                resizeMode="contain"
                source={
                  item.value == shift_type
                    ? require("../../assets/Home/radiobutton.png")
                    : require("../../assets/Home/blankradiobutton.png")
                }
              />
              <Text
                style={{
                  paddingHorizontal: moderateScale(8),
                  color: "#93AFB1",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />


        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: scale(10),
          }}
        >
          <TouchableOpacity
            style={{ ...styles.TxtInput, width: "47%" }}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text style={styles.addTxt}>Time From</Text>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Icon name="clock" color={"#93AFB1"} size={scale(22)} />
              <Text style={styles.chooseTxt}>
                {time_start ? moment(time_start).format('LT') : "Select time"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.TxtInput, width: "47%" }}
            onPress={() => setDatePickerVisibility2(true)}
          >
            <Text style={styles.addTxt}>Time To</Text>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Icon name="clock" color={"#93AFB1"} size={scale(22)} />
              <Text style={styles.chooseTxt}>
                {time_end ? moment(time_end).format('LT') : "Select time"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.TxtInput, { marginVertical: scale(15) }]}>
          <Text style={styles.addTxt}>Description</Text>
          <TextInput
            onChangeText={(text) => setdescription(text)}
            style={styles.textInputStyle}
            textAlignVertical={"top"}
            multiline={true}
            placeholder={"Write..."}
            numberOfLines={6}
            value={description}
          />
        </View>

        <Button
          onPress={Validation}
          title={isEditDetails ? "Save Changes" : "Create"}
          style={styles.bottomBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
