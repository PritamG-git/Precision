import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { scale, } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import { styles } from "./SetStatusStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const data = [
  {
    id: 1,
    Day: "Tu",
    Date: 1,
    Status: "Every Tuesday",
  },
  {
    id: 2,
    Date: 2,
    Day: "We",
    Status: "On Call",
  },
  {
    id: 3,
    Date: 3,
    Day: "Th",
    Status: "Available",
  },
  {
    id: 4,
    Date: 4,
    Day: "Fr",
    Status: "Available but working on a case",
  },
];

const SetStatus = (props) => {
  const [accepted, setAccepted] = useState(false);

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
              {item.Day}
            </Text>
            <Text
              style={{
                color: "#738485",
                fontFamily: FONTS.PoppinsSemiBold,
                fontSize: scale(18),
              }}
            >
              {item.Date}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#E1F3F2",
              flex: 1,
              padding: scale(8),
              borderRadius: scale(12),
            }}
          >
            <Text style={{ color: "#43686A", fontFamily: FONTS.PoppinsMedium, fontSize: scale(14) }}>
              {item.Status}
            </Text>
          </TouchableOpacity>
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

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#00BCD4"
        translucent
      />
      <Header
        back
        EditImage={true}
        Uri={require("../../assets/Home/greenEdit.png")}
        editcer={"EditStatus"}
        tintColor
      />
      <View style={{ marginHorizontal: scale(15) }}>
        <Text style={styles.setStatus}>Set Status</Text>
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
          <TouchableOpacity>
            <Icon name="chevron-left" size={scale(25)} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: scale(16),
              color: "#43686A",
              fontFamily: FONTS.PoppinsMedium,
            }}
          >
            November 2022
          </Text>
          <TouchableOpacity>
            <Icon name="chevron-right" size={scale(25)} />
          </TouchableOpacity>
        </View>

        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default SetStatus;
