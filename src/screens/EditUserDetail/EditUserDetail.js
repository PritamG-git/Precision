import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  Modal,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import styles from "./EditUserDetailStyles";
import { FONTS } from "../../theme/fonts";
import { scale } from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { UserController } from "@/controllers";
import { Approval } from "../Approval/Approval";
import { goBack, navigate } from "@/navigation/NavigationRef";
import { NAVIGATION } from "@/constants";
import { Loader } from "@/components/Loader";
import { HandleUnhandledTouches } from "@/utils/GlobalMethods";

const EditUserDetail = (props) => {
  const dispatch = useDispatch();
  const user = props.route.params?.userDetails;
  const isEdit = props.route.params?.isEdit;

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [Addskill, setAddSkill] = useState();
  const [saveSkills, setSaveSkills] = useState([]);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)

  const HideModal = () => {
    setShowModal(false);
  };

  const getSkills = async () => {
    setisLoading(true)
    try {
      const res = await UserController.getSkills()
      if (res.payload) setSaveSkills(res.payload);
    } catch (error) {

    } finally {
      setisLoading(false)
    }
  }

  const addSkill = async () => {
    let param = {
      "skill": Addskill.trim(),
      "step": 1
    }
    try {
      const res = await UserController.addskills(param)
      if (res.payload) { setSaveSkills(res.payload); getSkills() }
    } catch (error) {

    }
  }

  useEffect(() => {
    getSkills();
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true)
    })
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false)
    })
  }, []);


  const AddedSkills = () => {
    if (!Addskill) {
      showMessage({
        message: "Please enter the skill",
        type: "danger",
      });
    } else {
      setAddSkill("");
      addSkill();
    }
  };

  const goscreen = () => {
    if (saveSkills.length <= 0) {
      showMessage({
        message: "Please enter the skill",
        type: "danger",
      });
    } else {
      if (isEdit) {
        goBack()
        return
      }
      if (!user?.user_documents?.length) {
        navigate(NAVIGATION.uploadcert);
        return
      }
      if (!user.is_admin_approved) {
        setShowModal(true);
        return
      }
    }
  }

  const DeleteSkill = (deleteid) => {
    Alert.alert(
      "",
      "Are you sure you want to delete this Skill ?",
      [
        { text: "OK", onPress: () => DeleteSkillApi(deleteid) },
        { text: "Cancel" },
      ],
    );
  }

  const DeleteSkillApi = async (deleteid) => {
    try {
      const res = await UserController.deleteSkills(deleteid)
      if (res.payload) setSaveSkills(res.payload);
    } catch (error) {

    }
  };

  const PopUp = () => {
    return (
      <Modal transparent visible={showModal}>
        <Approval
          user_profilesdata={user}
          title="Account Details Submit"
          setModal={HideModal}
        />
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} onStartShouldSetResponder={HandleUnhandledTouches}>
      <Header back tintColor />
      {showModal && <PopUp />}
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
        <Text style={styles.editDetailText}>{isEdit ? 'Edit' : 'Add'} Skills</Text>
        <View
          style={{
            backgroundColor: "#EBF0F1",
            marginHorizontal: scale(15),
            borderRadius: scale(15),
            paddingHorizontal: scale(10),
            paddingBottom: scale(10)
          }}
        >
          <Text style={styles.addSkill}>Add Skill</Text>
          <TextInput
            value={Addskill}
            onChangeText={setAddSkill}
            multiline={true}
            style={{
              fontSize: scale(15),
              fontFamily: FONTS.PoppinsLight,
              color: "#05A1AB",
              height: scale(55),
            }}
            placeholderTextColor={"#05A1AB"}
          />
        </View>

        <TouchableOpacity
          onPress={AddedSkills}
          style={styles.addskillButton}
        >
          <Text style={{ color: "#05A1AB", fontFamily: FONTS.PoppinsSemiBold }}>
            Add Skill
          </Text>
        </TouchableOpacity>
      </View>

      {!keyboardIsVisible && <View style={{ backgroundColor: "#F6FEFF", flex: 1 }}>
        <Text style={styles.addedskills}>Added Skills</Text>
        {saveSkills.length > 0 ?
          <FlatList
            data={saveSkills}
            extraData={saveSkills}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginHorizontal: scale(15),
                  margin: scale(5),
                }}
                onPress={() => DeleteSkill(item.id)}>
                <Image
                  style={{
                    height: scale(20),
                    width: scale(20),
                  }}
                  source={require("../../assets/Home/block.png")}
                  resizeMode="contain"
                />

                <Text
                  style={{
                    color: "#43686A",
                    fontFamily: FONTS.PoppinsRegular,
                    fontSize: scale(14),
                    marginLeft: scale(5),
                    marginRight: scale(20),
                  }}
                >
                  {item.skill}
                </Text>
              </TouchableOpacity>
            )}
          />
          :
          <Text style={{ alignSelf: "center", color: "#43686A", marginVertical: scale(30) }}>No Skills are added Yet</Text>
        }
        <TouchableOpacity
          onPress={() => goscreen()}
          style={styles.DoneButton}
        >
          <Text style={{ color: "#FFFFFF", fontFamily: FONTS.PoppinsMedium }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>}
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

export default EditUserDetail;
