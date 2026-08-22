import React from "react";
import Button from "../Button";

function AddressCard({ orderDetails, handleAdminNotesChange, updateOrderAdminNotes }: any) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3 g-3">
          <div className="col-md-3 col-6">
            <p className="fw-bold my-2">Name</p>
            {orderDetails?.name}
          </div>
          <div className="col-md-3 col-6">
            <p className="fw-bold my-2">Contact No</p>
            {orderDetails?.phone_number}
          </div>
          <div className="col-md-3 col-6">
            <p className="fw-bold my-2">Email</p>
            {orderDetails?.email}
          </div>
          <div className="col-md-3 col-6">
            <p className="fw-bold my-2">Payment Method</p>
            Cash on Delivery
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="card mb-0 shadow-none border rounded">
              <div className="card-body d-flex flex-column">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="mb-2">Delivery Address</h5>
                    <div>{orderDetails.shipping_address}</div>
                    <div className="mt-2">
                      <span className="fw-bold">Nearest Landmark -</span> {orderDetails.landmark}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5 className="mb-2">Admin Delivery Notes</h5>
                    <div>
                      <textarea name="admin_notes" rows={3} cols={70} onChange={handleAdminNotesChange}>
                        {orderDetails?.admin_notes}
                      </textarea>
                    </div>
                    <div className="mt-2">
                      <Button type={"button"} label={"Update"} className={"btn-dark"} onClick={updateOrderAdminNotes} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
