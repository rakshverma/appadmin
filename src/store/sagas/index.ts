import { all } from "redux-saga/effects";
import { watchLogin } from "./loginSaga";
import { watchUser } from "./userSaga";
import { watchCategory } from "./categorySaga";
import { watchProduct } from "./productSaga";
import { watchFranchise } from "./franchiseSaga";
import { watchDeleveryBoy } from "./deleveryBoySaga";
import { watchCustomer } from "./customerSaga";
import { watchOrder } from "./orderSaga";

export default function* rootSaga() {
  yield all([watchLogin(), watchUser(), watchCategory(), watchProduct(), watchFranchise(), watchDeleveryBoy(), watchCustomer(), watchOrder()]);
}
