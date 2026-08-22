import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavigateOptions } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { getProductPriceEditInfo, updateProductPriceAction, resetProductListFlagsAction } from "../store/actions/productAction";
import PriceForm from "./../components/Product/PriceForm";
import { constants } from "../utils/constants";
import { EditPriceFormProps } from "../types";

interface CustomNavigateOptions extends NavigateOptions {
  tab?: string;
}

const { productPriceheading, setProductPrice, productList } = constants;
const breadCrumb = [
  { to: "product/list", name: productList },
  { to: "", name: setProductPrice },
];

function AddProductPrice() {
  const { productId, distributerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editInfo, franchiseInfo, isError, isSuccess } = useSelector((state: any) => state.productPrice);
  console.log("editInfo = ", editInfo);
  console.log("editInfo = ", franchiseInfo);
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<EditPriceFormProps>();
  const { fields, append, remove } = useFieldArray({
    name: "quantity_wise_price",
    control,
  });

  const getPinCodeText = (zipCodes: any) => {
    if (!zipCodes) return "";
    if (Array.isArray(zipCodes)) return zipCodes.join(", ");
    try {
      const parsed = JSON.parse(zipCodes);
      return Array.isArray(parsed) ? parsed.join(", ") : "";
    } catch (e) {
      return "";
    }
  };

  useEffect(() => {
    dispatch(getProductPriceEditInfo({ productId, distributerId }));
    return () => {
      console.log("UNMOUNT PRODUCT EDIT CALLED");
      dispatch(resetProductListFlagsAction());
    };
  }, [dispatch, productId, distributerId]);

  useEffect(() => {
    reset({
      name: editInfo.name,
      franchise: franchiseInfo?.franchise_name || franchiseInfo?.name,
      pinCodes: getPinCodeText(franchiseInfo?.zip_codes),
      is_available: editInfo.is_available || 0,
      delevery_days: editInfo.delevery_days ? JSON.parse(editInfo.delevery_days) : null,
      quantity_wise_price: editInfo.quantity_wise_price
        ? JSON.parse(editInfo.quantity_wise_price)
        : [{ quantity: "", unit: "kg", price: "", stock_count: "", shipping: 0 }],
    });
  }, [reset, editInfo, franchiseInfo]);

  useEffect(() => {
    if (isSuccess) navigate("/product/list", { state: { tab: "price" } } as CustomNavigateOptions);
  }, [navigate, isSuccess]);

  const onButtonClick = () => {
    navigate("/product/list");
  };

  const handleAddRow = () => {
    append({ quantity: "", unit: "kg", price: "", stock_count: "", shipping: 0 }); // append a new row with the default values
  };

  const handleRemoveRow = (index: number) => {
    remove(index); // remove a row at a given index
  };

  const handleChange = (event: any) => {
    console.log("event = ", event);
  };

  const onSubmit = (data: EditPriceFormProps) => {
    console.log("Data = ", data, distributerId);
    dispatch(updateProductPriceAction(data, productId, distributerId));
  };

  return (
    <>
      <PriceForm
        pageHeading={productPriceheading}
        breadCrumb={breadCrumb}
        heading={setProductPrice}
        buttonText={setProductPrice}
        onButtonClick={onButtonClick}
        editInfo={editInfo}
        franchiseInfo={franchiseInfo}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
        fields={fields}
        handleAddRow={handleAddRow}
        handleRemoveRow={handleRemoveRow}
      />
    </>
  );
  //return <PriceForm editInfo={editInfo} />;
}

export default AddProductPrice;
