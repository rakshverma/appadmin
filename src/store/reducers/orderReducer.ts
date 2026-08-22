import { SET_ORDERS_LIST, RESET_ORDERS_FLAG, SET_ORDERS_DELEVERYBOY_LIST, ORDER_SUCCESS, ORDER_ERROR, SET_ORDER_DETAILS_ON_ID, SET_DELIVERY_LIST } from "../actionTypes";

const initialState = {
  orderList: [],
  ordersDeleveryBoyList: [],
  orderDetails: {},
  isError: false,
  isSuccess: false,
  deliveryList: []
};

export function orderReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_ORDERS_LIST:
      return { ...state, orderList: action.payload };
    case RESET_ORDERS_FLAG:
      return { ...state, isError: false, isSuccess: false };
    case SET_ORDERS_DELEVERYBOY_LIST:
      return { ...state, ordersDeleveryBoyList: action.payload };
    case ORDER_SUCCESS:
      return { ...state, isSuccess: action.payload, isError: false };
    case ORDER_ERROR:
      return { ...state, isError: action.payload, isSuccess: false };
    case SET_ORDER_DETAILS_ON_ID:
      return { ...state, orderDetails: action.payload };
    case SET_DELIVERY_LIST: 
    return { ...state, deliveryList: action.payload };
    default:
      return { ...state };
  }
}
