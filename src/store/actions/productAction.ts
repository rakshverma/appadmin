import {
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCT_PRICE_EDIT_INFO,
  SET_PRODUCT_PRICE,
  UPDATE_PRODUCT_PRICE,
  RESET_FLAGS,
  PRODUCT_REVIEWS,
  EDIT_PRODUCT,
  UPDATE_PRODUCT_STATUS,
  DELETE_REVIEW,
} from "./../actionTypes";

export const addProductAction = (data: any) => {
  return { type: ADD_PRODUCT, payload: data };
};
export const editProductAction = (data: any, productId: any, images: any) => {
  return { type: EDIT_PRODUCT, payload: { data, productId, images } };
};
export const getProductListAction = () => {
  return { type: GET_PRODUCT, payload: null };
};
export const getProductPriceEditInfo = (data: any) => {
  return { type: GET_PRODUCT_PRICE_EDIT_INFO, payload: data };
};
export const setProductPriceOnFranchiseId = (data: any) => {
  console.log(`data=${data}`);
  return { type: SET_PRODUCT_PRICE, payload: data };
};
export const updateProductPriceAction = (data: any, productId: any, distributerId: any) => {
  return { type: UPDATE_PRODUCT_PRICE, payload: { data, productId, distributerId } };
};
export const resetProductListFlagsAction = () => {
  return { type: RESET_FLAGS };
};
export const getProductReviewsAction = () => {
  return { type: PRODUCT_REVIEWS };
};
export const updateProductStatus = (id: any, status: any) => {
  return { type: UPDATE_PRODUCT_STATUS, payload: { id, status } };
};
export const deleteReviewOnId = (id: any) => {
  return { type: DELETE_REVIEW, payload: id };
};
