import { call, put, take, takeLatest, select } from "redux-saga/effects";
import { request } from "../../utils/request";
import {
  SHOW_LOADER,
  RESET_FLAGS,
  SET_DELEVERY_BOY_LIST,
  HIDE_LOADER,
  GET_DELEVERY_BOY_LIST,
  DELEVERY_BOY_ERROR,
  ADD_DELEVERY_BOY,
  ADD_DELEVERY_BOY_SUCCESS,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  GET_DELEVERY_BOY,
  SET_DELEVERY_BOY,
  DELETE_DELIVERY_BOY,
  RESET_DELIVERY_BOY,
  SET_RESET_DELIVERY_BOY,
  EDIT_DELIVERY_BOY,
} from "../actionTypes";

function* getDeleveryBoyListSaga(): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_FLAGS });
    const response = yield call(request, "get", "/deleveryboy");
    yield put({ type: SET_DELEVERY_BOY_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* addDeleveryBoySaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "post";
    let url = `/deleveryboy/add`;
    const response = yield call(request, method, url, action.payload);
    console.log("franchiseAddResponse = ", response);
    yield put({ type: ADD_DELEVERY_BOY_SUCCESS, payload: "" });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Delivery boy added successfully" });
  } catch (error: any) {
    console.log("ADD DELEVERY BOY ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getDeliveryBoyOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "get";
    let url = `/deleveryboy/details/${action.payload}`;
    const response = yield call(request, method, url, action.payload);
    yield put({ type: SET_DELEVERY_BOY, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (error: any) {
    console.log("ADD DELEVERY BOY ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* deleteDeliveryBoyOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "delete";
    let url = `/deleveryboy/deleteDeliveryBoy?id=${action.payload}`;
    const response = yield call(request, method, url);
    let { deleveryBoyList } = yield select((state) => state.deleveryBoy);
    console.log("action.payload = ", action.payload);
    let newList = deleveryBoyList.filter((item: any) => item.id !== action.payload);
    console.log("newList = ", newList);
    yield put({ type: SET_DELEVERY_BOY_LIST, payload: newList });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Delivery boy deleted successfully" });
  } catch (error: any) {
    console.log("ADD DELEVERY BOY ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* resetDeleveryBoyStatusSaga() {
  yield put({ type: SET_RESET_DELIVERY_BOY });
}

function* editDeliveryBoySaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "put";
    let url = `/deleveryboy/edit`;
    const response = yield call(request, method, url, action.payload, action.payload);
    yield put({ type: ADD_DELEVERY_BOY_SUCCESS, payload: "" });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Delivery boy updated successfully" });
  } catch (error: any) {
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

export function* watchDeleveryBoy() {
  yield takeLatest(GET_DELEVERY_BOY_LIST, getDeleveryBoyListSaga);
  yield takeLatest(ADD_DELEVERY_BOY, addDeleveryBoySaga);
  yield takeLatest(GET_DELEVERY_BOY, getDeliveryBoyOnIdSaga);
  yield takeLatest(DELETE_DELIVERY_BOY, deleteDeliveryBoyOnIdSaga);
  yield takeLatest(RESET_DELIVERY_BOY, resetDeleveryBoyStatusSaga);
  yield takeLatest(EDIT_DELIVERY_BOY, editDeliveryBoySaga);
}
