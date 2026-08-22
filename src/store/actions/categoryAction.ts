import {
  ADD_CATEGORY,
  GET_CATEGORY,
  RESET_CATEGORY,
  DELETE_CATEGORY,
} from "./../actionTypes";

export const addCategoryAction = (category: string, editId: number | null) => {
  return { type: ADD_CATEGORY, payload: { category, editId } };
};

export const getCategoryAction = () => {
  return { type: GET_CATEGORY, payload: null };
};

export const resetCategoryFlags = () => {
  return { type: RESET_CATEGORY };
};

export const deleteCategory = (id: number) => {
  return { type: DELETE_CATEGORY, payload: { id } };
};
