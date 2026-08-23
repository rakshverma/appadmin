import { call, put, take, takeLatest, select } from "redux-saga/effects";
import { request } from "../../utils/request";
import moment from "moment";
import {
  GET_ORDERS,
  SET_ORDERS_LIST,
  SHOW_LOADER,
  HIDE_LOADER,
  ORDER_ERROR,
  ORDER_SUCCESS,
  GET_DELEVERYBOY_LIST_ON_FRANCHISE,
  SET_ORDERS_DELEVERYBOY_LIST,
  UPDATE_DELEVERYBOY_ON_ORDER,
  ORDER_DETAILS_ON_ID,
  SET_ORDER_DETAILS_ON_ID,
  UPDATE_DELIVERY_STATUS,
  DELIVERY_BOY_LIST_ON_ORDER_ID,
  UPDATE_DELIVERY_BOY_ON_ORDER,
  CANCEL_ORDER,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  GET_DELIVERY_LIST,
  SET_DELIVERY_LIST,
  GET_ORDER_LIST_ON_FRANCHISE_ID,
  CANCEL_ORDERS,
  CANCEL_ORDER_ITEM,
  COMPLETE_ORDERS,
  PROCESS_ORDERS,
  UPDATE_ADMIN_NOTES,
  UPDATE_DELIVERY_DATE,
} from "../actionTypes";

function* getOrdersSaga(): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", "/orders");
    yield put({ type: SET_ORDERS_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: SET_ORDERS_LIST, payload: [] });
  }
}

function* getOrderListOnFranchiseId(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", `/orders/byFrnchise?id=${action.payload}`);
    yield put({ type: SET_ORDERS_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: SET_ORDERS_LIST, payload: [] });
  }
}

function* getDeleveryBoyOnFranchiseSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", `/orders/getDeleveryboyListOnFranchise?franchiseId=${action.payload}`);
    yield put({ type: SET_ORDERS_DELEVERYBOY_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: SET_ORDERS_DELEVERYBOY_LIST, payload: [] });
  }
}

function* updateDeleveryboyOnOrderSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/updateDeleveryboyWithStatus`, action.payload);
    yield put({ type: ORDER_SUCCESS, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Delivery boy assigned successfully" });
  } catch (e: any) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: SET_ORDERS_DELEVERYBOY_LIST, payload: [] });
  }
}

function* getOrderDetailsOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", `/orders/${action.payload}`);
    yield put({ type: SET_ORDER_DETAILS_ON_ID, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: SET_DELIVERY_LIST, payload: [] });
  }
}

function* updateOrderDeliveryStatusSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/status`, { id: action.payload.id, status: action.payload.status });
    let { orderDetails, deliveryList } = yield select((state) => state.order);
    if (orderDetails?.itemList.length) {
      orderDetails.itemList.forEach((item: any) => {
        if (item.id === action.payload.id) {
          item.delivery_status = action.payload.status;
        }
      });
    }
    yield put({ type: SET_ORDER_DETAILS_ON_ID, payload: orderDetails });
    if (deliveryList.length) {
      deliveryList.forEach((item: any) => {
        item.forEach((itm: any) => {
          if (itm.item_id === action.payload.id) {
            itm.delivery_status = action.payload.status;
          }
        });
      });
    }
    yield put({ type: SET_DELIVERY_LIST, payload: deliveryList });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Order status updated successfully" });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getDeliveryBoyOnOrderIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "get", `/orders/deliveryboyList/${action.payload}`);
    yield put({ type: SET_ORDERS_DELEVERYBOY_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* updateDeliveryBoyOnOrderIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/assigndeliveryboy`, {
      boyId: action.payload.boyId,
      orderId: action.payload.orderId,
      orderDetailsId: action.payload.detailsId,
    });
    let { orderDetails } = yield select((state) => state.order);
    if (orderDetails?.itemList.length) {
      orderDetails.itemList.forEach((item: any) => {
        if (item.id === action.payload.detailsId) {
          item.delivery_boy_id = action.payload.boyId;
          item.delivery_status = 2;
        }
      });
    }
    yield put({ type: SET_ORDER_DETAILS_ON_ID, payload: orderDetails });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Delivery boy assigned successfully" });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* cancelOrderOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    let { orderList } = yield select((state) => state.order);
    const response = yield call(request, "put", `/orders/cancelOrder/${action.payload}`);
    orderList.forEach((item: any) => {
      if (action.id === item.id) {
        item.status = 3;
      }
    });
    yield put({ type: SET_ORDERS_LIST, payload: orderList });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* getDEliveryListOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const date = moment().format("DD/MM/YYYY");
    const response = yield call(request, "get", `/deleveryboy/deliveryList?date=${date}`);

    yield put({ type: SET_DELIVERY_LIST, payload: response?.data?.data });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* cancelOrderItemsSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/cancelOrders`, action.payload);
    let { orderList } = yield select((state) => state.order);

    action.payload.forEach((item: any) => {
      orderList.forEach((obj: any) => {
        if (item == obj.id) {
          obj.status = 3;
          const delivery_status = obj.delivery_status.split(",");
          let newStatus: any = [];
          delivery_status.forEach((s: any) => {
            newStatus.push(4);
          });
          obj.delivery_status = newStatus.toString();
          obj.delevery_boy_id = null;
        }
      });
    });
    yield put({ type: SET_ORDERS_LIST, payload: orderList });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Orders canceled successfully" });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* cancelOrderItemSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/cancelOrderOnItemId`, action.payload);
    let { orderDetails } = yield select((state) => state.order);
    let totalPrice = 0;

    orderDetails.itemList.forEach((item: any) => {
      if (item.id == action.payload.itemId) {
        item.delivery_status = 4;
        item.delivery_boy_id = null;
      } else {
        totalPrice = totalPrice + item.price * item.count;
      }
    });

    // if (totalPrice != 0) totalPrice = totalPrice + orderDetails.shipping_cost;
    // orderDetails.total_price = totalPrice;

    yield put({ type: SET_ORDER_DETAILS_ON_ID, payload: orderDetails });
    const res = yield call(request, "get", `/orders/${orderDetails.id}`);
    yield put({ type: SET_ORDER_DETAILS_ON_ID, payload: res?.data?.data });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Item canceled successfully" });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* completeOrderItemSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/completeOrderItems`, action.payload);
    let { orderList } = yield select((state) => state.order);

    action.payload.forEach((item: any) => {
      orderList.forEach((obj: any) => {
        if (item == obj.id) {
          obj.status = 2;
          const delivery_status = obj.delivery_status.split(",");
          let newStatus: any = [];
          delivery_status.forEach((s: any) => {
            if (s != 4) newStatus.push(3);
          });
          obj.delivery_status = newStatus.toString();
          obj.delevery_boy_id = null;
        }
      });
    });
    yield put({ type: SET_ORDERS_LIST, payload: orderList });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Orders completed successfully" });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* processOrderItemSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    yield call(request, "put", `/orders/processOrderItems`, action.payload);
    let { orderList } = yield select((state) => state.order);

    action.payload.forEach((item: any) => {
      orderList.forEach((obj: any) => {
        if (Number(item) === Number(obj.id)) {
          obj.status = 1;
          const delivery_status = obj.delivery_status.split(",");
          obj.delivery_status = delivery_status.map(() => 1).toString();
          obj.delevery_boy_id = null;
        }
      });
    });
    yield put({ type: SET_ORDERS_LIST, payload: orderList });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Orders moved to processing successfully" });
    yield put({ type: HIDE_LOADER });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* updateAdminNotesOnIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/updateAdminNotes`, {
      adminNotes: action.payload.adminNotes,
      orderId: action.payload.orderId,
    });

    let { orderDetails } = yield select((state) => state.order);
    if (orderDetails?.itemList.length) {
      orderDetails.itemList.forEach((item: any) => {
        if (item.id === action.payload.orderId) {
          item.admin_notes = action.payload.adminNotes;
        }
      });
    }
    yield put({ type: SET_ORDER_DETAILS_ON_ID, payload: orderDetails });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Admin Delivery notes updated successfully" });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

function* updateDeliveryDateOnOrderIdSaga(action: any): any {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(request, "put", `/orders/updateDeliveryDate`, {
      id: action.payload.orderId,
      itemId: action.payload.id,
      date: action.payload.date,
    });

    let { orderDetails } = yield select((state) => state.order);
    if (orderDetails?.itemList.length) {
      orderDetails.itemList.forEach((item: any) => {
        if (item.id === action.payload.itemId) {
          item.delivery_date = action.payload.date;
        }
      });
    }
    yield put({ type: SET_ORDER_DETAILS_ON_ID, payload: orderDetails });
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "OrderdDelivery date updated successfully" });
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Please try again.";
    yield put({ type: HIDE_LOADER });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: errMsg });
  }
}

export function* watchOrder() {
  yield takeLatest(GET_ORDERS, getOrdersSaga);
  yield takeLatest(GET_DELEVERYBOY_LIST_ON_FRANCHISE, getDeleveryBoyOnFranchiseSaga);
  yield takeLatest(UPDATE_DELEVERYBOY_ON_ORDER, updateDeleveryboyOnOrderSaga);
  yield takeLatest(ORDER_DETAILS_ON_ID, getOrderDetailsOnIdSaga);
  yield takeLatest(UPDATE_DELIVERY_STATUS, updateOrderDeliveryStatusSaga);
  yield takeLatest(DELIVERY_BOY_LIST_ON_ORDER_ID, getDeliveryBoyOnOrderIdSaga);
  yield takeLatest(UPDATE_DELIVERY_BOY_ON_ORDER, updateDeliveryBoyOnOrderIdSaga);
  yield takeLatest(CANCEL_ORDER, cancelOrderOnIdSaga);
  yield takeLatest(GET_DELIVERY_LIST, getDEliveryListOnIdSaga);
  yield takeLatest(GET_ORDER_LIST_ON_FRANCHISE_ID, getOrderListOnFranchiseId);
  yield takeLatest(CANCEL_ORDERS, cancelOrderItemsSaga);
  yield takeLatest(CANCEL_ORDER_ITEM, cancelOrderItemSaga);
  yield takeLatest(COMPLETE_ORDERS, completeOrderItemSaga);
  yield takeLatest(PROCESS_ORDERS, processOrderItemSaga);
  yield takeLatest(UPDATE_ADMIN_NOTES, updateAdminNotesOnIdSaga);
  yield takeLatest(UPDATE_DELIVERY_DATE, updateDeliveryDateOnOrderIdSaga);
}
