import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import AddCategory from "../components/Category/AddCategory";
import { constants } from "../utils/constants";
import { ProductFormData } from "../types";
import AddForm from "../components/Product/AddForm";
import { getCategoryAction, resetCategoryFlags } from "../store/actions/categoryAction";
import { getProductListAction, editProductAction } from "../store/actions/productAction";
const { productListheading, product, addProduct, productList } = constants;

const breadCrumb = [
  { to: "product/list", name: productList },
  { to: "", name: "Edit Product" },
];

function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { categoryList } = useSelector((state: any) => state.category);
  const { isSuccess, isError, productList } = useSelector((state: any) => state.product);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editInfo, setEditInfo] = useState<any>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    dispatch(getCategoryAction());
    if (!productList.length) {
      dispatch(getProductListAction());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) navigate("/product/list");
  }, [isSuccess, navigate]);

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
    dispatch(editProductAction(data, productId, editInfo[0].images));
  };

  const openCategoryModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal = called");
    dispatch(resetCategoryFlags());
    setIsOpen(false);
  };

  useEffect(() => {
    const product = productList.filter((item: any) => item.id == productId);
    if (product.length) {
      setEditInfo(product);
      setValue("name", product[0].name);
      setValue("category", product[0].category_id);
      setValue("description", product[0].description);
    }
  }, [productList, setValue, productId]);

  console.log("productId = ", productId);
  console.log("editInfo = ", editInfo);

  return (
    <>
      <AddForm
        pageHeading={product}
        breadCrumb={breadCrumb}
        heading={productId ? "Edit Product" : addProduct}
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
        productId={productId}
        editInfo={editInfo}
      />
      {isOpen && <AddCategory isOpen={isOpen} closeModal={closeModal} />}
    </>
  );
}

export default EditProduct;
