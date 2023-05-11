import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { scale } from "react-native-size-matters";
import { InputField } from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./EditProfilestyles";
import { getUser } from "../../selectors/UserSelectors";
import { showMessage } from "react-native-flash-message";
import { navigate } from "@/navigation/NavigationRef";
import { NAVIGATION } from "@/constants";
import { HandleUnhandledTouches, NormalAlert, OpenCamera, OpenGallery, ValidateName } from "@/utils/GlobalMethods";
import { UserController } from "@/controllers";
import { Loader } from "@/components/Loader";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const usersite = `${user?.profileinfo?.user_profiles?.site_?.address}, ${user?.profileinfo?.user_profiles?.site_?.city}, ${user?.profileinfo?.user_profiles?.site_?.territory}`
  const [fullName, setFullName] = useState(user?.profileinfo?.user_profiles.fullname);
  const [address, setAddress] = useState(usersite);
  const [image, setImage] = useState();
  const [loading, setloading] = useState(false);

  const Validation = () => {
    if (!fullName.trim()) {
      showMessage({
        message: "Please Enter Yor Full Name",
        type: "danger",
      });
      return
    }
    if (!ValidateName(fullName)) {
      return
    }
    /*     if (!address) {
          showMessage({
            message: "Please enter your address",
            type: "danger",
          });
        }
        if (address.trim().length < 10) {
          showMessage({
            message: "Address must be 10-50 Characters long",
            type: "danger",
          });
        } */
    else {
      editprofile();
    }
  };

  const editprofile = async () => {
    setloading(true);
    if (image) {
      const formData = new FormData();
      formData.append("photo", {
        uri: image,
        type: 'image/jpg',
        name: Math.random().toString(36).substring(7) + '.jpg',
      });
      try {
        const res = await UserController.uploadImage(formData)
        if (res.payload) {
          const data = {
            fullname: fullName,
            profile_photo: res.payload.url,
            address,
          };
          try {
            const res = await UserController.updateProfileRequesttt(data, user?.profileinfo?.user_profiles.id)
            showMessage({
              message: res.msg,
              type: "success",
            });
          }
          catch (error) {
            showMessage({
              message: error.msg,
              type: "danger",
            });
          }
        }
      } catch (err) {
        showMessage({
          message: err.msg,
          type: "danger",
        })
      } finally {
        setloading(false);
      }
    } else {
      const data = {
        fullname: fullName,
        address,
      };
      try {
        const res = await UserController.updateProfileRequesttt(data, user?.profileinfo?.user_profiles.id)
        showMessage({
          message: res.msg,
          type: "success",
        });
      }
      catch (error) {
        showMessage({
          message: error.msg,
          type: "danger",
        });
      } finally {
        setloading(false);
      }
    }
  };

  const camera = () => {
    OpenCamera().then(result => {
      setImage(result.path);
    });
  };

  const gallery = () => {
    OpenGallery().then(result => {
      setImage(result.path);
    });
  };

  const imagePress = () => {
    Keyboard.dismiss()
    NormalAlert({
      message: 'Choose the way to upload profile image',
      yesText: 'Gallery',
      cancelText: 'Camera',
      singleButton: false,
      closeFunc: () => navigate(NAVIGATION.EditProfile)
    })
      .then(resp => {
        gallery()
      })
      .catch(() => {
        camera()
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} onStartShouldSetResponder={HandleUnhandledTouches}>
      <Header back tintColor />
      <Text style={styles.editprofilestyle}>Edit Profile</Text>
      <Text style={styles.editprofiledetails}>Edit your profile details.</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: scale(10),
          alignSelf: 'center'
        }}
      >
        <Image
          style={{
            width: scale(100),
            height: scale(100),
            borderRadius: scale(20),
          }}
          source={{ uri: image ? image : user?.profileinfo?.user_profiles.profile_photo }}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={imagePress}
          style={{
            position: "absolute",
            alignSelf: 'flex-end',
            bottom: scale(-8),
            right: scale(-8)
          }}
        >
          <Image
            style={{ width: scale(32), height: scale(32) }}
            source={require("../../assets/Home/edit.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: scale(15) }}>
        <InputField
          color={"#05A1AB"}
          mainViewStyle={{ width: "100%" }}
          icon={"account"}
          title={"Full Name"}
          placeholder={"Enter Your Full Name"}
          placeholderColor={"#93AFB1"}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />

        <InputField
          onChangeText={(address) => setAddress(address)}
          mainViewStyle={{ width: "100%" }}
          uri={require("../../assets/Home/bluelocation.png")}
          urii={require("../../assets/Home/Locationn.png")}
          title={"Address"}
          placeholder={"Enter Your Address"}
          value={address}
          right={true}
          editable={false}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: scale(30),
          paddingHorizontal: scale(15),
        }}
      >
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION.EditUserDetail, { isEdit: true })}
          style={styles.buttonstyle}
        >
          <Text style={{ fontSize: scale(16), color: "#FFFFFF" }}>
            Edit Skills
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Validation} style={styles.savebuttonStyle}>
          <Text style={{ fontSize: scale(16), color: "#FFFFFF" }}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default EditProfile;
