import { View, Text, Image, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { scale } from "react-native-size-matters";
import { styles } from "./HourLogs.styles";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import { UserController } from "@/controllers";
import { showMessage } from "react-native-flash-message";
import { Loader } from "@/components/Loader";

const HourLogs = (props) => {
  const selectedJobId = props.route.params.id;

  const [logsData, setLogsData] = useState([]);
  const [totalhr, setTotalhr] = useState(null);
  const [loading, setLoading] = useState(false);

  const getHourLogs = async () => {
    setLoading(true)
    try {
      const res = await UserController.getHourLogs(selectedJobId);
      if (res?.payload?.total_hours) {
        setLogsData(res.payload.jobs.data);
        setTotalhr(res.payload.total_hours);
      } else {
        setLogsData([]);
      }
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
      setLogsData([]);
    } finally {
      setLoading(false)
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getHourLogs();
    }, [])
  );

  function toTime(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header back={true} tintColor="#05A1AB" />

      {!loading ? <View style={{ paddingHorizontal: scale(15), paddingTop: scale(10) }}>
        <Text style={styles.hourLogsTxt}>Hour Logs</Text>
        <View
          style={{
            shadowColor: "#f9ddcb",
            borderRadius: scale(20),
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: scale(20),
            elevation: scale(25),
          }}
        >
          <Image
            style={{
              width: scale(330),
              height: scale(132),
              borderRadius: scale(20),
              alignSelf: "center",
            }}
            source={require("../../assets/HourLogs/hourlogs.png")}
            resizeMode="contain"
          />

          <View style={styles.imageInnerView}>
            <Text style={styles.imageInnerTxt}>
              {toTime(totalhr)}
              {/* {Math.floor(totalhr / 3600) == 0 ? Math.floor(totalhr / 60) == 0 ? `${totalhr} Secs` : `${Math.floor(totalhr / 60)} Mins` : `${Math.floor(totalhr / 3600)} Hrs`} */}
            </Text>
            <Text style={styles.imageInnerTxt2}>Total hrs logged till now</Text>
          </View>
        </View>

        <Text style={styles.listHeadTxt}>Daily Hrs Logged</Text>

        <FlatList
          data={logsData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.flatListView}>
              <View
                style={[
                  styles.sideBar,
                  {
                    backgroundColor: "#2680EB",
                  },
                ]}
              />
              <View style={{ width: "92%" }}>
                <View style={styles.listInnerSectionView}>
                  <Text style={styles.dateTxt}>
                    {moment(item.start_date_time).format("ddd DD MMM, YYYY")}
                  </Text>
                  <Text style={styles.listHoursTxt}>
                    {toTime(totalhr)}
                    {/* {Math.floor(totalhr / 3600) == 0 ? Math.floor(totalhr / 60) == 0 ? `${totalhr} Secs` : `${Math.floor(totalhr / 60)} Mins` : `${Math.floor(totalhr / 3600)} Hrs`} */}
                  </Text>
                </View>
                <View style={styles.listInnerSectionView}>
                  <Text style={styles.timeinTxt}>
                    Time in : {moment(item.start_date_time).format("hh:mm a")}
                  </Text>
                  {item.end_date_time && (
                    <Text style={styles.timeinTxt}>
                      Time Out : {moment(item.end_date_time).format("hh:mm a")}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View> : <Loader />}
    </SafeAreaView>
  );
};

export default HourLogs;
