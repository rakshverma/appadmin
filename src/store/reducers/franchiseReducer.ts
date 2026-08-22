import {
  SET_FRANCHISE_LIST,
  FRANCHISE_ERROR,
  RESET_FLAGS,
  SET_DISTRICT_LIST,
  SET_PINCODE_LIST,
  ADD_FRANCHISE_ERROR,
  ADD_FRANCHISE_SUCCESS,
  SET_FRANCHISE_REQUEST_LIST,
  SET_FRANCHISE_LIST_ON_ROLE,
  SET_SHIPPING_LIST_ON_FRANCHISE,
  SET_FRANCHISE_DETAILS,
  CLEAR_PINCODE_LIST,
} from "../actionTypes";

const initialState = {
  franchiseList: [],
  isError: false,
  isSuccess: false,
  districtList: [],
  pinCodeList: [],
  franchiseRequests: [],
  franchiseListOnRole: [],
  shipping_list: [],
  franchiseDetails: null,
};

export function franchiseReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_FRANCHISE_LIST:
      return { ...state, franchiseList: action.payload };
    case FRANCHISE_ERROR:
      return { ...state, isError: true, isSuccess: false };
    case RESET_FLAGS:
      return { ...state, isError: false, isSuccess: false };
    case SET_DISTRICT_LIST:
      return { ...state, districtList: action.payload };
    case SET_PINCODE_LIST:
      return { ...state, pinCodeList: action.payload };
    case ADD_FRANCHISE_ERROR:
      return { ...state, isError: true, isSuccess: false };
    case ADD_FRANCHISE_SUCCESS:
      return { ...state, isError: false, isSuccess: true, pinCodeList: [] };
    case SET_FRANCHISE_REQUEST_LIST:
      return { ...state, isError: false, franchiseRequests: action.payload };
    case SET_FRANCHISE_LIST_ON_ROLE:
      return { ...state, isError: false, franchiseListOnRole: action.payload };
    case SET_SHIPPING_LIST_ON_FRANCHISE:
      return { ...state, isError: false, shipping_list: action.payload };
    case SET_FRANCHISE_DETAILS:
      return { ...state, franchiseDetails: action.payload };
    case CLEAR_PINCODE_LIST:
      return { ...state, pinCodeList: [] };
    default:
      return { ...state };
  }
}
