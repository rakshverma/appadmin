import { call, put, take, takeLatest, select } from "redux-saga/effects";
import { request } from "../../utils/request";
import {
  ADD_PRODUCT,
  GET_PRODUCT,
  SET_PRODUCT_LIST,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  RESET_PRODUCT_FLAG,
  SHOW_LOADER,
  HIDE_LOADER,
  GET_PRODUCT_PRICE_EDIT_INFO,
  RESET_PRODUCT_PRICE_EDIT_FLAG,
  PRODUCT_EDIT_ERROR,
  SET_PRODUCT_PRICE_EDIT_INFO,
  SET_PRODUCT_PRICE,
  SET_PRICE_ERROR,
  SET_PRODUCT_PRICE_ON_FRANCHISE,
  SET_PRICE_FRANCHISE_ID,
  UPDATE_PRODUCT_PRICE,
  SET_PRICE_SUCCESS,
  RESET_FLAGS,
  PRODUCT_REVIEWS,
  SET_PRODUCT_REVIEW_LIST,
  PRODUCT_REVIEW_ERROR,
  RESET_PRODUCT_REVIEW_FLAG,
  EDIT_PRODUCT,
  UPDATE_PRODUCT_STATUS,
  SET_PRODUCT_STATUS,
  DELETE_REVIEW,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";

function* addProductSaga(action: any): any {
  try {
    const { name, category, description, images } = action.payload;
    const isPrivate = 1;
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    console.log("formData = ", formData);
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_PRODUCT_FLAG });
    const method = "post";
    const url = `/product/add`;
    const response = yield call(request, method, url, formData, isPrivate, {
      "Content-Type": "multipart/form-data",
    });
    console.log("add product Response = ", response);
    yield put({ type: HIDE_LOADER });
    yield put({ type: ADD_PRODUCT_SUCCESS, payload: true });
    yield put({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "Product added successfully",
    });
  } catch (e: any) {
    console.log("ADD product ERROR = ", e);
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* editProductSaga(action: any): any {
  try {
    const { data, productId, images } = action.payload;
    const isPrivate = 1;
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("files", data.images[i]);
    }
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_PRODUCT_FLAG });
    const method = "put";
    const url = `/product/edit/${productId}`;
    const response = yield call(request, method, url, formData, isPrivate, {
      "Content-Type": "multipart/form-data",
    });
    console.log("edit product Response = ", response);
    yield put({ type: HIDE_LOADER });
    yield put({ type: ADD_PRODUCT_SUCCESS, payload: true });
    yield put({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "Product updated successfully",
    });
  } catch (e: any) {
    console.log("ADD CATEGORY ERROR = ", e);
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    // yield put({ type: ADD_PRODUCT_ERROR, payload: errMsg });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getProductSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_PRODUCT_FLAG });
    const { franchiseId } = yield select((state) => state.product);
    const queryParam = franchiseId ? `?franchiseId=${parseInt(franchiseId)}` : "";
    const response = yield call(request, "get", `/product${queryParam}`);
    yield put({ type: SET_PRODUCT_LIST, payload: response?.data?.data });
    yield put({ type: SET_PRICE_FRANCHISE_ID, payload: response?.data?.data?.franchiseId });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    // yield put({ type: ADD_PRODUCT_ERROR, payload: errMsg });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getProductPriceEditInfoSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_PRODUCT_PRICE_EDIT_FLAG });
    const response = yield call(request, "get", `/product/priceeditinfo/${action.payload.productId}/${action.payload.distributerId}`);
    yield put({
      type: SET_PRODUCT_PRICE_EDIT_INFO,
      payload: response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* setProductPriceOnFranchiseSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_PRODUCT_PRICE_EDIT_FLAG });
    yield put({ type: SET_PRICE_FRANCHISE_ID, payload: action.payload });
    const response = yield call(request, "get", `/product/getProductPriceOnFranchise/${action.payload}`);
    yield put({
      type: SET_PRODUCT_PRICE_ON_FRANCHISE,
      payload: response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* updateProductPriceSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_PRODUCT_PRICE_EDIT_FLAG });
    const response = yield call(
      request,
      "post",
      `/product/updateProductPrice/${action.payload.productId}/${action.payload.distributerId}`,
      action.payload.data
    );
    console.log("edit price response = ", response);
    yield put({ type: SET_PRICE_SUCCESS });
    yield put({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "Product price updated successfully",
    });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* resetFlagsSaga() {
  yield put({ type: RESET_PRODUCT_PRICE_EDIT_FLAG });
}

function* getProductReviewSaga(): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: RESET_PRODUCT_REVIEW_FLAG });
    const response = yield call(request, "get", `/product/reviews`);
    yield put({ type: SET_PRODUCT_REVIEW_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* updateProductStatusSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let { productList } = yield select((state) => state.product);
    console.log("productListproductList = ", productList);
    yield call(request, "put", `/product/status/${action.payload.id}/${action.payload.status}`);
    productList.forEach((item: any) => {
      if (item.id === action.payload.id) item.status = action.payload.status;
    });
    console.log("productListproductList111 = ", productList);
    yield put({ type: SET_PRODUCT_STATUS, payload: productList });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* deleteReviewOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let { reviewList } = yield select((state) => state.productReviews);
    yield call(request, "delete", `/product/review/${action.payload}`);
    const list = reviewList.filter((item: any) => item.id !== action.payload);
    yield put({ type: SET_PRODUCT_REVIEW_LIST, payload: list });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Review deleted successfully" });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong. Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

export function* watchProduct() {
  yield takeLatest(ADD_PRODUCT, addProductSaga);
  yield takeLatest(EDIT_PRODUCT, editProductSaga);
  yield takeLatest(GET_PRODUCT, getProductSaga);
  yield takeLatest(GET_PRODUCT_PRICE_EDIT_INFO, getProductPriceEditInfoSaga);
  yield takeLatest(SET_PRODUCT_PRICE, setProductPriceOnFranchiseSaga);
  yield takeLatest(UPDATE_PRODUCT_PRICE, updateProductPriceSaga);
  yield takeLatest(RESET_FLAGS, resetFlagsSaga);
  yield takeLatest(UPDATE_PRODUCT_STATUS, updateProductStatusSaga);
  yield takeLatest(PRODUCT_REVIEWS, getProductReviewSaga);
  yield takeLatest(DELETE_REVIEW, deleteReviewOnIdSaga);
}
