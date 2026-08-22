import {
  LOGIN_REQUEST,
  FORGOT_PASS_REQUEST,
  RESET_PASS_REQUEST,
  VALIDATE_RESET_TOKEN_REQUEST,
} from "../actionTypes";
import {
  LoginFormData,
  ForgotPassFormData,
  ResetPassFormData,
} from "../../types/Login";

export const loginAction = (data: LoginFormData) => {
  return { type: LOGIN_REQUEST, payload: data };
};

export const forgotPassowrdAction = (data: ForgotPassFormData) => {
  return { type: FORGOT_PASS_REQUEST, payload: data };
};

export const resetPassowrdAction = (data: ResetPassFormData) => {
  return { type: RESET_PASS_REQUEST, payload: data };
};

export const validateResetTokenAction = (data: String) => {
  return { type: VALIDATE_RESET_TOKEN_REQUEST, payload: data };
};
