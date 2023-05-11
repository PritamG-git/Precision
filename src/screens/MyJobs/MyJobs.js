import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { scale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./MyJobsStyles";
import { OnGoingCard } from "../../components/OnGoingCard";
import { UserController } from "@/controllers";
import { useFocusEffect } from "@react-navigation/native";
import { BaseScreen } from "@/components/BaseScreen";
import { Loader } from "@/components/Loader";

const MyJobs = (props) => {
  const [active, setActive] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJobs = async () => {
    setLoading(true)
    setJobs([]);
    try {
      const res = await UserController.getJobs(active ? 6 : 4);
      res.payload ? setJobs(res.payload.data) : setJobs([]);
    } catch (error) {
      setJobs([]);
    } finally {
      setLoading(false)
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getJobs();
    }, [active])
  );

  return (
    <BaseScreen>
      <Header rightIcon={true} />
      <View style={{ paddingHorizontal: scale(20) }}>
        <Text style={styles.myJobs}>My Jobs</Text>
        <View style={styles.ongoingCompletedBox}>
          <TouchableOpacity
            onPress={() => setActive(false)}
            style={{ flex: 1 }}
          >
            {active ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: FONTS.PoppinsSemiBold,
                  }}
                >
                  On Going
                </Text>
              </View>
            ) : (
              <LinearGradient
                style={styles.onGoingGradientStyle}
                colors={["#2CC7D1", "#2CC7D1", "#FFFFFF"]}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: FONTS.PoppinsSemiBold,
                  }}
                >
                  On Going
                </Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActive(true)} style={{ flex: 1 }}>
            {!active ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: FONTS.PoppinsSemiBold,
                  }}
                >
                  Completed
                </Text>
              </View>
            ) : (
              <LinearGradient
                style={styles.completedGradientStyle}
                colors={["#2CC7D1", "#2CC7D1", "#FFFFFF"]}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: FONTS.PoppinsSemiBold,
                  }}
                >
                  Completed
                </Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>

        {!loading ? jobs?.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={jobs}
            renderItem={({ item, index }) => (
              <OnGoingCard
                newScreen={"JobDetails"}
                strip={active ? "#00B856" : "#2680EB"}
                {...item}
                refreshFunc={getJobs}
              />
            )}
          />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: "#43686A",
              paddingVertical: scale(65),
              fontSize: scale(18),
            }}
          >
            No {!active ? "ongoing" : "completed"} jobs
          </Text>
        ) : <Loader style={{ top: scale(250) }} />}
      </View>
    </BaseScreen>
  );
};

export default MyJobs;
