import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  FlatList,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { COLOR } from "../../constants/colors/colors";
import { scale, verticalScale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";
import { TextStyles } from "../../theme/TextStyles";
import { styles } from "./CreateAccount.styles";
import { getUser } from "@/selectors/UserSelectors";
import { showMessage } from "react-native-flash-message";
import { newIcon } from "@/assets";
import { navigate } from "@/navigation/NavigationRef";
import { NAVIGATION } from "@/constants";
import { NormalAlert, OpenCamera, OpenGallery, ValidateName, ValidateEmail, HandleUnhandledTouches } from "@/utils/GlobalMethods";
import { HttpClient, UserController } from "@/controllers";
import { Loader } from "@/components/Loader";
import config from "@/config";

export function CreateAccount(props) {
  // const {navigation, route} = props;
  const dispatch = useDispatch();
  const selector = useSelector(getUser);
  //***********************HOOKS **************************/
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isActive, setActive] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [radioButtonActive, SetRadioButtonActive] = useState(
    newIcon.Blankradiobutton
  );
  const [selectRole, setselectRole] = useState(newIcon.Blankradiobutton);

  const [selectedId, setSelectedId] = useState(-1);
  const [siteList, setSiteList] = useState([]);
  const [roles, setRoles] = useState([]);

  const [isFocus, setIsFocus] = useState(false);
  const [animating, setAnimating] = useState(false);

  const Validation = () => {
    if (!image) {
      showMessage({
        message: "Profile Picture is mandatory",
        type: "danger",
      });
      return;
    }
    if (!fullName.trim()) {
      showMessage({
        message: "Please Enter your Full Name",
        type: "danger",
      });
      return;
    }
    if (!ValidateName(fullName)) {
      return;
    }
    if (!email.trim()) {
      showMessage({
        message: "Email Field is Required",
        type: "danger",
      });
      return;
    }
    if (!ValidateEmail(email)) {
      return;
    }
    if (!selectedSite) {
      showMessage({
        message: "Please select place",
        type: "danger",
      });
      return;
    }
    /* QA Request  
    
    if (!address.trim()) {
          showMessage({
            message: "Please enter your address",
            type: "danger",
          });
          return
        }
        if (address.trim().length < 10) {
          showMessage({
            message: "Address must be 10-50 Characters long",
            type: "danger",
          });
          return
        } */
    if (selectedId == -1) {
      showMessage({
        message: "Please select a role",
        type: "danger",
      });
      return;
    }
    if (radioButtonActive) {
      showMessage({
        message: "Please Accept the Terms and Conditions",
        type: "danger",
      });
      return;
    } else {
      createAccountAuth();
    }
  };

  const clearField = () => {
    setEmail("");
    setFullName("");
    setSelectedSite(null);
    setAddress("");
    setImage("");
    SetRadioButtonActive(newIcon.Blankradiobutton);
    setselectRole(newIcon.Blankradiobutton);
  };

  const getPlaceNames = async () => {
    try {
      const res = await UserController.placeName();
      if (res.payload) {
        let sitearr = [];
        res.payload?.site.map((x, index) => {
          sitearr.push({
            value: x.id,
            label: x.name,
            territory: x.territory,
            address: x.address,
            city: x.city,
          });
        });
        setSiteList(sitearr);
      }
    } catch (err) { }
  };

  const getRoles = async () => {
    try {
      const res = await UserController.getRoles();
      if (res.payload) {
        setRoles(res.payload?.user_desgination);
      }
    } catch (err) { }
  };

  useEffect(() => {
    getPlaceNames();
    getRoles();
  }, []);

  const createAccountAuth = async () => {
    setAnimating(true);
    const formData = new FormData();
    formData.append("photo", {
      uri: image,
      type: "image/jpg",
      name: Math.random().toString(36).substring(7) + ".jpg",
    });
    try {
      const res = await UserController.uploadImage(formData);
      if (res.payload) {
        const data = {
          email,
          role_id: config.EMPLOYEE_ROLE,
          fullname: fullName,
          profile_photo: res.payload.url,
          desgination_id: selectedId,
          site_id: selectedSite,
          address,
        };
        try {
          const res = await UserController.register(data);
          HttpClient.setAuthorization(res.payload?.token);
          clearField();
          navigate(NAVIGATION.EditUserDetail);
        } catch (error) {
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
      });
    } finally {
      setAnimating(false);
    }
  };

  const camera = () => {
    OpenCamera().then((result) => {
      setImage(result.path);
    });
  };

  const gallery = () => {
    OpenGallery().then((result) => {
      setImage(result.path);
    });
  };

  const imagePress = () => {
    Keyboard.dismiss();
    NormalAlert({
      message: "Choose the way to upload profile image",
      yesText: "Gallery",
      cancelText: "Camera",
      singleButton: false,
      closeFunc: () => navigate(NAVIGATION.createaccount),
    })
      .then((resp) => {
        gallery();
      })
      .catch(() => {
        camera();
      });
  };

  return (
    <View style={styles.mainContainer} onStartShouldSetResponder={HandleUnhandledTouches}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <Text style={styles.headTxt}>Create Account</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.desTxt}>
          Hey! Are you new on the platform? Please enter the below details to
          create account.
        </Text>
        <View style={styles.picView}>
          {image ? (
            <Image
              style={{
                width: scale(100),
                height: scale(100),
                borderRadius: scale(20),
              }}
              source={{ uri: image }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/images/profileback.png")}
              style={{ width: scale(100), height: scale(100) }}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity
            onPress={imagePress}
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              bottom: scale(-5),
              right: scale(-5),
            }}
          >
            <Image
              source={newIcon.Edit}
              style={{ width: scale(30), height: scale(30) }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <InputField
          onChangeText={setFullName}
          value={fullName}
          color={"#05A1AB"}
          mainViewStyle={{ width: "100%" }}
          icon={"account"}
          title={"Full Name"}
          placeholder={"Enter Your Full Name"}
          placeholderColor={"#93AFB1"}
        />
        <InputField
          onChangeText={setEmail}
          value={email}
          icon={"email"}
          color={"grey"}
          title={"Email Address"}
          placeholder={"Enter your Email"}
          placeholderColor={"#93AFB1"}
          mainViewStyle={{ marginTop: 0, width: "100%" }}
        />

        <View
          style={{
            backgroundColor: "#EBF0F1",
            borderRadius: scale(15),
            marginBottom: scale(20),
          }}
        >
          <Text style={styles.placeNameTextStyle}>Site Name</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderWidth: 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={{
              bottom: verticalScale(25),
            }}
            data={siteList}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select Place" : "Select Place"}
            searchPlaceholder="Search..."
            value={selectedSite}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setSelectedSite(item.value);
              setAddress(`${item.address}, ${item.territory}, ${item.city}`);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <Image
                style={{ marginTop: scale(8), tintColor: "#93AFB1" }}
                source={require("../../assets/Home/droparrow.png")}
              />
            )}
          />
        </View>

        <View style={styles.AddressViewStyle}>
          <Text style={styles.AddressTextStyle}>Address</Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: scale(22),
                height: scale(22),
                marginTop: scale(8),
                tintColor: isActive ? "#05A1AB" : "#93AFB1",
              }}
              source={require("../../assets/Home/ash.png")}
              resizeMode="contain"
            />
            <TextInput
              value={address}
              onChangeText={(address) => setAddress(address)}
              onFocus={() => {
                setActive(true);
              }}
              style={{
                textAlignVertical: "top",
                fontSize: scale(16),
                fontFamily: FONTS.PoppinsLight,
                color: "#05A1AB",
                marginLeft: scale(5),
                width: "90%",
                height: scale(150),
              }}
              multiline={true}
              numberOfLines={6}
              placeholder="Enter the Address"
              placeholderTextColor="#93AFB1"
              editable={false}
            />
          </View>
        </View>
        <Text
          style={{ fontFamily: FONTS.PoppinsRegular, marginTop: scale(15) }}
        >
          Select Role
        </Text>
        <FlatList
          data={roles}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedId(item.id);
                setselectRole(index);
              }}
              style={{
                flexDirection: "row",
                margin: scale(7),
                left: scale(-8),
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: scale(16), width: scale(16) }}
                source={
                  selectRole == index
                    ? newIcon.radioButton
                    : newIcon.Blankradiobutton
                }
                resizeMode="contain"
              />
              <Text style={styles.roletextStyle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.termsView}>
          <TouchableOpacity
            onPress={() => SetRadioButtonActive(!radioButtonActive)}
          >
            {radioButtonActive ? (
              <Image
                style={{
                  width: scale(20),
                  height: scale(20),
                  marginTop: verticalScale(2),
                }}
                source={newIcon.Blankradiobutton}
              />
            ) : (
              <Image
                style={{
                  width: scale(20),
                  height: scale(20),
                  marginTop: verticalScale(2),
                }}
                source={newIcon.Tickcheckbox}
              />
            )}
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.termsTxt}>I agree to </Text>
              <TouchableOpacity
                onPress={() => {
                  clearField();
                  navigate(NAVIGATION.Terms);
                }}
              >
                <Text style={styles.termsHighlightTxt}>
                  Terms & Conditions{" "}
                </Text>
              </TouchableOpacity>
              <Text style={styles.termsTxt}>and</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                clearField();
                navigate(NAVIGATION.Privacy);
              }}
            >
              <Text style={styles.termsHighlightTxt}> Privacy Policy.</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button onPress={Validation} title={"Create"} />
        <View style={styles.bottomView}>
          <Text style={TextStyles.light}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              clearField();
              navigate("Login");
            }}
          >
            <Text style={[TextStyles.light, { color: COLOR.AppColor }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {animating && <Loader />}
    </View >
  );
}
