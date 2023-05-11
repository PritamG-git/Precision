/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import { RootNavigator } from "./src/navigation";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";
import {
  notificationListener,
  requestUserPermission,
} from "@/utils/notificationServices";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, StatusBar } from "react-native";

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListener()
    LogBox.ignoreAllLogs();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <RootNavigator />
          <FlashMessage
            position="top"
            style={{ paddingTop: StatusBar.currentHeight }}
          />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
