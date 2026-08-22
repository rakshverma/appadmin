import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { loaderReducer } from "./loaderReducer";
import { loginReducer, forgotPassReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { productReducer, productPriceReducer, productReviewReducer } from "./productReducer";
import { franchiseReducer } from "./franchiseReducer";
import { deleveryBoyReducer } from "./deleveryBoyReducer";
import { customerReducer } from "./customerReducer";
import { orderReducer } from "./orderReducer";
import { statusMessageReducer } from "./statusMessageReducer";

const appReducer = combineReducers({
  statusMessage: statusMessageReducer,
  loader: loaderReducer,
  login: loginReducer,
  forgotPass: forgotPassReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  productPrice: productPriceReducer,
  franchise: franchiseReducer,
  deleveryBoy: deleveryBoyReducer,
  productReviews: productReviewReducer,
  customer: customerReducer,
  order: orderReducer,
});

const rootReducer = (state: any, action: any) => {
  console.log("action = ", action);
  if (action.type === "RESET_STORE") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
