import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { constants } from "../utils/constants";
import EditForm from "../components/Profile/EditForm";
import { getDistrictListAction, getPinCodeListOnDistrictAction } from "../store/actions/franchiseAction";
import { getPinCodesOnUserAction, editUserProfileAction, getUserInfo } from "./../store/actions/userAction";
import ChangePassword from "../components/Profile/ChangePassword";
const { profile, editProfile, chnagePassword, dashboard } = constants;

const breadCrumb = [
  { to: "dashboard", name: dashboard },
  { to: "", name: editProfile },
];

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

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, districtZipCodes, isSuccess, isError } = useSelector((state: any) => state.user);
  const { districtList, pinCodeList } = useSelector((state: any) => state.franchise);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<any>();
  //   {
  //   defaultValues: {
  //     name: userInfo.name || "",
  //     phone: userInfo.phone_number || "",
  //     email: userInfo.email || "",
  //     franchiseName: userInfo.franchise_name || "",
  //     status: userInfo.status || 0,
  //     state: userInfo.state || "West Bengal",
  //     district: userInfo.district || "",
  //     zipCodes: userInfo.zip_codes ? JSON.parse(userInfo.zip_codes) : [],
  //   },
  // }
  const [formData, setFormData] = useState({});
  const [pinCodes, setPinCodes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getDistrictListAction());
    // if (userInfo.role_id && (userInfo.role_id === 1 || userInfo.role_id === 2)) {
    //   dispatch(getPinCodesOnUserAction(userInfo.district));
    // }
  }, [dispatch]);

  useEffect(() => {
    console.log("SET VALUE EFFECT CALLED");
    setValue("name", userInfo.name);
    setValue("phone", userInfo.phone_number);
    setValue("email", userInfo.email);
    setValue("franchiseName", userInfo.franchise_name);
    setValue("status", userInfo.status);
    setValue("state", userInfo.state || "West Bengal");
    setValue("district", userInfo.district);
    setValue("zipCodes", parseZipCodes(userInfo.zip_codes));
    if (userInfo?.role_id === 1 || userInfo?.role_id === 2) {
      dispatch(getPinCodesOnUserAction(userInfo.district));
    }
  }, [dispatch, userInfo, setValue]);

  useEffect(() => {
    if (districtZipCodes.length > 0) {
      setPinCodes(districtZipCodes);
    }
  }, [districtZipCodes]);

  useEffect(() => {
    if (pinCodeList.length > 0) {
      setPinCodes(pinCodeList);
    }
  }, [pinCodeList]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getUserInfo());
      setIsEdit(false);
    }
  }, [isSuccess]);

  const onButtonClick = () => {
    setIsEdit(true);
  };

  const resetForm = () => {
    reset();
    setPinCodes([]);
  };

  const handleCheckAll = (event: any) => {
    const { checked } = event.target;
    const checkboxArray = document.querySelectorAll('input[name="zipCodes"]');
    console.log("checkboxArray = ", checkboxArray);
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
    console.log("valuesvalues = ", values);
    return values && values.length > 0;
  };

  const handleChange = (event: any) => {
    console.log("event = ", event);
    // console.log("event.target.name = ", event.target.value);
    // setFormData({
    //   ...formData,
    //   [event.target.name]: event.target.value,
    // });
  };

  const handleDistrictChange = (e: any) => {
    const { value } = e.target;
    console.log("DISTRICT = ", value);
    console.log("userInfo?.district = ", value == userInfo?.district);
    dispatch(getPinCodeListOnDistrictAction(value));
    if (value === userInfo?.district) {
      const checkboxArray = document.querySelectorAll('input[name="zipCodes"]');
      const arr: any = [];
      const codes = parseZipCodes(userInfo.zip_codes);
      console.log("codescodes = ", codes);
      checkboxArray.forEach((checkbox: any) => {
        console.log("CHECKBOX = ", checkbox.value);
        if (codes.includes(checkbox.value)) {
          console.log("CHECKEDDDDDD");
          checkbox.checked = true;
          arr.push(checkbox.value);
        }
      });
      if (arr.length > 0) clearErrors("zipCodes");
      console.log("arrarr = ", arr);
      setValue("zipCodes", arr);
    } else {
      setValue("zipCodes", parseZipCodes(userInfo.zip_codes));
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    data.zipCodes = JSON.stringify(data.zipCodes);
    dispatch(editUserProfileAction(data));
  };

  const onChangePasswordClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal = called");
    setIsOpen(false);
  };

  const onClickUpdateShippingCost = () => {
    navigate(`/franchise/shipping-cost/${userInfo.id}`);
  };

  const watchCheckboxValues: any = watch("zipCodes");
  console.log("watchCheckboxValues = ", watchCheckboxValues);

  // const allChecked = watchCheckboxValues.every((value: any) => value === true);
  // console.log("allChecked = ", allChecked);

  return (
    <>
      <EditForm
        pageHeading={profile}
        breadCrumb={breadCrumb}
        buttonText={editProfile}
        changePassword={chnagePassword}
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
        isEdit={isEdit}
        onChangePasswordClick={onChangePasswordClick}
        userInfo={userInfo}
        onClickUpdateShippingCost={onClickUpdateShippingCost}
      />
      {isOpen && <ChangePassword isOpen={isOpen} closeModal={closeModal} />}
    </>
  );
}

export default UserProfile;
