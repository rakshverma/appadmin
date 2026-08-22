import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassFormData } from "../types/Login";
import ForgotPasswordView from "../components/ForgotPassword";
import { forgotPassowrdAction } from "../store/actions/loginAction";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassFormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useSelector((state: any) => state.login);
  console.log("isSuccess = ", isSuccess);
  const [formData, setFormData] = useState<ForgotPassFormData>({
    email: "",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [navigate, isSuccess]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (data: ForgotPassFormData) => {
    console.log(data);
    dispatch(forgotPassowrdAction(data));
  };
  console.log("isError = ", isError);
  return (
    <>
      <ForgotPasswordView
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isLoading={isLoading}
      />
    </>
  );
}

export default ForgotPassword;
