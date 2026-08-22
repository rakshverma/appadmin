import { call, put, take, takeLatest, select } from "redux-saga/effects";
import { request } from "../../utils/request";
import {
  GET_FRANCHISE,
  SHOW_LOADER,
  RESET_FLAGS,
  SET_FRANCHISE_LIST,
  HIDE_LOADER,
  FRANCHISE_ERROR,
  GET_DISTRICT,
  SET_DISTRICT_LIST,
  GET_PINCODE_ON_DISTRICT,
  SET_PINCODE_LIST,
  ADD_FRANCHISE,
  ADD_FRANCHISE_ERROR,
  ADD_FRANCHISE_SUCCESS,
  GET_FRANCHISE_REQUESTS,
  SET_FRANCHISE_REQUEST_LIST,
  GET_FRANCHISE_LIST_ON_ROLE,
  SET_FRANCHISE_LIST_ON_ROLE,
  GET_SHIPPING_LIST_ON_FRANCHISE,
  SET_SHIPPING_LIST_ON_FRANCHISE,
  UPDATE_SHIPPING_LIST_ON_FRANCHISE,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  GET_FRANCHISE_DETAILS,
  SET_FRANCHISE_DETAILS,
  EDIT_FRANCHISE,
  DELETE_FRANCHISE
} from "../actionTypes";

function* getFranchiseSaga(): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_FLAGS });
    const response = yield call(request, "get", "/franchise");
    yield put({ type: SET_FRANCHISE_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: FRANCHISE_ERROR, payload: errMsg });
  }
}

function* getDistrictListSaga(): any {
  console.log("hellooooooooo");
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_FLAGS });
    const response = yield call(request, "get", "/franchise/getDistrictList");
    yield put({ type: SET_DISTRICT_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getPinCodesonDistrictSaga(action: any): any {
  console.log("action.payload.district = ", action.payload.district);
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_FLAGS });
    const response = yield call(request, "get", `/franchise/getPinCodeList?district=${action.payload}`);
    yield put({ type: SET_PINCODE_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* addFranchiseSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "post";
    let url = `/franchise/add`;
    const response = yield call(request, method, url, action.payload);
    console.log("franchiseAddResponse = ", response);
    yield put({ type: ADD_FRANCHISE_SUCCESS, payload: "" });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Franchise added successfully" });
  } catch (error: any) {
    console.log("ADD FRANCHISE ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* editFranchiseSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "put";
    let url = `/franchise/edit`;
    const response = yield call(request, method, url, action.payload);
    console.log("franchiseAddResponse = ", response);
    yield put({ type: ADD_FRANCHISE_SUCCESS, payload: "" });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Franchise updated successfully" });
  } catch (error: any) {
    console.log("ADD FRANCHISE ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getFranchiseRequestListSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", "/franchise/getAllRequest");
    yield put({ type: SET_FRANCHISE_REQUEST_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getFranchiseListOnRole(): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", "/franchise/getAllFranchiseOnRole");
    yield put({ type: SET_FRANCHISE_LIST_ON_ROLE, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getShippingLIstOnFranchiseIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", `/franchise/getShippingCostListOnId/${action.payload}`);
    console.log("response = ", response);
    yield put({ type: SET_SHIPPING_LIST_ON_FRANCHISE, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* updateShippingOnFranchiseSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const body = {
      formData: action.payload.data,
      franchiseId: action.payload.franchiseId,
    };
    const response = yield call(request, "post", `/franchise/updateShippingCostListOnId`, body);
    console.log("response = ", response);
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Shipping cost updated successfully" });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getFranchiseDetailsOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", `/franchise/getFranchiseDetailsOnId?franchiseId=${action.payload}`);
    console.log("response = ", response);
    yield put({ type: HIDE_LOADER });
    yield put({ type: SET_FRANCHISE_DETAILS, payload: response?.data?.data.franchiseDetails });
    yield put({ type: SET_PINCODE_LIST, payload: response?.data?.data.pinCodeList });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* deleteFranchiseOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "delete", `/franchise/deleteFranchise?franchiseId=${action.payload}`);
    console.log("response = ", response);
    yield put({ type: HIDE_LOADER });
    let { franchiseList } = yield select((state) => state.franchise);
    console.log("action.payload = ", action.payload)
    let newList = franchiseList.filter((item: any) => item.user_id !== action.payload);
    console.log("newList = ", newList);
    yield put({ type: SET_FRANCHISE_LIST, payload: newList });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

export function* watchFranchise() {
  yield takeLatest(GET_FRANCHISE, getFranchiseSaga);
  yield takeLatest(GET_DISTRICT, getDistrictListSaga);
  yield takeLatest(GET_PINCODE_ON_DISTRICT, getPinCodesonDistrictSaga);
  yield takeLatest(ADD_FRANCHISE, addFranchiseSaga);
  yield takeLatest(EDIT_FRANCHISE, editFranchiseSaga);
  yield takeLatest(GET_FRANCHISE_REQUESTS, getFranchiseRequestListSaga);
  yield takeLatest(GET_FRANCHISE_LIST_ON_ROLE, getFranchiseListOnRole);
  yield takeLatest(GET_SHIPPING_LIST_ON_FRANCHISE, getShippingLIstOnFranchiseIdSaga);
  yield takeLatest(UPDATE_SHIPPING_LIST_ON_FRANCHISE, updateShippingOnFranchiseSaga);
  yield takeLatest(GET_FRANCHISE_DETAILS, getFranchiseDetailsOnIdSaga);
  yield takeLatest(DELETE_FRANCHISE, deleteFranchiseOnIdSaga);
}
