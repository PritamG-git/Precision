import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Modal,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { COLOR } from "../../constants/colors/colors";
import { scale } from "../../helper/Scale";
import { FONTS } from "../../theme/fonts";
import { styles } from "./UploadCert.styles";
import { Approval } from "../Approval/Approval";
import { showMessage } from "react-native-flash-message";
import DocumentPicker, { types } from "react-native-document-picker";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Loader } from "@/components/Loader";
import { UserController } from "@/controllers";
import config from "@/config";
import { logout } from "@/actions/UserActions";
import { goBack, navigate } from "@/navigation/NavigationRef";
import { NAVIGATION } from "@/constants";
import { ScreenTitle } from "@/components/ScreenTitle";

export function UploadCert(props) {
  const dispatch = useDispatch();
  const user = props.route.params?.userDetails;
  const isEdit = props.route.params?.isEdit;
  const [showModal, setShowModal] = useState(false);
  const [saveDocs, setSaveDoc] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [fileResponse, setFileResponse] = useState([]);

  const HideModal = () => {
    setShowModal(false);
  };

  const goscreen = () => {
    if (saveDocs.length <= 0) {
      showMessage({
        message: "Please add certificate",
        type: "danger",
      });
    } else {
      handleSkip();
    }
  };

  const getCertificates = async () => {
    try {
      const res = await UserController.getCertificates();
      res.payload && setSaveDoc(res.payload);
    } catch (error) {}
  };

  useEffect(() => {
    getCertificates();
  }, []);

  const uploadImages = async (image) => {
    setAnimating(true);
    const formData = new FormData();
    const imageData = {
      uri:
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", ""),
      type: image.type,
      name: `Doc_${image.name}`,
    };
    formData.append("doc", imageData);
    formData.append("step", 2);
    try {
      const res = await UserController.addCertificate(formData);
      res.payload && setSaveDoc(res.payload);
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
    setFileResponse([]);
    setAnimating(false);
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        type: [types.pdf, types.docx, types.images, types.doc],
      });
      setFileResponse(response);
    } catch (err) {}
  }, []);

  const uploaddoc = () => {
    if (fileResponse.length <= 0) {
      showMessage({
        message: "Please choose a file",
        type: "danger",
      });
    } else {
      uploadImages(fileResponse[0]);
    }
  };

  const DeleteDocument = (deleteid) => {
    Alert.alert("", "Are you sure you want to delete this Document?", [
      { text: "OK", onPress: () => DeleteDocumentApi(deleteid) },
      { text: "Cancel" },
    ]);
  };

  const DeleteDocumentApi = async (deleteid) => {
    try {
      const res = await UserController.deleteCertificate(deleteid);
      res.payload && setSaveDoc(res.payload);
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    }
  };

  const PopUp = () => {
    return (
      <Modal transparent visible={showModal}>
        <Approval
          user_profilesdata={user}
          title={user ? "Account Approval Pending" : "Account Details Submit"}
          setModal={HideModal}
        />
      </Modal>
    );
  };

  const handleSkip = async () => {
    if (user && user.is_admin_approved) {
      const data = {
        email: user.email,
        role_id: config.EMPLOYEE_ROLE,
      };
      try {
        const res = await UserController.login(data);
        if (res.payload) {
          navigate(NAVIGATION.otp, { data: { ...data, ...res.payload } });
        }
      } catch (error) {
        showMessage({
          message: "Something went wrong! Please try login again.",
          type: "danger",
        });
        dispatch(logout());
        navigate(NAVIGATION.login);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        back
        tintColor
        // Skip={!isEdit && handleSkip}
      />
      <StatusBar translucent barStyle="dark-content" />
      {showModal && <PopUp />}
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenTitle
          title={`${isEdit ? "Edit" : "Upload"} Certificates`}
          description="Upload your certificates"
        />

        <TouchableOpacity
          onPress={handleDocumentSelection}
          style={styles.TxtInput}
        >
          <Text style={styles.addTxt}>Upload File</Text>
          <Text numberOfLines={1} style={styles.chooseTxt}>
            {fileResponse.length > 0 && fileResponse[0].name
              ? fileResponse[0].name
              : "Choose File"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.errorTxt}>
          PDF, DOC, JPG, PNG files support only
        </Text>
        <Button
          onPress={() => uploaddoc()}
          style={styles.addSkillBtn}
          textStyle={{
            color: COLOR.AppColor,
            fontFamily: FONTS.PoppinsMedium,
          }}
          title={"Upload"}
        />
      </ScrollView>

      <View style={{ backgroundColor: "#F6FEFF", flex: 1, padding: scale(15) }}>
        <Text style={styles.addedTxt}>Uploaded Files</Text>
        {saveDocs.length > 0 ? (
          <FlatList
            data={saveDocs}
            renderItem={({ item, index }) => (
              <View style={styles.listView}>
                <View style={styles.iconView}>
                  <Icon color={COLOR.AppColor} name="file-document" size={26} />
                </View>
                <View style={{ flex: 10, marginLeft: moderateScale(10) }}>
                  <Text>
                    {item.document.substring(
                      item.document.lastIndexOf("/") + 1
                    )}
                  </Text>
                  <Text>
                    Uploaded on{" "}
                    {moment
                      .utc(item.updated_at)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => DeleteDocument(item.id)}
                  style={{ flex: 2, alignItems: "center" }}
                >
                  <Image
                    style={{ height: scale(19), width: scale(17.64) }}
                    source={require("../../assets/Home/trash-bin.png")}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: "#43686A",
              padding: scale(10),
            }}
          >
            No certificates are uploaded yet
          </Text>
        )}
        <View
          style={{
            paddingHorizontal: scale(15),
            backgroundColor: "#F6FEFF",
            marginTop: scale(20),
          }}
        >
          <Button
            onPress={() => {
              isEdit ? goBack() : goscreen();
            }}
            title={"Done"}
            style={styles.bottomBtn}
          />
        </View>
      </View>
      {animating && <Loader />}
    </SafeAreaView>
  );
}
