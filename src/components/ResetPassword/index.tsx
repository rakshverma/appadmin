import React from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import { ResetPassViewProps } from "../../types/Login";
import Input from "../Input";
import Button from "../Button";

function ResetPasswordView({
  formData,
  handleChange,
  handleSubmit,
  onSubmit,
  register,
  watch,
  errors,
  isLoading,
}: ResetPassViewProps) {
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
                      <h5 className="text-dark">Reset Password !</h5>
                      <p className="mb-0">
                        We will reset your password and send confirmation in
                        email.
                      </p>
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
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className="mb-3">
                      <Input
                        type={"password"}
                        name={"password"}
                        label={"Password"}
                        placeholder={"Enter your password"}
                        className={"form-input"}
                        onChange={handleChange}
                        register={register}
                        validationObj={{
                          required: "Please enter your password",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters.",
                          },
                        }}
                        error={errors?.password || null}
                      />
                    </div>

                    <div className="mb-3">
                      <Input
                        type={"password"}
                        name={"confirmPassword"}
                        label={"Confirm Password"}
                        placeholder={"Confirm your password"}
                        className={"form-input"}
                        onChange={handleChange}
                        register={register}
                        validationObj={{
                          required: "Please enter your password",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters.",
                          },
                          validate: (val: string) => {
                            if (watch("password") !== val) {
                              return "Password and confirm password do not match.";
                            }
                          },
                        }}
                        error={errors?.confirmPassword || null}
                      />
                    </div>

                    <div className="mt-3 d-grid">
                      <Button
                        type={"submit"}
                        label={"Submit"}
                        className={"btn-primary btn-block"}
                      />
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
                <p>
                  © {new Date().getFullYear()} JhatkaByte. all rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordView;
