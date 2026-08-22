import React, { Fragment } from "react";
import BreadCrumb from "../BreadCrumb";
import ListingCardHeadings from "../ListingCardHeadings";
import { EditPriceProps } from "../../types";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";

function PriceForm({
  pageHeading,
  breadCrumb,
  heading,
  buttonText,
  onButtonClick,
  formData,
  editInfo,
  franchiseInfo,
  handleChange,
  handleSubmit,
  onSubmit,
  register,
  errors,
  reset,
  fields,
  handleAddRow,
  handleRemoveRow,
}: EditPriceProps) {
  const resetForm = () => {
    reset();
  };

  const validateUnit = (value: string) => {
    return value === "kg" || value === "gm" || value === " piece(s)" || "Please select a valid unit";
  };

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
                    <span className="admin-kicker">Pricing</span>
                    <h5>Set franchise price and availability</h5>
                    <p>Customers only see products that are in stock and mapped to their selected pincode/franchise.</p>
                  </div>
                  <span className="admin-step-pill">Step 2 of 2</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <Input
                          type={"text"}
                          name={"name"}
                          label={"Product Name"}
                          placeholder={""}
                          className={"form-control"}
                          onChange={handleChange}
                          register={register}
                          readOnly={true}
                          validationObj={{
                            required: "Please enter product name",
                          }}
                          error={errors?.name || null}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <Input
                          type={"text"}
                          name={"franchise"}
                          label={"Franchise Name"}
                          placeholder={""}
                          className={"form-control"}
                          onChange={handleChange}
                          register={register}
                          readOnly={true}
                          validationObj={{
                            required: "Please enter franchise name",
                          }}
                          error={errors?.franchise || null}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <Input
                          type={"text"}
                          name={"pinCodes"}
                          label={"Selling Pincodes"}
                          placeholder={"Example: 110001, 110002"}
                          className={"form-control"}
                          onChange={handleChange}
                          register={register}
                          validationObj={{
                            required: "Please enter at least one pincode",
                            validate: (value: string) => {
                              const pins = `${value || ""}`.split(/[\s,]+/).map((pin) => pin.trim()).filter(Boolean);
                              return pins.length > 0 && pins.every((pin) => /^[1-9][0-9]{5}$/.test(pin)) ? true : "Enter valid 6 digit pincodes separated by commas";
                            },
                          }}
                          error={errors?.pinCodes || null}
                        />
                        <small className="text-muted">These pincodes will be added to the selected franchise and used by the customer storefront.</small>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <Select
                          label={"Availability Base on Franchise"}
                          name={"is_available"}
                          className="form-select"
                          register={register}
                          validationObj={{
                            required: "Please select product availability",
                          }}
                          options={[
                            { id: 1, name: "In Stock" },
                            { id: 0, name: "Out Of Stock" },
                          ]}
                          error={errors?.is_available || null}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <Select
                          label={"Days of Delivery"}
                          name={"delevery_days"}
                          className="form-select"
                          register={register}
                          validationObj={{
                            required: "Please select days of delevery",
                          }}
                          options={[
                            { id: "Sunday", name: "Sunday" },
                            { id: "Monday", name: "Monday" },
                            { id: "Tuesday", name: "Tuesday" },
                            { id: "Wednesday", name: "Wednesday" },
                            { id: "Thursday", name: "Thursday" },
                            { id: "Friday", name: "Friday" },
                            { id: "Saturday", name: "Saturday" },
                          ]}
                          error={errors?.delevery_days || null}
                          multiple={true}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="admin-price-header">
                        <h6>Quantity based pricing</h6>
                        <button type="button" className="btn btn-light btn-sm" onClick={handleAddRow}>
                          <i className="fas fa-plus-circle me-1"></i>
                          Add row
                        </button>
                      </div>
                    </div>
                    {fields.map((field: any, index: number) => (
                      <Fragment key={field.id}>
                        <div className="col-lg-5 col-md-6">
                          <div className="form-group">
                            <label>Quantity</label>
                            <div className="d-flex">
                              <input
                                type="number"
                                className="form-control w-75"
                                {...register(`quantity_wise_price.${index}.quantity`, {
                                  required: "add quantity",
                                  pattern: /^[0-9]+(\.[0-9]+)?$/,
                                })}
                              />
                              <select
                                className="form-select w-25"
                                {...register(`quantity_wise_price.${index}.unit`, {
                                  required: "select unit",
                                  validate: validateUnit,
                                })}
                              >
                                <option value="kg">kg</option>
                                <option value="gm">gm</option>
                                <option value=" piece(s)">piece(s)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                          <div className="form-group">
                            <label>Price (₹)</label>
                            <input
                              type="number"
                              className="form-control"
                              {...register(`quantity_wise_price.${index}.price`, {
                                required: "add price",
                                pattern: /^[0-9]+(\.[0-9]+)?$/,
                              })}
                            />
                          </div>
                        </div>
                        {/* <div className="col-md-2">
                          <div className="form-group">
                            <label>Shipping Cost (₹)</label>
                            <input
                              type="number"
                              className="form-control"
                              {...register(`quantity_wise_price.${index}.shipping`, {
                                required: "add shipping cost",
                                pattern: /^[0-9]+(\.[0-9]+)?$/,
                              })}
                            />
                          </div>
                        </div> */}
                        <div className="col-lg-2 col-md-2 my-auto">
                          {index !== 0 && (
                            <button type="button" className="btn btn-outline-danger mt-2" onClick={() => handleRemoveRow(index)} aria-label="Remove row">
                              <i className="fas fa-minus-circle me-1"></i>
                              Remove
                            </button>
                          )}
                        </div>
                        {errors?.quantity_wise_price && errors?.quantity_wise_price[index]?.quantity ? (
                          <div style={{ color: "red" }}>Enter all valid details for price</div>
                        ) : null}
                        <div className="w-100"></div>
                      </Fragment>
                    ))}
                  </div>
                  <div className="admin-form-actions">
                    <Button type={"submit"} label={"Save Price & Availability"} className={"btn-primary"} />{" "}
                    <Button type={"button"} label={"Reset"} className={"btn-light"} onClick={resetForm} />
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

export default PriceForm;
