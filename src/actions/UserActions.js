import { UserController } from "@/controllers";
import { HttpClient } from "@/controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TYPES = {
  CLEAR_STORE: "CLEAR_STORE",
  OTP_REQUEST: "OTP_REQUEST",
  OTP_SUCCESS: "OTP_SUCCESS",
  OTP_RESEND_ERROR: "OTP_RESEND_ERROR",
  Myprofile_SUCCESS: "Myprofile_SUCCESS",
  Myprofile_ERROR: "Myprofile_ERROR",
  ACTIVE_NOTIFICATION: "ACTIVE_NOTIFICATION",
};

const OtpRequest = () => ({
  type: TYPES.OTP_REQUEST,
  payload: null,
});

const OtpSuccess = (user) => ({
  type: TYPES.OTP_SUCCESS,
  payload: { ...user },
});

const OtpResendError = (error) => ({
  type: TYPES.OTP_RESEND_ERROR,
  payload: null,
});

const MyprofileError = (error) => ({
  type: TYPES.Myprofile_ERROR,
  payload: null,
});

const MyprofileSuccess = (user) => ({
  type: TYPES.Myprofile_SUCCESS,
  payload: { ...user },
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const setNotificationCount = (data) => ({
  type: TYPES.ACTIVE_NOTIFICATION,
  payload: data,
});

export const GetOtPRequestt = (data) => async (dispatch) => {
  dispatch(OtpRequest());
  try {
    const user = await UserController.GetOtPRequestt(data);
    if (user.payload.token) {
      HttpClient.setAuthorization(user.payload.token);
    }
    dispatch(OtpSuccess(user.payload));
  } catch (error) {
    dispatch(OtpResendError(error));
  }
};

export const Myprofile = () => async (dispatch) => {
  try {
    const user = await UserController.MyProfileRequesttt();
    dispatch(MyprofileSuccess(user.payload));
  } catch (error) {
    dispatch(MyprofileError(error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await UserController.logout();
    await AsyncStorage.removeItem("ChatId");
    HttpClient.clearAuthorization();
  } finally {
    await dispatch(clearStore());
  }
};
