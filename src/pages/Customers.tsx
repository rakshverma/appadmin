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
  const breadCrumb = [{ to: "customer/list", name: "Customer List" }];

  useEffect(() => {
    dispatch(getCustomerListAction());
  }, [dispatch]);

  const onButtonClick = () => {};

  const onClickDelete = (e: any, id: number) => {
    e.preventDefault();
  };

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
                <div className="row">
                  <div className="col-md-12">
                    <CustomerList customerList={customerList} onClickDelete={onClickDelete} />
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
