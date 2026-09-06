import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import { constants } from "./../utils/constants";
import ProductCard from "../components/Orders/ProductCard";
import AddressCard from "../components/Orders/AddressCard";
import InvoiceCard from "../components/Orders/InvoiceCard";
import { useParams } from "react-router-dom";
import {
  getOrderDetailsOnId,
  updateDeliveryStatusOnId,
  getDeliveryBoyOnOrderId,
  updateDeliveryBoyOnOrderId,
  cancelOrderItemAction,
  updateAdminNotesOnOrderId,
  updateDeliveryDateOnOrderId,
} from "../store/actions/orderAction";
import generatePdf from "./../utils/generatePdf";

const formatDate = (date: any) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function OrderDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { reviewList } = useSelector((state: any) => state.productReviews);
  const { orderDetails, ordersDeleveryBoyList } = useSelector((state: any) => state.order);
  const [adminNotes, setAdminNotes] = useState("");
  const [orderDeliveryDates, setOrderDeliveryDates] = useState<any>({});
  const breadCrumb = [
    { to: "order/list", name: "Orders" },
    { to: "", name: "Order Details" },
  ];
  useEffect(() => {
    dispatch(getOrderDetailsOnId(id));
    dispatch(getDeliveryBoyOnOrderId(id));
  }, [id]);

  useEffect(() => {
    if (orderDetails?.id) {
      const obj: any = {};
      orderDetails.itemList.forEach((item: any) => {
        obj[item.id] = item.delivery_date;
      });
      setOrderDeliveryDates((state: any) => ({
        ...state,
        ...obj,
      }));
    }
  }, [orderDetails]);

  const updateOrderDeliveryStatus = (e: any, id: number) => {
    const status = e.target.value;
    dispatch(updateDeliveryStatusOnId(id, status));
  };

  const updateDeliveryBoyOnOrder = (e: any, id: number, detailsId: any) => {
    const boyId = e.target.value;
    dispatch(updateDeliveryBoyOnOrderId(boyId, id, detailsId));
  };

  const generateOrderPdf = () => {
    generatePdf(orderDetails);
  };

  const cancelItemOnOrderId = (orderId: any, itemId: any) => {
    if (window.confirm("Are you sure you want to cancel the item?") == true) {
      const cancelCheckArr = orderDetails.itemList.filter(
        (obj: any) => obj.delivery_status == 1 || obj.delivery_status == 2 || obj.delivery_status == 3
      );
      let mainOrderCancel = false;
      if (cancelCheckArr.length === 0) mainOrderCancel = true;

      dispatch(cancelOrderItemAction(orderId, itemId, mainOrderCancel));
    } else return;
  };

  const handleAdminNotesChange = (e: any) => {
    setAdminNotes(e.target.value);
  };

  const updateOrderAdminNotes = () => {
    dispatch(updateAdminNotesOnOrderId(adminNotes, orderDetails.id));
  };

  const updateorderDeliveryDate = (id: any, value: any) => {
    if (id && value) {
      const formatDt = formatDate(value);
      dispatch(updateDeliveryDateOnOrderId(orderDetails.id, id, formatDt));
      setOrderDeliveryDates((state: any) => ({
        ...state,
        [id]: value ? formatDate(value) : "",
      }));
    }
  };
  return (
    <>
      <div className="container-fluid" style={{ marginBottom: 100 + "px" }}>
        <BreadCrumb pageHeading={"Order Details"} breadCrumb={breadCrumb} />
        <div className="row grid-margin">
          {Object.keys(orderDetails).length > 0 ? (
            <>
              <div className="col-md-12">
                <ProductCard
                  orderDetails={orderDetails}
                  updateOrderDeliveryStatus={updateOrderDeliveryStatus}
                  updateDeliveryBoyOnOrder={updateDeliveryBoyOnOrder}
                  ordersDeleveryBoyList={ordersDeleveryBoyList}
                  cancelItemOnOrderId={cancelItemOnOrderId}
                  updateorderDeliveryDate={updateorderDeliveryDate}
                  orderDeliveryDates={orderDeliveryDates}
                />
                <AddressCard
                  orderDetails={orderDetails}
                  handleAdminNotesChange={handleAdminNotesChange}
                  updateOrderAdminNotes={updateOrderAdminNotes}
                />
              </div>
              <div className="col-md-4">
                <InvoiceCard orderDetails={orderDetails} generateOrderPdf={generateOrderPdf} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
