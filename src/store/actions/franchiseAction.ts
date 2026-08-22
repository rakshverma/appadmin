import {
  GET_FRANCHISE,
  GET_DISTRICT,
  GET_PINCODE_ON_DISTRICT,
  ADD_FRANCHISE,
  GET_FRANCHISE_REQUESTS,
  GET_FRANCHISE_LIST_ON_ROLE,
  GET_SHIPPING_LIST_ON_FRANCHISE,
  UPDATE_SHIPPING_LIST_ON_FRANCHISE,
  GET_FRANCHISE_DETAILS,
  EDIT_FRANCHISE,
  DELETE_FRANCHISE,
} from "./../actionTypes";
export const getFranchiseListAction = () => {
  return { type: GET_FRANCHISE, payload: {} };
};
export const getDistrictListAction = () => {
  return { type: GET_DISTRICT, payload: {} };
};
export const getPinCodeListOnDistrictAction = (district: string) => {
  return { type: GET_PINCODE_ON_DISTRICT, payload: district };
};
export const addFranchiseAction = (data: any) => {
  return { type: ADD_FRANCHISE, payload: data };
};
export const editFranchiseAction = (data: any, editId: any) => {
  return { type: EDIT_FRANCHISE, payload: { data, editId } };
};
export const franchiseRequestListAction = () => {
  return { type: GET_FRANCHISE_REQUESTS, payload: {} };
};
export const getFranchiseListOnRole = () => {
  return { type: GET_FRANCHISE_LIST_ON_ROLE, payload: {} };
};
export const getShippingCostOnFranchiseId = (franchiseId: any) => {
  return { type: GET_SHIPPING_LIST_ON_FRANCHISE, payload: franchiseId };
};
export const updateShippingCostAction = (data: any, franchiseId: any) => {
  return { type: UPDATE_SHIPPING_LIST_ON_FRANCHISE, payload: { data, franchiseId } };
};
export const getFranchiseOnId = (editId: any) => {
  return { type: GET_FRANCHISE_DETAILS, payload: editId };
};

export const deleteFranchiseAction = (userId: any) => {
  return { type: DELETE_FRANCHISE, payload: userId };
};
