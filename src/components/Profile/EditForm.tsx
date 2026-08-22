import React, { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";
import ListingCardHeadings from "../ListingCardHeadings";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Textarea from "../Textarea";
import ProfileView from "./ProfileView";

function EditForm({
  pageHeading,
  breadCrumb,
  buttonText,
  changePassword,
  onButtonClick,
  formData,
  handleChange,
  handleSubmit,
  onSubmit,
  register,
  errors,
  reset,
  districtList,
  handleDistrictChange,
  pinCodes,
  handleCheckAll,
  resetForm,
  validatePinCodes,
  isEdit,
  onChangePasswordClick,
  userInfo,
  onClickUpdateShippingCost,
}: any) {
  const districts = districtList.length
    ? districtList.map((item: any) => {
        return { id: item.district, name: item.district };
      })
    : [];
  console.log("errors_franchise = ", errors);

  return (
    <>
      <div className="container-fluid">
        <BreadCrumb pageHeading={pageHeading} breadCrumb={breadCrumb} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <ListingCardHeadings
                  heading={""}
                  button={{
                    type: "button",
                    text: buttonText,
                  }}
                  onClick={onButtonClick}
                  changePassword={{
                    type: "button",
                    text: changePassword,
                    onClick: onChangePasswordClick,
                  }}
                  updateShippingCost={
                    userInfo.role_id === 1 || userInfo.role_id === 2
                      ? {
                          type: "button",
                          text: "Update Shipping Cost",
                          onClick: onClickUpdateShippingCost,
                        }
                      : undefined
                  }
                />

                {isEdit ? (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <Input
                            type={"text"}
                            name={"name"}
                            label={"Person Name"}
                            placeholder={""}
                            className={"form-control"}
                            register={register}
                            validationObj={{
                              required: "Please enter person name",
                              minLength: {
                                value: 3,
                                message: "Person name must be at least 3 characters.",
                              },
                            }}
                            error={errors?.name || null}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <Input
                            type={"text"}
                            name={"phone"}
                            label={"Phone"}
                            placeholder={""}
                            className={"form-control"}
                            register={register}
                            validationObj={{
                              required: "Please enter phone number",
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid phone number",
                              },
                            }}
                            error={errors?.phone || null}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <Input
                            type={"text"}
                            name={"email"}
                            label={"Email"}
                            placeholder={""}
                            className={"form-control"}
                            register={register}
                            validationObj={{
                              required: "Please enter email id",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            }}
                            error={errors?.email || null}
                          />
                        </div>
                      </div>
                      {userInfo?.role_id === 2 && (
                        <div className="col-md-4">
                          <div className="form-group">
                            <Input
                              type={"text"}
                              name={"franchiseName"}
                              label={"Franchise Name"}
                              placeholder={""}
                              className={"form-control"}
                              register={register}
                              validationObj={{
                                required: "Please enter Franchise name",
                                minLength: {
                                  value: 3,
                                  message: "Franchise name must be at least 3 characters.",
                                },
                              }}
                              error={errors?.franchiseName || null}
                            />
                          </div>
                        </div>
                      )}
                      <div className="col-md-4">
                        <div className="form-group">
                          <Select
                            label={"Status"}
                            name={"status"}
                            className="form-select"
                            register={register}
                            validationObj={{
                              required: "Please select status",
                            }}
                            options={[
                              { id: 1, name: "Active" },
                              { id: 0, name: "Inactive" },
                            ]}
                            error={errors?.status || null}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <hr />
                      </div>
                      {(userInfo.role_id === 1 || userInfo.role_id === 2) && (
                        <>
                          <div className="col-md-4">
                            <div className="form-group">
                              <Select
                                label={"State"}
                                name={"state"}
                                className="form-select"
                                register={register}
                                validationObj={{
                                  required: "Please select state",
                                }}
                                options={[{ id: "West Bengal", name: "West Bengal" }]}
                                error={errors?.state || null}
                                selectDisabled={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <Select
                                label={"District"}
                                name={"district"}
                                className="form-select"
                                register={register}
                                validationObj={{
                                  required: "Please select district",
                                }}
                                options={districts}
                                onChange={handleDistrictChange}
                                error={errors?.district || null}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            {pinCodes.length === 0 && (
                              <>
                                <label style={{ marginTop: 10 }}>List Of Available Pin Codes:</label>
                                <div className="border p-3"></div>
                              </>
                            )}
                            {pinCodes.length > 0 && (
                              <>
                                <label style={{ marginTop: 10 }}>List Of Available Pin Codes:</label>
                                <div className="border p-3">
                                  <div className="form-check form-check-inline mb-2">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      {...register("checkAll", {
                                        required: false,
                                        onChange: handleCheckAll,
                                      })}
                                    />
                                    <label className="form-check-label">Select All</label>
                                  </div>
                                  {pinCodes.map((item: any) => {
                                    return (
                                      <div className="form-check form-check-inline mb-2" key={item.pin_code}>
                                        <input
                                          className="form-check-input"
                                          name="zipCodes"
                                          {...register("zipCodes", {
                                            // validate: (value: any) => {
                                            //   const checkedCheckboxes = Object.keys(errors).filter((error) => error.startsWith("zipCodes"));
                                            //   return checkedCheckboxes.length > 0 || value;
                                            // },
                                            validate: validatePinCodes,
                                          })}
                                          type="checkbox"
                                          value={item.pin_code}
                                          defaultChecked={false}
                                        />
                                        <label className="form-check-label">{item.pin_code}</label>
                                      </div>
                                    );
                                  })}
                                  {errors.zipCodes && <p style={{ color: "red" }}>Select at least one pin code</p>}
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <div style={{ marginTop: 30, marginBottom: 30 }}>
                      <Button type={"submit"} label={buttonText} className={"btn-dark"} />{" "}
                      <Button type={"button"} label={"Clear"} className={"btn-secondary"} onClick={resetForm} />
                    </div>
                  </form>
                ) : (
                  <ProfileView userInfo={userInfo} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditForm;
