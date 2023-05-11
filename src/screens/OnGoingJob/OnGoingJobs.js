import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";
import { Header } from "../../components/Header";
import { OnGoingCard } from "../../components/OnGoingCard";
import { styles } from "./OnGoingJobs.Styles";
import { useFocusEffect } from "@react-navigation/native";
import { getUser } from "../../selectors/UserSelectors";
import { useDispatch, useSelector } from "react-redux";
import { UserController } from "@/controllers";
import { BaseScreen } from "@/components/BaseScreen";
import { scale, verticalScale } from "react-native-size-matters";
import { ShiftCard } from "@/components/ShiftCard";
import { Loader } from "@/components/Loader";

export function OnGoingJobs(props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const screenId = props.route.params.id

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJobs = async () => {
    setLoading(true)
    try {
      const res = await UserController.getJobs(4)
      res.payload ? setJobs(res.payload.data) : setJobs([])
    } catch (error) {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const getShifts = async () => {
    setLoading(true)
    try {
      const res = await UserController.allshiftsapi()
      res.payload ? setJobs(screenId == 0 ? res.payload.data : res.payload.site) : setJobs([])
    } catch (error) {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      screenId == 0 ? getJobs() : getShifts();
    }, [])
  );

  const SectionTitle = ({ title }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.sectionHeadTxt}>{title}</Text>
      </View>
    );
  };

  return (
    <BaseScreen>
      <Header back />
      <View style={styles.contentContainer}>
        <SectionTitle title={props.route.params.title} />
        {loading ? <Loader style={{ top: verticalScale(250) }} /> : jobs?.length ?
          <FlatList
            data={jobs}
            renderItem={({ item, index }) => (
              screenId == 0 ? <OnGoingCard newScreen={"JobDetails"} refreshFunc={getJobs} {...item} /> : <ShiftCard {...item} />
            )}
          />
          :
          <Text style={{ alignSelf: "center", color: "#43686A", paddingVertical: scale(200), fontSize: scale(18) }}>No {screenId == 0 ? "ongoing jobs" : "shifts are added yet"}</Text>
        }
      </View>
    </BaseScreen>
  );
}
