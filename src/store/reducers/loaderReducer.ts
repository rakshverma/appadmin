import { SHOW_LOADER, HIDE_LOADER } from "../actionTypes";
const initialState = {
  isLoading: false,
};
export function loaderReducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_LOADER:
      return { isLoading: true };
    case HIDE_LOADER: {
      return { isLoading: false };
    }
    default:
      return { ...state };
  }
}
