import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { styles } from "./MyProfile.styles";
import { scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import { Header } from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { Myprofile } from "../../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../selectors/UserSelectors";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ShadowStyles } from "@/theme";

const MyProfile = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const usersite = `${user?.profileinfo?.user_profiles?.site_?.address}, ${user?.profileinfo?.user_profiles?.site_?.city}, ${user?.profileinfo?.user_profiles?.site_?.territory}`

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = UserProfilee();
      return () => unsubscribe;
    }, [])
  );

  const UserProfilee = () => {
    dispatch(Myprofile());
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6FEFF" }}>
      <Image
        source={require("../../assets/Home/MyProfile.png")}
        style={styles.backImage}
        resizeMode="stretch"
      />

      <Header
        rightIcon={true}
        EditImage={true}
        editcer={"EditProfile"}
        Uri={require("../../assets/Home/whiteedit.png")}
      />
      <View
        style={{
          paddingHorizontal: scale(15),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.MyprofileText}>My Profile</Text>
        {/*        <TouchableOpacity
          onPress={() => props.navigation.navigate("SetStatus")}
        >
          <Text style={styles.setstatusStyle}>Set Status</Text>
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: scale(10),
        }}
      >
        {user?.profileinfo?.user_profiles.profile_photo ? (
          <Image
            style={{
              ...ShadowStyles.shadow,
              width: scale(100),
              height: scale(100),
              borderRadius: scale(20),
            }}
            source={{
              uri: user?.profileinfo?.user_profiles.profile_photo,
            }}
          />
        ) : (
          <Icon name="account" size={scale(95)} color="#93AFB1" />
        )}
        <Text
          style={{ fontSize: scale(16), color: "#FFFFFF", marginTop: scale(5) }}
        >
          {user?.profileinfo?.user_profiles.fullname}
        </Text>
        <Text style={styles.RadiologyStyle}>
          {user?.profileinfo?.user_designation?.designation?.name}
        </Text>
        <Text style={styles.gmailStyle}>
          {user?.profileinfo?.email}
        </Text>
      </View>

      <View
        style={{
          marginTop: verticalScale(60),
          marginHorizontal: scale(15),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: scale(11),
              height: scale(13.44),
            }}
            source={require("../../assets/Home/Locationnn.png")}
            resizeMode="contain"
          />
          <Text style={styles.adressStyle}>
            {usersite}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.overViewStyle}>Overview</Text>

        <View style={{ paddingHorizontal: scale(15), paddingTop: scale(8) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles.boxStyle}>
              <Image
                source={require("../../assets/Home/bag.png")}
                resizeMode="contain"
                style={{ width: scale(35), height: scale(35) }}
              />
              <Text style={styles.countStyle}>
                {user?.profileinfo?.employee_completed_jobs.length}
              </Text>
              <Text style={styles.textStyleBox}>Total Jobs Done</Text>
            </View>

            <View style={styles.boxStyle}>
              <Image
                style={{ width: scale(35), height: scale(35) }}
                source={require("../../assets/Home/savee.png")}
                resizeMode="contain"
              />
              <Text style={styles.countStyle}>{user?.profileinfo?.last_month_completed_jobs}</Text>
              <Text style={styles.textStyleBox}>Jobs Done Last Month</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: scale(20),
            }}
          >
            <TouchableOpacity
              style={styles.boxStyle}
              onPress={() => props.navigation.navigate("Certificates")}
            >
              <Image
                resizeMode="contain"
                source={require("../../assets/Home/Degree.png")}
                style={{ width: scale(35), height: scale(35) }}
              />
              <Text style={styles.countStyle}>
                {user?.profileinfo?.user_documents.length}
              </Text>
              <Text style={styles.textStyleBox}>Certificates</Text>
            </TouchableOpacity>

            <View
              style={{
                width: scale(140),
                height: scale(140),
              }}
            />
          </View>
        </View>

        <Text
          style={{
            color: "#93AFB1",
            fontFamily: FONTS.PoppinsLight,
            fontSize: scale(11),
            marginTop: scale(30),
            marginBottom: scale(10),
            alignSelf: "center",
          }}
        >
          v1.0 All Rights Reserved
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
