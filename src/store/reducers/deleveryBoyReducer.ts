import {
  SET_DELEVERY_BOY_LIST,
  RESET_FLAGS,
  DELEVERY_BOY_ERROR,
  ADD_DELEVERY_BOY_SUCCESS,
  SET_DELEVERY_BOY,
  SET_RESET_DELIVERY_BOY,
} from "../actionTypes";

const initialState = {
  deleveryBoyList: [],
  isError: false,
  isSuccess: false,
  deliveryBoyDetails: null,
};

export function deleveryBoyReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_DELEVERY_BOY_LIST:
      return { ...state, deleveryBoyList: action.payload };
    case RESET_FLAGS:
      return { ...state, isError: false, isSuccess: false };
    case DELEVERY_BOY_ERROR:
      return { ...state, isError: true };
    case ADD_DELEVERY_BOY_SUCCESS:
      return { ...state, isSuccess: true };
    case SET_DELEVERY_BOY:
      return { ...state, deliveryBoyDetails: action.payload };
    case SET_RESET_DELIVERY_BOY:
      return { ...state, isSuccess: false, isError: false };
    default:
      return { ...state };
  }
}
