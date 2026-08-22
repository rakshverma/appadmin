import React from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import { ForgotPassViewProps } from "../../types/Login";
import Input from "./../Input";
import Button from "../Button";

function ForgotPasswordView({ formData, handleChange, handleSubmit, onSubmit, register, errors, isLoading }: ForgotPassViewProps) {
  return (
    <div className="account-pages mt-5">
      <div className="container">
        {isLoading && <LoadingIndicator />}
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-white">
                <div className="row">
                  <div className="col-7 my-auto">
                    <div className="text-primary p-4">
                      <h5 className="text-dark">Forgot Password !</h5>
                      <p className="mb-0">We will send temporary password in your mail id. After login change it from profile section </p>
                    </div>
                  </div>
                  <div className="col-5 align-self-end">
                    {/* <img
                      src="assets/imgs/jhatkabyte-logo.png"
                      alt=""
                      className="img-fluid p-3"
                    /> */}
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-2">
                  <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                      <Input
                        type={"email"}
                        name={"email"}
                        label={"Email"}
                        placeholder={"Enter your email"}
                        className={"form-control"}
                        onChange={handleChange}
                        register={register}
                        validationObj={{
                          required: "Please enter email id",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Enter valid email id",
                          },
                        }}
                        error={errors?.email || null}
                      />
                    </div>

                    <div className="mt-3 d-grid">
                      <Button type={"submit"} label={"Submit"} className={"btn-primary btn-block"} />
                    </div>

                    <div className="mt-4 text-center">
                      <Link to={"/"} className="text-muted">
                        <i className="mdi mdi-lock me-1"></i>
                        Back to login.
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div>
                <p>© {new Date().getFullYear()} JhatkaByte. all rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordView;
