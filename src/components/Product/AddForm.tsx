import React, { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";
import ListingCardHeadings from "../ListingCardHeadings";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Textarea from "../Textarea";
import { uploadUrl } from "../../utils/axios";

const validateFiles = (files: any) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const isValidFileType = file.type.split("/")[0] === "image";

    if (!isValidFileType) {
      return false;
    }
  }

  return true;
};

function AddForm({
  pageHeading,
  breadCrumb,
  heading,
  buttonText,
  onButtonClick,
  formData,
  categoryList,
  handleChange,
  handleSubmit,
  onSubmit,
  register,
  errors,
  reset,
  imagePreviews,
  openCategoryModal,
  productId,
  editInfo,
  retainedImages,
  onRemoveImage,
}: any) {
  const resetForm = () => {
    reset();
  };
  console.log("imagePreviews = ", imagePreviews);
  return (
    <>
      <div className="container-fluid">
        <BreadCrumb pageHeading={pageHeading} breadCrumb={breadCrumb} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body admin-form-card">
                <ListingCardHeadings
                  heading={heading}
                  button={{
                    type: "button",
                    text: buttonText,
                  }}
                  onClick={onButtonClick}
                />
                <div className="admin-form-intro">
                  <div>
                    <span className="admin-kicker">Inventory</span>
                    <h5>{productId ? "Edit product details" : "Create a sellable product"}</h5>
                    <p>After saving the product, open Set Product Price to assign pricing, availability, and delivery days.</p>
                  </div>
                  <span className="admin-step-pill">Step 1 of 2</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" noValidate>
                  <div className="row admin-form-grid">
                    <div className="col-lg-7">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <Input
                              type={"text"}
                              name={"name"}
                              label={"Product Name"}
                              placeholder={""}
                              className={"form-control"}
                              register={register}
                              validationObj={{
                                required: "Please enter product name",
                                minLength: {
                                  value: 3,
                                  message: "product name must be at least 3 characters.",
                                },
                              }}
                              error={errors?.name || null}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <Link to="" onClick={openCategoryModal} className="admin-inline-action">
                              <i className="fa fa-plus me-1"></i>
                              New Category
                            </Link>
                            <Select
                              label={"Category"}
                              name={"category"}
                              className="form-select"
                              register={register}
                              validationObj={{
                                required: "Please select product category",
                              }}
                              options={categoryList}
                              error={errors?.category || null}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <Textarea
                              label={"Product Description"}
                              name={"description"}
                              className={"form-control"}
                              rows={5}
                              register={register}
                              validationObj={{
                                required: "Please enter product description",
                              }}
                              error={errors?.description || null}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="form-group admin-upload-box">
                        <Input
                          type={"file"}
                          name={"images"}
                          label={"Product Pictures"}
                          placeholder={""}
                          className={"form-control"}
                          onChange={handleChange}
                          register={register}
                          validationObj={{
                            required: !productId ? "Please select product image" : false,
                            validate: {
                              validateFiles: (files: any) => validateFiles(files) || "Only image files are allowed",
                            },
                          }}
                          error={errors?.images || null}
                          multiple={true}
                        />
                        <small>Upload up to 5 clear product images. The first image appears in listings.</small>
                      </div>
                      <div className="admin-image-preview">
                        {imagePreviews?.length > 0
                          ? imagePreviews?.map((item: any, i: number) => {
                              return (
                                <div className="admin-image-thumb" key={`pi_${i}`}>
                                  <img src={item} alt="" />
                                </div>
                              );
                            })
                          : productId && retainedImages?.length > 0
                          ? retainedImages?.map((item: any, k: number) => {
                              return (
                                <div className="admin-image-thumb" key={`pei_${k}`} style={{ position: "relative" }}>
                                  <img src={`${uploadUrl}${item}`} crossOrigin="anonymous" alt="" />
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    style={{ position: "absolute", top: 4, right: 4, padding: "1px 6px" }}
                                    title="Remove image"
                                    onClick={() => onRemoveImage(item)}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="admin-form-actions">
                    <Button
                      type={"submit"}
                      label={productId ? "Save Product" : "Add Product"}
                      className={"btn-primary"}
                      disabled={productId && editInfo.length === 0 ? true : false}
                    />{" "}
                    <Button type={"button"} label={"Clear"} className={"btn-light"} onClick={resetForm} />
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
