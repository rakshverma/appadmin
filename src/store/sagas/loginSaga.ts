import { call, put, takeLatest } from "redux-saga/effects";
import { request } from "./../../utils/request";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER_INFO,
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";

function* loginSaga(action: any): any {
  yield put({ type: SHOW_LOADER });
  try {
    const isPrivateRoute = 0;
    const response = yield call(request, "post", "/auth/login", action.payload, isPrivateRoute);
    console.log("LOGIN RESPONSE = ", response);
    yield localStorage.setItem("token", response.data.data.token || "");
    yield put({ type: SET_USER_INFO, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
    yield put({ type: LOGIN_SUCCESS });
  } catch (error: any) {
    console.log("LOGIN ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* forgotPassSaga(action: any): any {
  yield put({ type: SHOW_LOADER });
  try {
    const isPrivateRoute = 0;
    yield call(request, "post", "/auth/forgotpassword", action.payload, isPrivateRoute);
    yield put({ type: HIDE_LOADER });
    yield put({ type: FORGOT_PASS_SUCCESS });
  } catch (error: any) {
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(FORGOT_PASS_REQUEST, forgotPassSaga);
}
