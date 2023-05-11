import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { ms, scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { goBack, navigate } from "../../navigation/NavigationRef";
import { NAVIGATION } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getUser } from "../../selectors/UserSelectors";
import moment from "moment";
import { BaseScreen } from "@/components/BaseScreen";
import { UserController } from "@/controllers";
import { showMessage } from "react-native-flash-message";
import { Loader } from "@/components/Loader";

const ShiftManagementDetails = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const shiftId = props.route.params.id;

  const [shiftDetail, setShiftDetail] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteJobModal, setDeleteJobModal] = useState(false);
  const [requestDeleteModal, setrequestDeleteModal] = useState(false);
  const [loading, setloading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getShiftDetails();
    }, [])
  );

  const getShiftDetails = async () => {
    setloading(true);
    try {
      const res = await UserController.shiftsdetail(shiftId);
      setShiftDetail(res.payload);
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    } finally {
      setloading(false);
    }
  };

  const callModal = async () => {
    toggle();
    try {
      await UserController.shiftsdeleteapi(shiftId);
      toggleDeleted();
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
  };

  const goBackdscreen = () => {
    goBack();
    setrequestDeleteModal(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggle = () => {
    setDeleteJobModal(!deleteJobModal);
  };

  const toggleDeleted = () => {
    setrequestDeleteModal(!requestDeleteModal);
  };

  const DateTimeSection = () => {
    return (
      <View style={{ marginTop: scale(22) }}>
        <Text
          style={{
            fontFamily: FONTS.PoppinsLight,
            color: "#93AFB1",
          }}
        >
          Scheduled {shiftDetail?.shift_type == 1 && "(Full Time)"}
          {shiftDetail?.shift_type == 2 && "(Half Time)"}
          {shiftDetail?.shift_type == 3 && "(Hourly)"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: scale(10),
          }}
        >
          <View style={styles.dateTimeTxt}>
            <Image source={require("../../assets/Home/calendar.png")} />
            <Text style={styles.dateTimeTxt2}>
              {moment(shiftDetail?.start_date).format("DD MMM, YYYY")}
            </Text>
          </View>

          <View
            style={{
              borderWidth: scale(0.5),
              borderColor: "#D4DFE0",
              marginHorizontal: scale(5),
              height: scale(20),
            }}
          />

          <View style={styles.dateTimeTxt}>
            <Icon name="clock-time-five" size={scale(20)} color="#43686A" />
            <Text style={styles.dateTimeTxt2}>
              {moment(shiftDetail?.time_start).format('LT')} - {moment(shiftDetail?.time_end).format('LT')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const DescriptionSection = () => {
    return (
      <View style={{ marginVertical: scale(15) }}>
        <Text style={{ fontFamily: FONTS.PoppinsLight, color: "#93AFB1", marginBottom: ms(5) }}>
          Description
        </Text>

        <Text
          style={{
            fontFamily: FONTS.PoppinsLight,
            fontSize: scale(13),
            color: "#43686A",
          }}
        >
          {shiftDetail.description}
        </Text>
      </View>
    );
  };

  const CustomModal = () => {
    return (
      <Modal backdropOpacity={0.75} isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: "white",
            padding: scale(10),
            borderRadius: scale(20),
          }}
        >
          <Text
            style={{
              color: "#43686A",
              fontSize: scale(20),
              fontFamily: FONTS.PoppinsSemiBold,
              marginTop: scale(20),
              marginLeft: scale(10),
            }}
          >
            More...
          </Text>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              navigate(NAVIGATION.createshift, { shiftDetail });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: scale(10),
            }}
          >
            <Image source={require("../../assets/Home/pencil.png")} />
            <Text
              style={{
                fontSize: scale(18),
                fontFamily: FONTS.PoppinsRegular,
                marginLeft: scale(10),
                color: "#738485",
              }}
            >
              Edit Shift
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              toggleModal();
              toggle();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: scale(10),
            }}
          >
            <Image source={require("../../assets/Home/bin.png")} />
            <Text
              style={{
                fontSize: scale(18),
                fontFamily: FONTS.PoppinsRegular,
                marginLeft: scale(10),
                color: "#738485",
              }}
            >
              Delete Shift
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              borderWidth: scale(0.4),
              borderColor: "#D6DADB",
            }}
          />

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: scale(10),
            }}
            onPress={toggleModal}
          >
            <Text
              style={{
                color: "#05A1AB",
                fontFamily: FONTS.PoppinsMedium,
                fontSize: scale(16),
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const DeleteJobModal = () => {
    return (
      <View>
        <Modal backdropOpacity={0.7} isVisible={deleteJobModal}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: scale(10),
              borderRadius: scale(20),
            }}
          >
            <Text
              style={{
                color: "#43686A",
                fontSize: scale(20),
                fontFamily: FONTS.PoppinsSemiBold,
                marginTop: scale(20),
              }}
            >
              Delete Shift
            </Text>
            <Text
              style={{
                fontSize: scale(14),
                fontFamily: FONTS.PoppinsLight,
                color: "#738485",
                marginTop: scale(15),
              }}
            >
              Are you sure? You want to delete shift created on{" "}
              {moment(shiftDetail.created_at).format("LL")}.
            </Text>
            <View
              style={{
                width: "100%",
                borderWidth: scale(0.4),
                borderColor: "#D6DADB",
                marginVertical: scale(10),
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: verticalScale(5),
              }}
            >
              <TouchableOpacity onPress={toggle}>
                <Text
                  style={{
                    color: "#43686A",
                    fontSize: scale(16),
                    fontFamily: FONTS.PoppinsMedium,
                  }}
                >
                  No I'm Not
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: scale(0.5),
                  borderColor: "#D4DFE0",
                  marginHorizontal: scale(5),
                  height: scale(20),
                }}
              />
              <TouchableOpacity onPress={callModal}>
                <Text
                  style={{
                    fontSize: scale(16),
                    fontFamily: FONTS.PoppinsMedium,
                    color: "#FF4040",
                  }}
                >
                  Yes I'm Sure
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const RequestDelete = () => {
    return (
      <View>
        <Modal backdropOpacity={0.7} isVisible={requestDeleteModal}>
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
                marginTop: scale(10),
              }}
            >
              Request Deleted
            </Text>
            <Text
              style={{
                fontSize: scale(15),
                fontFamily: FONTS.PoppinsLight,
                marginTop: scale(10),
              }}
            >
              Your shift has been successfully deleted.
            </Text>

            <View
              style={{
                width: "100%",
                borderWidth: scale(0.4),
                borderColor: "#D6DADB",
                marginVertical: scale(10),
              }}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: scale(10),
              }}
              onPress={() => goBackdscreen()}
            >
              <Text
                style={{
                  color: "#05A1AB",
                  fontFamily: FONTS.PoppinsMedium,
                  fontSize: scale(16),
                }}
              >
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <BaseScreen>
      <ScrollView>
        <Header
          back
          rightButton
          toggleModal={toggleModal}
          imageUri={require("../../assets/Home/threeDots.png")}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.shiftTextStyles}>Shift Management</Text>
          <Text style={styles.shiftTextStyles}>Details</Text>
          <View
            style={{
              backgroundColor: "#1EABB4",
              alignSelf: "center",
              paddingVertical: scale(8),
              paddingHorizontal: scale(15),
              borderRadius: scale(10),
              marginVertical: scale(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: scale(14),
                color: "#FFFFFF",
              }}
            >
              {shiftDetail?.user_designation?.name}
            </Text>
          </View>

          <DateTimeSection />

          <Text style={{ fontFamily: FONTS.PoppinsLight, color: "#93AFB1", marginVertical: ms(5) }}>
            Skills
          </Text>
          {user?.profileinfo?.user_skills?.length ? (
            user?.profileinfo?.user_skills?.map((item) => (
              <Text
                style={{
                  fontFamily: FONTS.PoppinsLight,
                  fontSize: scale(13),
                  color: "#43686A",
                  marginBottom: ms(2)
                }}
              >
                • {item.skill}
              </Text>
            ))
          ) : (
            <Text>No skills are added</Text>
          )}

          <DescriptionSection />
          <CustomModal />
          <DeleteJobModal />
          <RequestDelete />
        </View>
        {loading && <Loader />}
      </ScrollView>
    </BaseScreen>
  );
};

export default ShiftManagementDetails;
