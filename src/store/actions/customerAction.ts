import { CUSTOMER_LIST, RESET_CUSTOMER } from "./../actionTypes";

export const getCustomerListAction = () => {
  return { type: CUSTOMER_LIST, payload: {} };
};
export const resetCustomerFlag = () => {
  return { type: RESET_CUSTOMER, payload: {} };
};
