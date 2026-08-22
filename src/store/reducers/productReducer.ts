import {
  SET_PRODUCT_LIST,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  RESET_PRODUCT_FLAG,
  RESET_PRODUCT_PRICE_EDIT_FLAG,
  PRODUCT_EDIT_ERROR,
  SET_PRODUCT_PRICE_EDIT_INFO,
  SET_PRODUCT_PRICE_ON_FRANCHISE,
  SET_PRICE_ERROR,
  SET_PRICE_FRANCHISE_ID,
  SET_PRICE_SUCCESS,
  SET_PRODUCT_REVIEW_LIST,
  PRODUCT_REVIEW_ERROR,
  RESET_PRODUCT_REVIEW_FLAG,
  SET_PRODUCT_STATUS,
} from "../actionTypes";

const initialState = {
  productList: [],
  franchiseList: [],
  franchiseId: null,
  isError: false,
  isSuccess: false,
};
const priceInitialState = {
  editInfo: {},
  franchiseInfo: {},
  isError: false,
  isSuccess: false,
};
const reviewInitialState = {
  reviewList: [],
  isError: false,
  isSuccess: false,
};

export function productReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload.productList, franchiseList: action.payload.franchiseList };
    case ADD_PRODUCT_ERROR: {
      return { ...state, isError: action.payload, isSuccess: false };
    }
    case ADD_PRODUCT_SUCCESS:
      return { ...state, isError: false, isSuccess: action.payload };
    case SET_PRODUCT_PRICE_ON_FRANCHISE:
      return { ...state, productList: action.payload.productList };
    case SET_PRICE_ERROR:
      return { ...state, isError: action.payload, isSuccess: false };
    case SET_PRICE_FRANCHISE_ID:
      return { ...state, franchiseId: action.payload };
    case RESET_PRODUCT_FLAG:
      return { ...state, isError: false, isSuccess: false };
    case SET_PRODUCT_STATUS:
      return { ...state, productList: action.payload };
    default:
      return { ...state };
  }
}

export function productPriceReducer(state = priceInitialState, action: any) {
  switch (action.type) {
    case SET_PRODUCT_PRICE_EDIT_INFO:
      return { ...state, editInfo: action.payload.editInfo, franchiseInfo: action.payload.franchiseInfo };
    case PRODUCT_EDIT_ERROR: {
      return { ...state, isError: action.payload, isSuccess: false };
    }
    case SET_PRICE_SUCCESS: {
      return { ...state, isError: false, isSuccess: true };
    }
    case RESET_PRODUCT_PRICE_EDIT_FLAG:
      return { editInfo: {}, isError: false, isSuccess: false };
    default:
      return { ...state };
  }
}

export function productReviewReducer(state = reviewInitialState, action: any) {
  switch (action.type) {
    case SET_PRODUCT_REVIEW_LIST:
      return { ...state, reviewList: action.payload };
    case PRODUCT_REVIEW_ERROR:
      return { ...state, isError: action.payload };
    case RESET_PRODUCT_REVIEW_FLAG:
      return { ...state, isError: false, isSuccess: false };
    default:
      return { ...state };
  }
}
