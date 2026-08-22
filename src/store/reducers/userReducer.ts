import {
  SET_USER_INFO,
  INVALID_USER,
  USER_LOGOUT_ERROR,
  SET_PIN_ON_USER,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  RESET_FLAGS,
} from "../actionTypes";
const initialState = {
  userInfo: {},
  isError: false,
  isSuccess: false,
  logoutError: false,
  districtZipCodes: [],
};
export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case INVALID_USER:
      return { ...state, isError: true };
    case USER_LOGOUT_ERROR:
      return { ...state, logoutError: true };
    case SET_PIN_ON_USER:
      return { ...state, districtZipCodes: action.payload };
    case EDIT_USER_PROFILE_SUCCESS:
      return { ...state, isSuccess: true, isError: false };
    case EDIT_USER_PROFILE_ERROR:
      return { ...state, isError: action.payload, isSuccess: false };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, isSuccess: action.payload, isError: false };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, isSuccess: false, isError: action.payload };
    case RESET_FLAGS:
      return { ...state, isSuccess: false, isError: false };
    default:
      return { ...state };
  }
}
