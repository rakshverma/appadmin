import React from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import { LoginViewProps } from "../../types/Login";
import Input from "../Input";
import Button from "../Button";

function LoginView({ formData, handleChange, handleSubmit, onSubmit, register, errors, isLoading }: LoginViewProps) {
  const logoPath = `${process.env.PUBLIC_URL}/assets/imgs/jhatkabyte-logo.png`;

  return (
    <div className="admin-login-page">
      <div className="admin-login-shell">
        {isLoading && <LoadingIndicator />}
        <section className="admin-login-panel">
          <div className="admin-login-brand">
            <img src={logoPath} alt="JhatkaByte" />
            <span>Admin Console</span>
          </div>
          <h1>Manage orders, products, and delivery from one place.</h1>
          <p>Use this console to add sellable products, assign franchise pricing, update pincode shipping, and track customer orders.</p>
          <div className="admin-login-stats">
            <div>
              <strong>Products</strong>
              <span>Add and price inventory</span>
            </div>
            <div>
              <strong>Orders</strong>
              <span>Track fulfillment</span>
            </div>
            <div>
              <strong>Franchise</strong>
              <span>Map service pincodes</span>
            </div>
          </div>
        </section>

        <section className="admin-login-card">
          <div className="admin-login-card-head">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to JhatkaByte.</p>
          </div>
          <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <Input
                type={"email"}
                name={"email"}
                label={"Email"}
                placeholder={"Enter your email"}
                className={"form-control admin-login-input"}
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

            <div className="mb-3">
              <Input
                type={"password"}
                name={"password"}
                label={"Password"}
                placeholder={"Enter your password"}
                className={"form-control admin-login-input"}
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

            <div className="d-flex justify-content-between align-items-center admin-login-options">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember-check" />
                <label className="form-check-label" htmlFor="remember-check">Remember me</label>
              </div>
              <Link to={"forgot-password"} className="text-muted">
                Forgot password?
              </Link>
            </div>

            <div className="mt-4 d-grid">
              <Button type={"submit"} label={"Log In"} className={"btn-primary btn-block admin-login-button"} />
            </div>

            <p className="admin-login-copy">© {new Date().getFullYear()} JhatkaByte. All rights reserved.</p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default LoginView;
