import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { scale } from "react-native-size-matters";
import styles from "./CertificateStyles";
import moment from "moment";
import { Loader } from "@/components/Loader";
import { UserController } from "@/controllers";
import { useFocusEffect } from "@react-navigation/native";
import { NAVIGATION } from "@/constants";
import { FONTS } from "@/theme/fonts";

const Certificates = (props) => {
  const [saveDocs, setSaveDoc] = useState([]);
  const [animating, setAnimating] = useState(false);

  const getCertificates = async () => {
    setAnimating(true);
    try {
      const res = await UserController.getCertificates();
      setSaveDoc(res.payload);
    } catch (error) {
      showMessage({
        message: error.msg,
        type: "danger",
      });
    } finally {
      setAnimating(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCertificates();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6FEFF" }}>
      <Header
        back={true}
        tintColor
        Uri={require("../../assets/Home/greenEdit.png")}
        EditImage={true}
        editcer={NAVIGATION.uploadcert}
        param={{ isEdit: true }}
      />
      <ScrollView style={{ marginHorizontal: scale(15) }} showsVerticalScrollIndicator={false}>
        <Text style={styles.certificateStyle}>Certificates</Text>
        <Text style={styles.uploadStyle}>Uploaded Certificates</Text>
        <View style={styles.contentContainer}>
          {animating ? <Loader /> : saveDocs.length ? (
            <FlatList
              data={saveDocs}
              renderItem={({ item, index }) => (
                <View style={styles.cardStyle}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ height: scale(42), width: scale(42) }}
                      source={require("../../assets/Home/uploadfile.png")}
                    />
                    <View style={{ marginLeft: scale(10), width: "85%" }}>
                      <Text style={styles.filemamestyle}>
                        {item.document.substring(
                          item.document.lastIndexOf("/") + 1
                        )}
                      </Text>
                      <Text style={styles.uploadedtimestyle}>
                        Uploaded on{" "}
                        {moment
                          .utc(item.updated_at)
                          .local()
                          .startOf("seconds")
                          .fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={{
              color: "#43686A50",
              fontSize: scale(18),
              fontFamily: FONTS.PoppinsSemiBold,
              alignSelf: 'center',
              marginTop: Dimensions.get('window').height / 4
            }}>
              No certificates are uploaded yet
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Certificates;
