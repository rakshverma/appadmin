import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCategoryProps } from "../../types";
import CustomModal from "./../CustomModal";
import { addCategoryAction, getCategoryAction, resetCategoryFlags } from "../../store/actions/categoryAction";

function AddCategory({ isOpen, closeModal, editInfo }: AddCategoryProps) {
  const dispatch = useDispatch();
  const { isError, isSuccess } = useSelector((state: any) => state.category);
  const [categoryVal, setCategoryVal] = useState(editInfo ? editInfo.name : "");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    return () => {
      setCategoryError("");
      setCategoryVal("");
    };
  }, []);

  const handleCategoryChange = (e: any) => {
    setCategoryVal(e.target.value);
  };

  const handleSaveClicked = () => {
    if (!categoryVal) {
      setCategoryError("Category name is required");
      return;
    }
    setCategoryError("");
    dispatch(addCategoryAction(categoryVal, editInfo ? editInfo.id : null));
  };

  if (isSuccess) {
    dispatch(getCategoryAction());
    closeModal();
  }

  return (
    <CustomModal
      handleModalCloseRequest={closeModal}
      handleSaveClicked={handleSaveClicked}
      modalTitle={editInfo ? "Edit New Category" : "Add New Category"}
      isOpen={isOpen}
      footerButtonText={editInfo ? "Edit Category" : "Save Category"}
      closeModal={closeModal}
    >
      <div className="form-group">
        <label>Category Name</label>
        <input
          type={"text"}
          name={"category"}
          value={categoryVal}
          placeholder={"Enter category name"}
          onChange={handleCategoryChange}
          className="form-control"
        />
        {isError || categoryError ? <p style={{ color: "red" }}>{isError || categoryError}</p> : null}
      </div>
    </CustomModal>
  );
}

export default AddCategory;
