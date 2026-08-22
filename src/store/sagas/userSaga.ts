import { call, put, takeLatest } from "redux-saga/effects";
import { request } from "./../../utils/request";
import {
  GET_USER_INFO,
  SET_USER_INFO,
  INVALID_USER,
  SHOW_LOADER,
  HIDE_LOADER,
  USER_LOGOUT,
  RESET_STORE,
  USER_LOGOUT_ERROR,
  SET_PIN_ON_USER,
  GET_PIN_CODE_ON_USER,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";

function* userSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", "/user/getUserInfo");
    console.log("get admin RESPONSE = ", response);
    yield put({ type: SET_USER_INFO, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (error: any) {
    console.log("valid token ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* logoutSaga(action: any): any {
  yield put({ type: SHOW_LOADER });
  try {
    yield localStorage.removeItem("token");
    yield put({ type: RESET_STORE });
  } catch (e: any) {
    console.log("logout error = ", e);
    yield put({ type: SHOW_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: "Unable to logout. Please try again." });
  }
}

function* getPinCodesOnUserSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", `/user/getPinCodeOnUser?district=${action.payload}`);
    yield put({ type: SET_PIN_ON_USER, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* editUserProfileSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "put";
    let url = `/user/editProfile`;
    const response = yield call(request, method, url, action.payload);
    console.log("edit profile Response = ", response);
    yield put({ type: EDIT_USER_PROFILE_SUCCESS, payload: response?.data?.message });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Profile updated successfully" });
  } catch (error: any) {
    console.log("edit profile ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* changePasswordSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "put";
    let url = `/user/changePassword`;
    const response = yield call(request, method, url, action.payload);
    console.log("changePasswordResponse = ", response);
    // yield put({ type: CHANGE_PASSWORD_SUCCESS, payload: response?.data?.message });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Password updated successfully" });
    yield put({ type: HIDE_LOADER });
  } catch (error: any) {
    console.log("Change password ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

export function* watchUser() {
  yield takeLatest(GET_USER_INFO, userSaga);
  yield takeLatest(USER_LOGOUT, logoutSaga);
  yield takeLatest(GET_PIN_CODE_ON_USER, getPinCodesOnUserSaga);
  yield takeLatest(EDIT_USER_PROFILE, editUserProfileSaga);
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}
