import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { navigate } from "../../navigation/NavigationRef";
import { styles } from "./Approval.styles";
import { logout } from "../../actions/UserActions";
import { useDispatch, } from "react-redux";
import { scale } from "react-native-size-matters";
import { NAVIGATION } from "@/constants";

export function Approval(props) {
  const dispatch = useDispatch();

  const goscreen = () => {
    props.setModal()
    dispatch(logout())
    navigate(NAVIGATION.login)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000aa",
        padding: scale(20),
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.headingTxt}>{props.title ? props.title : 'Account Approval Pending'}</Text>
          {props.user_profilesdata?.user_profiles.profile_photo &&
            (<View style={styles.userSection}>
              {props.user_profilesdata?.user_profiles.profile_photo ? (
                <Image
                  style={{
                    width: scale(90),
                    height: scale(90),
                    borderRadius: scale(20),
                  }}
                  resizeMode="contain"
                  source={{ uri: props.user_profilesdata?.user_profiles.profile_photo }}
                />
              ) : (
                <Image
                  style={{
                    width: scale(90),
                    height: scale(90),
                    borderRadius: scale(20),
                  }}
                  resizeMode="contain"
                  source={require("../../assets/start/pic.png")} />
              )}
              <View style={{ paddingLeft: scale(5) }}>
                <Text style={styles.nameTxt}>{props.user_profilesdata?.user_profiles.fullname}</Text>
                <Text style={styles.postTxt}>{props.user_profilesdata?.user_designation?.designation?.name}</Text>
                <Text style={styles.emailTxt}>{props.user_profilesdata?.email}</Text>
              </View>
            </View>)
          }
        </View>
        <View>
          <Text style={styles.desTxt}>
            Thank You! Your account details has been submitted to the admin for
            approval. You will receive confirmation email, once your account has
            been approved by admin.
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: scale(11),
                height: scale(15),
              }}
              resizeMode="contain" source={require("../../assets/Home/hourglass.png")} />
            <Text style={styles.waitTxt}>Keep wait...</Text>
          </View>
          <TouchableOpacity
            onPress={() => goscreen()}
            style={styles.bottomView}
          >
            <Text style={styles.loginTxt}>Login with another account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
