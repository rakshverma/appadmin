import {
  GET_DELEVERY_BOY_LIST,
  ADD_DELEVERY_BOY,
  GET_DELEVERY_BOY,
  DELETE_DELIVERY_BOY,
  RESET_DELIVERY_BOY,
  EDIT_DELIVERY_BOY,
} from "./../actionTypes";
export const getDeleveryBoyListAction = () => {
  return { type: GET_DELEVERY_BOY_LIST, payload: {} };
};
export const addDeleveryBoyAction = (data: any) => {
  return { type: ADD_DELEVERY_BOY, payload: data };
};
export const getDeliveryBoyOnId = (data: any) => {
  return { type: GET_DELEVERY_BOY, payload: data };
};
export const deleteDeliveryBoy = (data: any) => {
  return { type: DELETE_DELIVERY_BOY, payload: data };
};

export const resetDeleveryBoyStatus = () => {
  return { type: RESET_DELIVERY_BOY, payload: "" };
};

export const editDeliveryBoyDetails = (data: any, editId: any) => {
  return { type: EDIT_DELIVERY_BOY, payload: { data, editId } };
};
