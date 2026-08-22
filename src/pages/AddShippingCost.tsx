import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BreadCrumb from "./../components/BreadCrumb";
import ListingCardHeadings from "./../components/ListingCardHeadings";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { getShippingCostOnFranchiseId, updateShippingCostAction } from "./../store/actions/franchiseAction";
import { SET_SHIPPING_LIST_ON_FRANCHISE } from "../store/actionTypes";
const breadCrumb = [
  { to: "franchise/list", name: "Franchise List" },
  { to: "", name: "shipping cost" },
];
type FormData = {
  pinCodes: { pin_code: string; shipping_cost: number }[];
};
function AddShippingCost() {
  const { franchiseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipping_list } = useSelector((state: any) => state.franchise);
  console.log("shipping_list = ", shipping_list);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    register,
  } = useForm<any>();
  const defaultValues = shipping_list;
  useEffect(() => {
    dispatch(getShippingCostOnFranchiseId(franchiseId));
    return () => {
      dispatch({ type: SET_SHIPPING_LIST_ON_FRANCHISE, payload: [] });
    };
  }, [dispatch]);

  const onSubmit = (data: any) => {
    dispatch(updateShippingCostAction(data, franchiseId));
  };
  return (
    <>
      <div className="container-fluid">
        <BreadCrumb pageHeading={"Shipping Cost"} breadCrumb={breadCrumb} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <ListingCardHeadings heading={"Update Shipping Cost"} />
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="row">
                    {shipping_list.map((pin: any, index: any) => (
                      <div key={index} className="col-md-4" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                        <div className="col-md-2" style={{ float: "left" }}>
                          <span>{pin.pin_code}</span>
                        </div>
                        <div className="col-md-4" style={{ float: "right" }}>
                          <input
                            type="hidden"
                            value={pin.pin_code}
                            {...register(`pinCodes[${index}].pin_code`, {
                              required: "pin code is required",
                            })}
                          />
                          <input
                            type="number"
                            defaultValue={pin.shipping_cost}
                            placeholder=""
                            className="form-control w-75"
                            {...register(`pinCodes[${index}].shipping_cost`, {
                              required: "Shipping Cost is required",
                              pattern: {
                                value: /^[0-9]*(\.\d{1,2})?$/,
                                message: "Invalid number format",
                              },
                            })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 30, marginBottom: 30 }}>
                    <Button type={"submit"} label={"Update shipping cost"} className={"btn-dark"} />{" "}
                    {/* <Button type={"button"} label={"Reset"} className={"btn-secondary"} onClick={resetForm} /> */}
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <span style={{ color: "red", fontSize: 13 }}>Shipping cost cannot be empty. Put 0 if no shipping cost for any pincode.</span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddShippingCost;
