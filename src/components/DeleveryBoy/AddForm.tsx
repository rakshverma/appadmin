import React, { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";
import ListingCardHeadings from "../ListingCardHeadings";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Textarea from "../Textarea";

function AddForm({
  pageHeading,
  breadCrumb,
  heading,
  buttonText,
  onButtonClick,
  formData,
  handleChange,
  handleSubmit,
  onSubmit,
  register,
  errors,
  reset,
  districtList,
  franchiseListOnRole,
  userInfo,
  editId,
  deliveryBoyDetails,
}: any) {
  console.log("franchiseListOnRole = ", franchiseListOnRole);
  const districts = districtList.length
    ? districtList.map((item: any) => {
        return { id: item.district, name: item.district };
      })
    : [];
  const franchiseList = franchiseListOnRole.length
    ? franchiseListOnRole.map((item: any) => {
        return { id: item.id, name: item.role_id === 1 ? `${item.name} ( Admin )` : item.franchise_name };
      })
    : [];
  const resetForm = () => {
    reset();
  };
  return (
    <>
      <div className="container-fluid">
        <BreadCrumb pageHeading={pageHeading} breadCrumb={breadCrumb} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <ListingCardHeadings
                  heading={heading}
                  button={{
                    type: "button",
                    text: buttonText,
                  }}
                  onClick={onButtonClick}
                />
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
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <Input
                          type={"email"}
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
                    <div className="col-md-4">
                      <div className="form-group">
                        <Select
                          label={"Franchise Name"}
                          name={"franchiseId"}
                          className="form-select"
                          register={register}
                          validationObj={{
                            required: "Please select franchise name",
                          }}
                          options={franchiseList}
                          selectDisabled={franchiseList.length === 1 ? true : false}
                          error={errors?.franchiseId || null}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <Select
                          label={"Delivery Boy Status"}
                          name={"status"}
                          className="form-select"
                          register={register}
                          validationObj={{
                            required: "Please select status of delivery boy",
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
                        {userInfo.role_id === 1 ? (
                          <Select
                            label={"District"}
                            name={"district"}
                            className="form-select"
                            register={register}
                            validationObj={{
                              required: "Please select district",
                            }}
                            options={districts}
                            error={errors?.district || null}
                          />
                        ) : (
                          <Input
                            type={"text"}
                            name={"district"}
                            label={"District"}
                            placeholder={""}
                            className={"form-control"}
                            register={register}
                            validationObj={{
                              required: "Please select district",
                            }}
                            error={errors?.district || null}
                            readOnly={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 30, marginBottom: 30 }}>
                    <Button type={"submit"} label={heading} className={"btn-dark"} />{" "}
                    <Button type={"button"} label={"Clear"} className={"btn-secondary"} onClick={resetForm} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddForm;
