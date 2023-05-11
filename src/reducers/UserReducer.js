import { TYPES } from "../actions/UserActions";

export const userReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.OTP_SUCCESS:
      return { ...state, userinfo: payload };

    case TYPES.Myprofile_SUCCESS:
      return { ...state, profileinfo: payload };

    case TYPES.ACTIVE_NOTIFICATION:
      return { ...state, activeNotification: payload };

    case TYPES.CLEAR_STORE:
      return {};

    default:
      return state;
  }
};
