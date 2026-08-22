import React from "react";

function InvoiceCard({ orderDetails, generateOrderPdf }: any) {
  return (
    <div className="card d-flex">
      <div className="card-body p-3">
        <h5 className="font-weight-normal mb-3">Invoice Details</h5>
        <div className="row justify-content-center mb-3">
          <div className="col-5">Sub Total :</div>
          <div className="col-7 text-end">₹ {orderDetails.total_price.toFixed(2) - orderDetails.shipping_cost}</div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col-5">Shipping :</div>
          <div className="col-7 text-end">₹ {orderDetails.shipping_cost.toFixed(2)}</div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <b>Total :</b>
          </div>
          <div className="col-7 text-end">
            <b>₹ {orderDetails.total_price.toFixed(2)}</b>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-outline-danger" onClick={generateOrderPdf}>
            Download Invoice PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCard;
