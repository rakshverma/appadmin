import {
  SET_CATEGORY_LIST,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_SUCCESS,
  RESET_CATEGORY_FLAG,
} from "../actionTypes";

const initialState = {
  categoryList: [],
  isError: false,
  isSuccess: false,
};
export function categoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    case ADD_CATEGORY_ERROR: {
      return { ...state, isError: action.payload, isSuccess: false };
    }
    case ADD_CATEGORY_SUCCESS:
      return { ...state, isError: false, isSuccess: true };
    case RESET_CATEGORY_FLAG:
      return { ...state, isError: false, isSuccess: false };
    default:
      return { ...state };
  }
}
