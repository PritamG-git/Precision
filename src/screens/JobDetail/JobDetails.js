import { BaseScreen } from "@/components/BaseScreen";
import { Loader } from "@/components/Loader";
import { UserController } from "@/controllers";
import { goBack } from "@/navigation/NavigationRef";
import { getUser } from "@/selectors/UserSelectors";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { FONTS } from "../../theme/fonts";
import { styles } from "./JobDetails.styles";

export function JobDetails(props) {
  const user = useSelector(getUser);
  const jobId = props.route.params.id;

  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getJobDetails();
    }, [])
  );

  const getJobDetails = async () => {
    setLoading(true);
    try {
      const res = await UserController.getJobDetails(jobId);
      setJobDetails(res.payload);
    } catch (error) {
      showMessage({
        message: "Something went wrong.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const timeIn = async () => {
    let param = {
      job_id: jobDetails.id,
      start_date_time: moment().utc().toISOString(),
      user_id: user?.userinfo?.id,
    };
    try {
      const res = await UserController.timeIn(param);
      showMessage({
        message: res.msg,
        type: "success",
      });
      res.payload && getJobDetails();
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
  };

  const timeOut = async () => {
    let param = {
      end_date_time: moment().utc().toISOString(),
      total: moment().diff(
        moment(jobDetails?.job_hours[0]?.start_date_time),
        "seconds"
      ),
    };
    try {
      const res = await UserController.timeOut(
        jobDetails?.job_hours[0]?.id,
        param
      );
      showMessage({
        message: res.msg,
        type: "success",
      });
      res.payload && getJobDetails();
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
  };

  const rejectJob = async () => {
    const data = { status: 5 };
    try {
      const res = await UserController.updatejobstatus(
        data,
        jobId,
      );
      goBack();
    } catch (err) { }
  };

  const DescriptionSection = () => {
    return (
      <View style={{ marginTop: scale(20) }}>
        <Text
          style={{
            fontFamily: FONTS.PoppinsLight,
            color: "#93AFB1",
            fontSize: scale(14),
            marginBottom: scale(5)
          }}
        >
          Description
        </Text>

        <Text
          style={{
            color: "#43686A",
            fontFamily: FONTS.PoppinsLight,
            fontSize: scale(14),
          }}
        >
          {jobDetails.description}
        </Text>
      </View>
    );
  };

  const DateTimeSection = () => {
    return (
      <View>
        <Text style={{ fontFamily: FONTS.PoppinsLight, color: "#93AFB1" }}>
          Scheduled{" "}
          {jobDetails?.shift_type == 1
            ? "(Full Time)"
            : jobDetails?.shift_type == 2
              ? "(Half Time)"
              : "(Hourly)"}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: scale(5),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: scale(13), height: scale(15) }}
              source={require("../../assets/Home/calendar.png")}
              resizeMode="contain"
            />
            <Text style={styles.dateTxt}>
              {moment(jobDetails.start_date).format("D MMM")} -{" "}
              {moment(jobDetails.end_date).format("D MMM, YYYY")}
            </Text>
          </View>

          <View
            style={{
              borderWidth: scale(0.7),
              borderColor: "#D4DFE0",
              marginHorizontal: scale(5),
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/Home/timee.png")}
              resizeMode="contain"
              style={{ width: scale(13), height: scale(15) }}
            />
            <Text style={styles.dateTxt}>
              {moment(jobDetails.time_start).format("LT")} -{" "}
              {moment(jobDetails.time_end).format("LT")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const JohnSmith = () => {
    return (
      <View style={{ marginTop: scale(20) }}>
        <Text
          style={{
            color: "#93AFB1",
            fontSize: scale(14),
            fontFamily: FONTS.PoppinsLight,
          }}
        >
          Requested By
        </Text>
        <View style={{ flexDirection: "row", marginTop: scale(10) }}>
          <Image
            style={{
              height: scale(30),
              width: scale(30),
              borderRadius: scale(6),
            }}
            resizeMode="contain"
            source={{
              uri: jobDetails?.posted_by_data?.user_profiles?.profile_photo,
            }}
          />
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
      <Header
        rightheaderText={jobDetails.status == 6}
        back={true}
        jobId={jobId}
        jobcompletedtitle={jobDetails.status == 6 ? "Job Completed" : null}
      />
      <View
        style={{
          flexDirection: "row",
          marginLeft: scale(15),
          alignItems: "center",
          marginTop: scale(10),
        }}
      >
        <Image
          style={{ height: scale(24), width: scale(20) }}
          resizeMode="contain"
          source={require("../../assets/Home/marker.png")}
        />
        <Text style={styles.mercytextStyle}>{jobDetails?.sites?.name}</Text>
      </View>

      <Text
        style={{
          color: "#FFFFFF",
          fontFamily: FONTS.PoppinsRegular,
          fontSize: scale(11),
          marginVertical: scale(5),
          marginLeft: scale(47)
        }}
      >
        {jobDetails?.sites?.address}, {jobDetails?.sites?.territory},{" "}
        {jobDetails?.sites?.city}
      </Text>

      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#FFFFFF10",
          alignItems: "center",
          alignSelf: "center",
          paddingVertical: scale(8),
          paddingHorizontal: scale(15),
          marginTop: scale(10),
          borderRadius: scale(10),
        }}
      >
        <Text
          style={{
            fontSize: scale(14),
            color: "#FFFFFF",
          }}
        >
          {jobDetails?.designation?.name}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <DateTimeSection />
        <JohnSmith />
        <DescriptionSection />

        {jobDetails.status == 4 && (
          <View style={{ marginVertical: scale(30) }}>
            <Button
              onPress={() =>
                jobDetails?.status == 4 && !jobDetails?.job_hours?.length
                  ? timeIn()
                  : timeOut()
              }
              title={
                jobDetails?.status == 4 && !jobDetails?.job_hours?.length
                  ? "Time In"
                  : "Time Out"
              }
            />
            {!jobDetails?.job_hours?.length && moment(jobDetails.shift_type === 3 ? jobDetails.time_start : jobDetails.start_date).diff(moment(), 'hours') >= 24 &&
              <Button
                onPress={rejectJob}
                title="Reject"
                style={{ marginVertical: scale(10) }}
              />
            }
          </View>
        )}
      </ScrollView>
      {loading && <Loader />}
    </BaseScreen>
  );
}
