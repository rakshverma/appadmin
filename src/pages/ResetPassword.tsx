import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassFormData } from "../types/Login";
import ResetPasswordView from "../components/ResetPassword";
import { resetPassowrdAction, validateResetTokenAction } from "../store/actions/loginAction";

function ResetPassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassFormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { isLoading, isSuccess, isError } = useSelector((state: any) => state.forgotPass);
  console.log("isSuccess = ", isSuccess);
  const [formData, setFormData] = useState<ResetPassFormData>({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = searchParams.get("recoveryToken");
    if (token) {
      dispatch(validateResetTokenAction("token"));
    }
  }, [dispatch, searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (data: ResetPassFormData) => {
    console.log(data);
    dispatch(resetPassowrdAction(data));
  };
  console.log("isError = ", isError);
  return (
    <>
      <ResetPasswordView
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        watch={watch}
        errors={errors}
        isLoading={isLoading}
      />
    </>
  );
}

export default ResetPassword;
