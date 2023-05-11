import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { Agenda } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import { Calendar, CalendarList } from "react-native-calendars";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import moment from "moment";
import { Header } from "../../components/Header";
import styles from "./EditStatusStyles";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../../components/Button";
import SelectDropdown from "react-native-select-dropdown";
import { ShadowStyles } from "@/theme";

const EditStatus = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const icon = () => {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={{ justifyContent: "flex-end" }}
          source={require("../../assets/Home/droparrow.png")}
        />
      </View>
    );
  };

  const [notificationArray, setNotificationArray] = useState(date);

  const [active, setActive] = useState({});
  const [click, setClick] = useState(1);
  const [gaurav, setGaurav] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [date, setDate] = useState([]);
  const activeDropDown = useCallback((item) => {
    setIsEnable(!isEnable);
    setActive({ ...active, [item.id]: isEnable });
  }, []);
  useEffect(() => {
    dates();
  }, []);

  const passindex = (index) => {
    setGaurav(!gaurav);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ margin: scale(10) }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: scale(40) }}>
            <Text
              style={{
                color: "#93AFB1",
                fontFamily: FONTS.PoppinsRegular,
                fontSize: scale(12),
              }}
            >
              {item.dayName}
            </Text>
            <Text
              style={{
                color: "#738485",
                fontFamily: FONTS.PoppinsSemiBold,
                fontSize: scale(18),
              }}
            >
              {item.date}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                if (active == index) {
                  setActive(-1);
                } else {
                  setActive(index);
                }
              }}
              style={{
                backgroundColor: "#EBF0F1",
                width: scale(220),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                borderRadius: moderateScale(10),
              }}
            >
              <Text
                style={{
                  color: "#93AFB1",
                  fontSize: moderateScale(12),
                  fontFamily: FONTS.PoppinsLight,
                }}
              >
                Select Status
              </Text>
              <Image source={require("../../assets/Home/droparrow.png")} />
            </TouchableOpacity>

            {active == index ? (
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  bottom: 7,
                  borderBottomEndRadius: 10,
                  borderBottomLeftRadius: 10,
                  padding: 10,
                  elevation: 4,
                }}
              >
                <Text
                  style={{ color: "#43686A", fontStyle: FONTS.PoppinsLight }}
                >
                  On Call
                </Text>
                <Text
                  style={{ color: "#43686A", fontStyle: FONTS.PoppinsLight }}
                >
                  Available
                </Text>
                <Text
                  style={{ color: "#43686A", fontStyle: FONTS.PoppinsLight }}
                >
                  Available but working on a case
                </Text>
                <Text
                  style={{ color: "#43686A", fontStyle: FONTS.PoppinsLight }}
                >
                  Unspecified
                </Text>
                <Text
                  style={{ color: "#43686A", fontStyle: FONTS.PoppinsLight }}
                >
                  Already working on shift
                </Text>
                <Text
                  style={{ color: "#43686A", fontStyle: FONTS.PoppinsLight }}
                >
                  Unavailable
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text
                    style={{
                      color: "#05A1AB",
                      fontSize: moderateScale(12),
                      fontFamily: FONTS.PoppinsLight,
                      marginTop: verticalScale(10),
                    }}
                  >
                    Set Custom Availability
                  </Text>
                  <View>
                    <Modal backdropOpacity={0.4} isVisible={isModalVisible}>
                      <View
                        style={{
                          flex: 0.5,
                          borderRadius: moderateScale(20),
                          backgroundColor: "#FFFFFF",

                          padding: 20,
                        }}
                      >
                        <Text
                          style={{
                            color: "#43686A",
                            fontSize: moderateScale(20),
                            fontFamily: FONTS.PoppinsSemiBold,
                          }}
                        >
                          Set Custom Availability
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#EBF0F1",
                              width: "45%",
                              padding: 10,
                              borderRadius: moderateScale(15),
                              right: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: moderateScale(12),
                                color: "#43686A",
                                fontFamily: FONTS.PoppinsRegular,
                              }}
                            >
                              Time From
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={require("../../assets/Home/time.png")}
                              />
                              <Text
                                style={{
                                  color: "#93AFB1",
                                  fontSize: moderateScale(16),
                                  fontFamily: FONTS.PoppinsLight,
                                  marginLeft: moderateScale(5),
                                }}
                              >
                                10:00 pm
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              backgroundColor: "#EBF0F1",
                              width: "45%",
                              borderRadius: moderateScale(15),
                              padding: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: moderateScale(12),
                                color: "#43686A",
                                fontFamily: FONTS.PoppinsRegular,
                              }}
                            >
                              Time From
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={require("../../assets/Home/time.png")}
                              />
                              <Text
                                style={{
                                  color: "#93AFB1",
                                  fontSize: moderateScale(16),
                                  fontFamily: FONTS.PoppinsLight,
                                  marginLeft: moderateScale(5),
                                }}
                              >
                                10:00 pm
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: "#43686A",
                            fontSize: moderateScale(16),
                            fontFamily: FONTS.PoppinsSemiBold,
                            marginTop: verticalScale(20),
                          }}
                        >
                          Repeat Availability
                        </Text>
                        <FlatList
                          data={[
                            { title: "Every Tuesday" },
                            { title: "Weekly" },
                            { title: "Same Day" },
                          ]}
                          numColumns={2}
                          contentContainerStyle={{
                            width: "100%",
                          }}
                          renderItem={({ item, index }) => (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "50%",
                                alignItems: "center",
                              }}
                            >
                              <TouchableOpacity>
                                <Image
                                  style={{ height: 18, width: 18 }}
                                  source={
                                    index == 0
                                      ? require("../../assets/Home/radiobutton.png")
                                      : require("../../assets/Home/blankradiobutton.png")
                                  }
                                />
                              </TouchableOpacity>
                              <Text
                                style={{
                                  marginLeft: moderateScale(5),
                                  fontSize: moderateScale(15),
                                  color: "#05A1AB",
                                  fontFamily: FONTS.PoppinsLight,
                                }}
                              >
                                {item.title}
                              </Text>
                            </View>
                          )}
                        />
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#05A1AB",
                            padding: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: moderateScale(14),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: moderateScale(16),
                              color: "#FFFFFF",
                              fontFamily: FONTS.PoppinsMedium,
                            }}
                          >
                            Set Availability
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={toggleModal}
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: verticalScale(5),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: moderateScale(16),
                              color: "#43686A",
                              fontFamily: FONTS.PoppinsLight,
                            }}
                          >
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            borderColor: "#DDE3E2",
            borderWidth: scale(0.5),
            width: "90%",
            marginTop: scale(15),
            alignSelf: 'flex-end'
          }}
        />
      </View>
    );
  };

  var today = new Date();
  var priorDate = new Date(new Date().setDate(today.getDate() - 30));

  var names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [count, setCount] = useState("November 2022");

  const dates = (item) => {
    let current = moment(new Date(), "M").format("M");

    console.log("aaa", moment(item).daysInMonth());
    let date = [];
    date.push({
      date: moment(item).format("DD"),
      dayName: moment(item).format("dd"),
      id: click,
    });

    for (let index = 1; index <= moment(item).daysInMonth() - 1; index++) {
      let datee = moment().add(index, "days").format("DD");
      let dateName = moment().add(index, "days").format("dd");
      date.push({ date: datee, dayName: dateName, id: index });
    }
    moment(item).format("M") < current ? null : setDate(date);
  };
  const incrementMonth = () => {
    setIncre(moment(incre).add(1, "M"));
    dates(moment(incre).add(1, "M"));
  };

  const decrementMonth = () => {
    let current = moment(new Date(), "M").format("M");

    moment(incre).format("M") == current
      ? null
      : setIncre(moment(incre).subtract(1, "M"));
    dates(moment(incre).subtract(1, "M"));
  };

  const datee = moment().format("Do");
  const [incre, setIncre] = useState(new Date());
  const inThirtyDays = moment().add("days");
  const day = moment().format("MMMM YYYY");
  const [open, setOpen] = useState();
  const [value, setValue] = useState();
  const [items, setItems] = React.useState({});
  const [itemss, setItemss] = useState([
    { label: "On Call", value: "On Call" },
    { label: "Available", value: "Available" },
    {
      label: "Available but working on a case",
      value: "Available but working on a case",
    },
    { label: "Unspecified", value: "Unspecified" },
    { label: "Already working on shift", value: "Already working on shift" },
  ]);

  return (
    <View style={styles.container}>
      <Header back tintColor />
      <View style={{ marginHorizontal: scale(15) }}>
        <Text style={styles.setStatusStyl}>Set Status</Text>
        <Text style={styles.availStatus}>
          Set your availability status by the date.
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: scale(15),
            marginHorizontal: scale(30),
          }}
        >
          <TouchableOpacity onPress={decrementMonth}>
            <Icon name="chevron-left" size={scale(25)} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: scale(16),
              color: "#43686A",
              fontFamily: FONTS.PoppinsMedium,
            }}
          >
            {moment(incre).format("MMMM YYYY")}
          </Text>

          <TouchableOpacity onPress={incrementMonth}>
            <Icon name="chevron-right" size={scale(25)} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={date}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={{ ...ShadowStyles.shadow, position: 'absolute', zIndex: 10000, bottom: scale(10), width: '90%', alignSelf: 'center' }}>
        <Button title="Set" />
      </View>
    </View>
  );
};

export default EditStatus;
