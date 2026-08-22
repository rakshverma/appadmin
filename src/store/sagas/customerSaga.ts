import { call, put, take, takeLatest } from "redux-saga/effects";
import { request } from "./../../utils/request";
import {
  CUSTOMER_LIST,
  SHOW_LOADER,
  SET_CUSTOMER_LIST,
  HIDE_LOADER,
  CUSTOMER_ERROR,
  RESET_CUSTOMER,
  RESET_CUSTOMER_FLAG,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";

function* getCustomerListSaga(): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", "/customer");
    yield put({ type: SET_CUSTOMER_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (error: any) {
    console.log("GET CATEGORY ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* resetCustomerFlagSaga(): any {
  yield put({ type: RESET_CUSTOMER_FLAG });
}

export function* watchCustomer() {
  yield takeLatest(CUSTOMER_LIST, getCustomerListSaga);
  yield takeLatest(RESET_CUSTOMER, resetCustomerFlagSaga);
}
