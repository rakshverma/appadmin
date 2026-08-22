import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASS_FAILURE,
  FORGOT_PASS_SUCCESS,
} from "./../actionTypes";

const initialState = {
  isSuccess: false,
  isError: false,
};
const forgotPassInitialState = {
  isSuccess: false,
  isError: false,
};

export function loginReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isSuccess: true };
    case LOGIN_FAILURE:
      return { ...state, isError: action.payload };
    case FORGOT_PASS_FAILURE:
      return { ...state, isError: action.payload, isSuccess: false };
    case FORGOT_PASS_SUCCESS:
      return { ...state, isError: false, isSuccess: true };
    default:
      return { ...state };
  }
}

export function forgotPassReducer(state = forgotPassInitialState, action: any) {
  switch (action.type) {
    case FORGOT_PASS_FAILURE:
      return { ...state, isError: action.payload, isSuccess: false };
    case FORGOT_PASS_SUCCESS:
      return { ...state, isError: false, isSuccess: true };
    default:
      return { ...state };
  }
}
