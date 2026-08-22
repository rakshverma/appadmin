import { GET_USER_INFO, USER_LOGOUT, GET_PIN_CODE_ON_USER, EDIT_USER_PROFILE, CHANGE_PASSWORD, RESET_FLAGS } from "../actionTypes";

export const getUserInfo = () => {
  return { type: GET_USER_INFO };
};
export const userLogoutAction = () => {
  return { type: USER_LOGOUT };
};
export const getPinCodesOnUserAction = (district: string | null) => {
  return { type: GET_PIN_CODE_ON_USER, payload: district };
};
export const editUserProfileAction = (data: any) => {
  return { type: EDIT_USER_PROFILE, payload: data };
};
export const changePasswordAction = (data: any) => {
  return { type: CHANGE_PASSWORD, payload: data };
};
export const resetUserFlags = () => {
  return { type: RESET_FLAGS };
};
