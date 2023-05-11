import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS } from "../../theme/fonts";
import { useWindowDimensions } from "react-native";
import { UserController } from "@/controllers";
import { useFocusEffect } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";
import { Loader } from "@/components/Loader";

const Privacy = (props) => {
  const { width } = useWindowDimensions();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getPages = async () => {
    setLoading(true);
    try {
      const res = await UserController.getPages();
      if (res.payload) {
        setData(res.payload?.pages[2]);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getPages();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header back tintColor />
      <View style={{ marginLeft: scale(15) }}>
        <Text
          style={{
            fontSize: scale(20),
            fontFamily: FONTS.PoppinsSemiBold,
            color: "#43686A",
            marginBottom: verticalScale(10),
            marginTop: verticalScale(5),
          }}
        >
          Privacy Policy
        </Text>
        {loading ? (
          <Loader />
        ) : (
          <RenderHTML contentWidth={width} source={{ html: data?.body }} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Privacy;
