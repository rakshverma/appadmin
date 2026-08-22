import { call, put, take, takeLatest } from "redux-saga/effects";
import { request } from "./../../utils/request";
import {
  ADD_CATEGORY,
  SET_CATEGORY_LIST,
  SHOW_LOADER,
  HIDE_LOADER,
  ADD_CATEGORY_ERROR,
  GET_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  RESET_CATEGORY_FLAG,
  RESET_CATEGORY,
  DELETE_CATEGORY,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";

function* addCategorySaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let method = "post";
    let url = `/category/add`;
    if (action.payload.editId) {
      method = "put";
      url = `/category/edit?id=${action.payload.editId}`;
    }
    const response = yield call(request, method, url, action.payload);
    console.log("categoryResponse = ", response);
    yield put({ type: HIDE_LOADER });
    yield put({ type: ADD_CATEGORY_SUCCESS, payload: {} });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Category added successfully" });
  } catch (error: any) {
    console.log("ADD CATEGORY ERROR = ", error);
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getCategorySaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", "/category");
    yield put({ type: SET_CATEGORY_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (error: any) {
    console.log("GET CATEGORY ERROR = ", error);
    yield put({ type: HIDE_LOADER });
    yield put({ type: SET_CATEGORY_LIST, payload: [] });
  }
}

function* deleteCategorySaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "delete", `/category?id=${action.payload.id}`);
    yield put({ type: SET_CATEGORY_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Category deleted successfully" });
  } catch (error: any) {
    const errMsg = error?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* resetFlagsSaga() {
  yield put({ type: RESET_CATEGORY_FLAG });
}

export function* watchCategory() {
  yield takeLatest(ADD_CATEGORY, addCategorySaga);
  yield takeLatest(GET_CATEGORY, getCategorySaga);
  yield takeLatest(RESET_CATEGORY, resetFlagsSaga);
  yield takeLatest(DELETE_CATEGORY, deleteCategorySaga);
}
