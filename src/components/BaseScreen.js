import { Image, StyleSheet, SafeAreaView } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FEFF",
  },
  backImage: {
    position: "absolute",
    top: 0,
    width: scale(375),
    height: scale(225),
  },
});

export function BaseScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/Home/back.png")}
        style={styles.backImage}
        resizeMode="stretch"
      />
      {props.children}
    </SafeAreaView>
  );
}
