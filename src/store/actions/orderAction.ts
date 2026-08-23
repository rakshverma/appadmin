import {
  GET_ORDERS,
  GET_DELEVERYBOY_LIST_ON_FRANCHISE,
  UPDATE_DELEVERYBOY_ON_ORDER,
  ORDER_DETAILS_ON_ID,
  UPDATE_DELIVERY_STATUS,
  DELIVERY_BOY_LIST_ON_ORDER_ID,
  UPDATE_DELIVERY_BOY_ON_ORDER,
  CANCEL_ORDER,
  GET_DELIVERY_LIST,
  GET_ORDER_LIST_ON_FRANCHISE_ID,
  CANCEL_ORDERS,
  CANCEL_ORDER_ITEM,
  COMPLETE_ORDERS,
  PROCESS_ORDERS,
  UPDATE_ADMIN_NOTES,
  UPDATE_DELIVERY_DATE,
} from "./../actionTypes";
export const getOrdersListAction = () => {
  return { type: GET_ORDERS, payload: {} };
};
export const getDeleveryBoyListOnFranchise = (franchiseId: number) => {
  return { type: GET_DELEVERYBOY_LIST_ON_FRANCHISE, payload: franchiseId };
};
export const updateDeleveryBoyDetailsOnOrder = (deleveryboyId: any, status: any, orderId: any) => {
  return { type: UPDATE_DELEVERYBOY_ON_ORDER, payload: { deleveryboyId, status, orderId } };
};
export const getOrderDetailsOnId = (id: any) => {
  return { type: ORDER_DETAILS_ON_ID, payload: id };
};
export const updateDeliveryStatusOnId = (id: number, status: any) => {
  return { type: UPDATE_DELIVERY_STATUS, payload: { id, status } };
};
export const getDeliveryBoyOnOrderId = (id: any) => {
  return { type: DELIVERY_BOY_LIST_ON_ORDER_ID, payload: id };
};
export const updateDeliveryBoyOnOrderId = (boyId: any, orderId: any, detailsId: any) => {
  return { type: UPDATE_DELIVERY_BOY_ON_ORDER, payload: { boyId, orderId, detailsId } };
};
export const cancelOrderOnId = (id: any) => {
  return { type: CANCEL_ORDER, payload: id };
};

export const getDeliveryListOnDeliveryBoy = (id: any) => {
  return { type: GET_DELIVERY_LIST, payload: id };
};

export const getOrderListOnFranchiseId = (id: any) => {
  return { type: GET_ORDER_LIST_ON_FRANCHISE_ID, payload: id };
};

export const cancelOrdersAction = (orderIdList: any) => {
  return { type: CANCEL_ORDERS, payload: orderIdList };
};

export const cancelOrderItemAction = (orderId: any, itemId: any, mainOrderCancel: any) => {
  return { type: CANCEL_ORDER_ITEM, payload: { orderId, itemId, mainOrderCancel } };
};

export const completeOrdersAction = (orderIdList: any) => {
  return { type: COMPLETE_ORDERS, payload: orderIdList };
};

export const processOrdersAction = (orderIdList: any) => {
  return { type: PROCESS_ORDERS, payload: orderIdList };
};

export const updateAdminNotesOnOrderId = (adminNotes: any, orderId: any) => {
  return { type: UPDATE_ADMIN_NOTES, payload: { adminNotes, orderId } };
};

export const updateDeliveryDateOnOrderId = (orderId: any, id: any, date: any) => {
  return { type: UPDATE_DELIVERY_DATE, payload: { orderId, id, date } };
};
