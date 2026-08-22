import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginFormData } from "../types/Login";
import LoginView from "../components/Login";
import { loginAction } from "../store/actions/loginAction";
import useAuth from "../hooks/useAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();
  console.log("isAuth = ", isAuthenticated);

  const { isSuccess, isError } = useSelector((state: any) => state.login);
  const { isLoading } = useSelector((state: any) => state.loader);
  console.log("isSuccess = ", isSuccess);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
    if (isAuthenticated) navigate("/dashboard");
  }, [navigate, isSuccess, isAuthenticated]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    dispatch(loginAction(data));
  };
  console.log("isError = ", isError);
  return (
    <>
      <LoginView
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

export default Login;
