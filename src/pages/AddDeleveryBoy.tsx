import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { constants } from "../utils/constants";

import { districtList } from "./../utils/districtList";
import AddForm from "../components/DeleveryBoy/AddForm";
import { getDistrictListAction, getFranchiseListOnRole } from "../store/actions/franchiseAction";
import { addDeleveryBoyAction, getDeliveryBoyOnId, resetDeleveryBoyStatus, editDeliveryBoyDetails } from "../store/actions/deleveryBoyAction";
const { deleveryBoyListHeading, deleveryBoy, addDeleveryBoy, deleveryBoyList } = constants;

const breadCrumb = [
  { to: "deleveryboy/list", name: deleveryBoyList },
  { to: "", name: addDeleveryBoy },
];

function AddDeleveryBoy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const editId = urlParams.get("eid");
  const { userInfo } = useSelector((state: any) => state.user);
  const { franchiseListOnRole } = useSelector((state: any) => state.franchise);
  const { isError, isSuccess, deliveryBoyDetails } = useSelector((state: any) => state.deleveryBoy);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<any>();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(getFranchiseListOnRole());
    dispatch(getDistrictListAction());
    if (editId) {
      dispatch(getDeliveryBoyOnId(editId));
    }
    return () => {
      dispatch(resetDeleveryBoyStatus());
    };
  }, []);

  useEffect(() => {
    if (editId) {
      console.log("deliveryBoyDetails111 = ", deliveryBoyDetails);
      reset({
        name: deliveryBoyDetails?.name || "",
        phone: deliveryBoyDetails?.phone_number || "",
        email: deliveryBoyDetails?.email || "",
        franchiseId: deliveryBoyDetails?.franchise_id || "",
        status: deliveryBoyDetails ? `${deliveryBoyDetails.status}` : "",
        state: deliveryBoyDetails?.state || "West Bengal",
        district: userInfo.role_id === 2 ? userInfo.district : deliveryBoyDetails?.district ? deliveryBoyDetails.district : "",
      });
      setValue("franchiseId", deliveryBoyDetails?.franchise_id || "");
      setValue("status", deliveryBoyDetails ? `${deliveryBoyDetails.status}` : "");
      setValue("district", userInfo.role_id === 2 ? userInfo.district : deliveryBoyDetails?.district ? deliveryBoyDetails.district : "");
    }
  }, [editId, deliveryBoyDetails, reset, setValue, userInfo]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/deleveryboy/list");
    }
  }, [isSuccess, navigate]);

  const onButtonClick = () => {
    navigate("/deleveryboy/list");
  };

  const resetForm = () => {
    reset();
  };

  const handleChange = (event: any) => {};

  const onSubmit = (data: any) => {
    if (editId) {
      console.log("datata = ", data);
      dispatch(editDeliveryBoyDetails(data, editId));
    } else {
      dispatch(addDeleveryBoyAction(data));
    }
  };

  const watchDistrict = watch("district");
  watch("franchiseId");
  // watch("status");

  return (
    <>
      <AddForm
        pageHeading={deleveryBoy}
        breadCrumb={breadCrumb}
        heading={editId ? "Edit Delivery Boy" : addDeleveryBoy}
        buttonText={deleveryBoyListHeading}
        onButtonClick={onButtonClick}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
        districtList={districtList}
        franchiseListOnRole={franchiseListOnRole}
        userInfo={userInfo}
        deliveryBoyDetails={deliveryBoyDetails}
        editId={editId}
      />
    </>
  );
}

export default AddDeleveryBoy;
