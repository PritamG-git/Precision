import { logout } from "@/actions/UserActions.js";
import { store } from "@/store/index.js";
import axios from "axios";
import { Alert } from "react-native";
import config from '../config.js';

const client = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      if (error.response.status == 401) {
        Alert.alert('Alert', 'Session Timed Out...', [{ text: 'Log In', onPress: () => store.dispatch(logout()) }])
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ error: "connectionError" });
    } else {
      return Promise.reject(error);
    }
  }
);

const setAuthorization = (token) => {
  client.defaults.headers.common.authorization = token;
};

const clearAuthorization = () => {
  delete client.defaults.headers.common.authorization;
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };
