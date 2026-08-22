import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE, CLEAR_STATUS_MESSAGE } from "../actionTypes";
const initialState = {
  isSuccess: false,
  isError: false,
};
export function statusMessageReducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_SUCCESS_MESSAGE:
      return { isSuccess: action.payload, isError: false };
    case SHOW_ERROR_MESSAGE: {
      return { isError: action.payload, isSuccess: false };
    }
    case CLEAR_STATUS_MESSAGE:
      return { isError: false, isSuccess: false };
    default:
      return { ...state };
  }
}
