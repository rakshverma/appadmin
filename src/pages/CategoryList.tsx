import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import { constants } from "./../utils/constants";
import ListingCardHeadings from "../components/ListingCardHeadings";
import AddCategory from "../components/Category/AddCategory";
import CategoryTable from "./../components/Category/CategoryTable";
import {
  getCategoryAction,
  resetCategoryFlags,
  deleteCategory,
} from "./../store/actions/categoryAction";

const { categoryListHeading, addCategory } = constants;
function CategoryList() {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state: any) => state.category);
  const [isOpen, setIsOpen] = useState(false);
  const [editInfo, setEditInfo] = useState(null);
  const breadCrumb = [{ to: "category/list", name: "Category List" }];

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const onButtonClick = () => {
    setIsOpen(true);
  };

  const onClickEdit = (e: any, id: number) => {
    e.preventDefault();
    console.log("edit CALLED = ", categoryList);
    if (id && categoryList.length) {
      console.log("edit CALLED11 = ", categoryList.length);
      const details = categoryList.filter((obj: any) => obj.id === id);
      console.log("details = ", details);
      if (details.length) {
        setEditInfo(details[0]);
        setIsOpen(true);
      }
    }
  };

  const onClickDelete = (e: any, id: number) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
  };

  const closeModal = () => {
    console.log("closeModal = called");
    setEditInfo(null);
    dispatch(resetCategoryFlags());
    setIsOpen(false);
  };

  return (
    <>
      <div className="container-fluid" style={{ marginBottom: 100 + "px" }}>
        <BreadCrumb pageHeading={"Categories"} breadCrumb={breadCrumb} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <ListingCardHeadings
                  heading={categoryListHeading}
                  button={{
                    type: "button",
                    text: addCategory,
                  }}
                  onClick={onButtonClick}
                />
                <div className="row">
                  <div className="col-md-12">
                    <CategoryTable
                      categoryList={categoryList}
                      onClickEdit={onClickEdit}
                      onClickDelete={onClickDelete}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <AddCategory
          isOpen={isOpen}
          closeModal={closeModal}
          editInfo={editInfo ? editInfo : undefined}
        />
      )}
    </>
  );
}

export default CategoryList;
