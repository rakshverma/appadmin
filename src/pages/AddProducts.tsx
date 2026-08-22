import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import AddCategory from "../components/Category/AddCategory";
import { constants } from "../utils/constants";
import { ProductFormData } from "../types";
import AddForm from "../components/Product/AddForm";
import { getCategoryAction, resetCategoryFlags } from "../store/actions/categoryAction";
import { addProductAction } from "../store/actions/productAction";
const { productListheading, product, addProduct, productList } = constants;

const breadCrumb = [
  { to: "product/list", name: productList },
  { to: "", name: addProduct },
];

function AddProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryList } = useSelector((state: any) => state.category);
  const { isSuccess, isError } = useSelector((state: any) => state.product);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) navigate("/product/list");
  }, [isSuccess]);

  const onButtonClick = () => {
    navigate("/product/list");
  };

  const handleChange = (event: any) => {
    console.log("event = ", event);
    if (event.target.files) {
      console.log("files = ", event);
      const files = Array.from(event.target.files);
      setImagePreviews([]);
      console.log("files = ", files);
      files.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews((state: any) => [...state, e?.target?.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onSubmit = (data: ProductFormData) => {
    console.log(data);
    dispatch(addProductAction(data));
  };

  const openCategoryModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal = called");
    dispatch(resetCategoryFlags());
    setIsOpen(false);
  };

  return (
    <>
      <AddForm
        pageHeading={product}
        breadCrumb={breadCrumb}
        heading={addProduct}
        buttonText={productListheading}
        onButtonClick={onButtonClick}
        formData={formData}
        categoryList={categoryList}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
        imagePreviews={imagePreviews}
        openCategoryModal={openCategoryModal}
      />
      {isOpen && <AddCategory isOpen={isOpen} closeModal={closeModal} />}
    </>
  );
}

export default AddProducts;
