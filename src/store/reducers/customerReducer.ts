import { CUSTOMER_ERROR, SET_CUSTOMER_LIST, RESET_CUSTOMER_FLAG } from "../actionTypes";

const initialState = {
  customerList: [],
  isError: false,
  isSuccess: false,
};

export function customerReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CUSTOMER_LIST:
      return { ...state, customerList: action.payload };
    case CUSTOMER_ERROR:
      return { ...state, isError: action.payload };
    case RESET_CUSTOMER_FLAG:
      return { ...state, isError: false, isSuccess: false };
    default:
      return { ...state };
  }
}
