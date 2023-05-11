import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./HospitalStyles";
import { Header } from "../../components/Header";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import moment from "moment";
import { useDispatch } from "react-redux";
import { BaseScreen } from "@/components/BaseScreen";
import { UserController } from "@/controllers";
import { goBack } from "@/navigation/NavigationRef";

const HospitalDetails = (props) => {
  const dispatch = useDispatch();
  const jobDetails = JSON.parse(props.route.params?.jobdata?.data)
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const acceptejob = async (id, status) => {
    const data = {
      status
    };
    try {
      const res = await UserController.updatejobstatus(data, id, props.route.params?.jobdata?.id)
      if (res.payload && status == 4) {
        setModalVisible(!isModalVisible);
      } else {
        goBack()
      }
    } catch (err) {

    }
  };

  const DescriptionSection = () => {
    return (
      <View style={{ marginTop: scale(20) }}>
        <Text style={{ fontFamily: FONTS.PoppinsLight, color: "#93AFB1", fontSize: scale(14) }}>
          Description
        </Text>

        <Text style={{ color: "#43686A", fontFamily: FONTS.PoppinsLight, fontSize: scale(14) }}>
          {jobDetails.description}
        </Text>
      </View>
    );
  };

  const DateTimeSection = () => {
    return (
      <View>
        <Text style={{ fontFamily: FONTS.PoppinsLight, color: "#93AFB1" }}>
          Scheduled {jobDetails?.shift_type == 1 ? '(Full Time)' : jobDetails?.shift_type == 2 ? '(Half Time)' : '(Hourly)'}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: scale(5) }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: scale(13), height: scale(15) }}
              source={require("../../assets/Home/calendar.png")}
              resizeMode="contain"
            />
            <Text style={styles.dateTxt}>{moment(jobDetails.start_date).format('D MMM')} - {moment(jobDetails.end_date).format('D MMM, YYYY')}</Text>
          </View>


          <View
            style={{
              borderWidth: scale(0.5),
              borderColor: "#D4DFE0",
              marginHorizontal: scale(5),
              height: scale(20)
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={require("../../assets/Home/timee.png")} resizeMode="contain" style={{ width: scale(15), height: scale(15) }} />
            <Text style={styles.dateTxt}>{moment(jobDetails.time_start).format('LT')} - {moment(jobDetails.time_end).format('LT')}</Text>
          </View>
        </View>
      </View>
    );
  };

  const JohnSmith = () => {
    return (
      <View style={{ marginTop: scale(20) }}>
        <Text style={{ color: "#93AFB1", fontSize: scale(14), fontFamily: FONTS.PoppinsLight }}>
          Requested By
        </Text>
        <View style={{ flexDirection: "row", marginTop: scale(10) }}>
          <Image style={{ height: scale(30), width: scale(30), borderRadius: scale(6) }} resizeMode="contain" source={{ uri: jobDetails?.posted_by_data?.user_profiles?.profile_photo }} />
          <Text
            style={{
              color: "#43686A",
              fontSize: scale(16),
              marginLeft: scale(10),
              fontFamily: FONTS.PoppinsMedium,
            }}
          >
            {jobDetails?.posted_by_data?.user_profiles?.fullname}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <BaseScreen>
      <Header back />

      <View style={{ flexDirection: "row", marginLeft: scale(15), alignItems: 'center', marginTop: scale(5) }}>
        <Image
          source={require("../../assets/Home/marker.png")}
          style={{ height: scale(24), width: scale(20) }}
          resizeMode="contain"
        />
        <Text style={styles.mercytextStyle}>{jobDetails.sites?.name}, {jobDetails.sites?.city}</Text>
      </View>
      <Text
        style={{
          color: "#FFFFFF",
          fontFamily: FONTS.PoppinsRegular,
          fontSize: scale(11),
          alignSelf: 'center'
        }}
      >
        {jobDetails?.sites?.address}, {jobDetails?.sites?.territory}, {jobDetails?.sites?.city}
      </Text>
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#FFFFFF10",
          alignItems: "center",
          alignSelf: "center",
          paddingVertical: scale(8),
          paddingHorizontal: scale(15),
          marginTop: scale(20),
          borderRadius: scale(10),
        }}
      >
        <Text
          style={{
            fontSize: scale(14),
            color: "#FFFFFF",
          }}
        >
          {jobDetails.designation?.name}
        </Text>
      </View>

      <ScrollView style={{ marginTop: scale(50), paddingHorizontal: scale(15) }} showsVerticalScrollIndicator={false}>
        <DateTimeSection />

        <JohnSmith />

        <DescriptionSection />

        {jobDetails?.status == 2 &&
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: scale(20),
            }}
          >
            <TouchableOpacity
              onPress={() => acceptejob(jobDetails.id, 5)}
              style={{
                width: "47%",
                backgroundColor: "#43686A",
                paddingHorizontal: scale(40),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(14),
                paddingVertical: scale(15)
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontFamily: FONTS.PoppinsMedium }}
              >
                Reject
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => acceptejob(jobDetails.id, 4)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#05A1AB",
                paddingHorizontal: scale(40),
                borderRadius: scale(14),
                width: "45%",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontFamily: FONTS.PoppinsMedium }}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </View>}
      </ScrollView>

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
              {jobDetails?.designation?.name}{" "}
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
              {moment(jobDetails.start_date).format('D MMM')} - {moment(jobDetails.end_date).format('D MMM, YYYY')}.
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
            onPress={() => { toggleModal(); goBack() }}
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
    </BaseScreen>
  );
};

export default HospitalDetails;
