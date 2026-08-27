import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import { constants } from "./../utils/constants";
import ListingCardHeadings from "../components/ListingCardHeadings";
import { getCustomerListAction } from "./../store/actions/customerAction";
import CustomerList from "../components/Customers/CustomerList";

const { customerListHeading, customerHeading, downloadCsv } = constants;
function Customers() {
  const dispatch = useDispatch();
  const { customerList } = useSelector((state: any) => state.customer);
  const [mobileSearch, setMobileSearch] = useState("");
  const [pincodeSearch, setPincodeSearch] = useState("");
  const breadCrumb = [{ to: "customer/list", name: "Customer List" }];

  useEffect(() => {
    dispatch(getCustomerListAction());
  }, [dispatch]);

  const onButtonClick = () => {};

  const onClickDelete = (e: any, id: number) => {
    e.preventDefault();
  };

  const filteredCustomerList = customerList.filter((customer: any) => {
    const phone = `${customer.phone_number || ""}`;
    const pincode = `${customer.pin_code || ""}`;
    const mobileMatch = !mobileSearch.trim() || phone.includes(mobileSearch.trim());
    const pincodeMatch = !pincodeSearch.trim() || pincode.includes(pincodeSearch.trim());
    return mobileMatch && pincodeMatch;
  });

  return (
    <>
      <div className="container-fluid" style={{ marginBottom: 100 + "px" }}>
        <BreadCrumb pageHeading={customerHeading} breadCrumb={breadCrumb} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <ListingCardHeadings
                  heading={customerListHeading}
                  button={{
                    type: "button",
                    text: downloadCsv,
                  }}
                  onClick={onButtonClick}
                />
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Search by mobile number</label>
                    <input
                      type="search"
                      className="form-control"
                      value={mobileSearch}
                      onChange={(e) => setMobileSearch(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Search by pincode</label>
                    <input
                      type="search"
                      className="form-control"
                      value={pincodeSearch}
                      onChange={(e) => setPincodeSearch(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <CustomerList customerList={filteredCustomerList} onClickDelete={onClickDelete} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
