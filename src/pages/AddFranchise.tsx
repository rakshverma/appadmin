import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { constants } from "../utils/constants";
import { districtList } from "./../utils/districtList";
import { FranchiseFormData } from "../types";
import AddForm from "../components/Franchise/AddForm";
import { getDistrictListAction, getPinCodeListOnDistrictAction, getFranchiseOnId } from "../store/actions/franchiseAction";
import { getPinCodesOnUserAction } from "./../store/actions/userAction";
import { addFranchiseAction, editFranchiseAction } from "../store/actions/franchiseAction";
import { CLEAR_PINCODE_LIST } from "./../store/actionTypes";
const { franchiseListHeading, franchise, addFranchise, franchiseList } = constants;

function parseZipCodes(zipCodes: any) {
  if (!zipCodes) return [];
  if (Array.isArray(zipCodes)) return zipCodes;
  try {
    const parsed = JSON.parse(zipCodes);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function AddFranchise() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const editId = urlParams.get("eid");
  const { userInfo, districtZipCodes } = useSelector((state: any) => state.user);
  const { isSuccess, isError, pinCodeList, franchiseDetails } = useSelector((state: any) => state.franchise);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<any>({
    defaultValues: {
      zipCodes: [],
      name: "",
      phone: "",
      email: "",
      franchiseName: "",
      status: "",
      state: "",
      district: "",
    },
  });
  const [formData, setFormData] = useState({});
  const [pinCodes, setPinCodes] = useState([]);

  const breadCrumb = [
    { to: "franchise/list", name: franchiseList },
    { to: "", name: editId ? "Edit Franchise" : addFranchise },
  ];

  useEffect(() => {
    // dispatch(getDistrictListAction());
    return () => {
      dispatch({ type: CLEAR_PINCODE_LIST });
    };
  }, [dispatch]);

  useEffect(() => {
    if (editId) {
      setValue("name", franchiseDetails?.name);
      setValue("phone", franchiseDetails?.phone_number);
      setValue("email", franchiseDetails?.email);
      setValue("franchiseName", franchiseDetails?.franchise_name);
      setValue("status", franchiseDetails?.status);
      setValue("state", franchiseDetails?.state || "West Bengal");
      setValue("district", franchiseDetails?.district);
      setValue("zipCodes", parseZipCodes(franchiseDetails?.zip_codes));
    }
  }, [editId, franchiseDetails]);

  useEffect(() => {
    if (pinCodeList.length > 0) {
      setPinCodes(pinCodeList);
    }
  }, [pinCodeList]);

  // useEffect(() => {
  //   if (districtZipCodes.length > 0) {
  //     setPinCodes(districtZipCodes);
  //   }
  // }, [districtZipCodes]);

  useEffect(() => {
    if (editId) {
      dispatch(getFranchiseOnId(editId));
    }
  }, [editId]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/franchise/list");
    }
  }, [isSuccess, navigate]);

  const onButtonClick = () => {
    navigate("/franchise/list");
  };

  const resetForm = () => {
    reset();
    setPinCodes([]);
  };

  const handleCheckAll = (event: any) => {
    const { checked } = event.target;
    const checkboxArray = document.querySelectorAll('input[name="zipCodes"]');
    const arr: any = [];
    checkboxArray.forEach((checkbox: any) => {
      checkbox.checked = checked;
      if (checked) {
        arr.push(checkbox.value);
      }
    });
    if (arr.length > 0) clearErrors("zipCodes");
    setValue("zipCodes", arr);
  };

  const validatePinCodes = (values: any) => {
    return values && values.length > 0;
  };

  const handleChange = (event: any) => {};

  const handleDistrictChange = (e: any) => {
    const { value } = e.target;
    console.log("DISTRICT = ", value);
    dispatch(getPinCodeListOnDistrictAction(value));
  };

  const onSubmit = (data: any) => {
    data.zipCodes = JSON.stringify(data.zipCodes);
    if (data.status == 0) {
      if (window.confirm("Franchise status is inactive. All the pin codes associated with it will be removed. Do you want to continue?") === true) {
        if (editId) {
          dispatch(editFranchiseAction(data, editId));
        } else {
          dispatch(addFranchiseAction(data));
        }
      }
    } else {
      if (editId) {
        dispatch(editFranchiseAction(data, editId));
      } else {
        dispatch(addFranchiseAction(data));
      }
    }
  };

  const watchCheckboxValues: any = watch("zipCodes");

  return (
    <>
      <AddForm
        pageHeading={franchise}
        breadCrumb={breadCrumb}
        heading={editId ? "Edit Franchise" : addFranchise}
        buttonText={franchiseListHeading}
        onButtonClick={onButtonClick}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
        districtList={districtList}
        handleDistrictChange={handleDistrictChange}
        pinCodes={pinCodes}
        handleCheckAll={handleCheckAll}
        resetForm={resetForm}
        validatePinCodes={validatePinCodes}
        franchiseDetails={franchiseDetails}
        editid={editId}
      />
    </>
  );
}

export default AddFranchise;
