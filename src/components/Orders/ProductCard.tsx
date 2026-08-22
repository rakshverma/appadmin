import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertDateToLocal } from "../../utils/common";
import { DELIVERY_STATUS } from "../../utils/constants";

function ProductCard({
  orderDetails,
  updateOrderDeliveryStatus,
  ordersDeleveryBoyList,
  updateDeliveryBoyOnOrder,
  cancelItemOnOrderId,
  updateorderDeliveryDate,
  orderDeliveryDates,
}: any) {
  if (Object.keys(orderDetails).length > 0) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <span>
              Order No : {orderDetails.ref_no}
              <br /> {convertDateToLocal(orderDetails.inserted_at)}
            </span>
          </div>
          <div className="table-responsive">
            <table className="align-middle mb-0 table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Item Name</th>
                  <th>Delivery Date</th>
                  <th>Delivery Status</th>
                  <th>Quantity</th>
                  <th>Assign Delivery Boy</th>
                  <th className="text-end">Price(₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.itemList.map((item: any, i: number) => {
                  return (
                    <tr key={`pro_card_${i}`}>
                      <td>{item.name}</td>
                      {/* <td>{item.delivery_date}</td> */}
                      <td>
                        <EnabledDatePicker
                          deliveryDay={item.delevery_days}
                          productId={item.product_id}
                          defaultDeliveryDate={item.delivery_date}
                          onDateChange={(date: any) => {
                            updateorderDeliveryDate(item.id, date);
                          }}
                          key={`picker_${item.productId}`}
                        />
                      </td>
                      <td>
                        <div className="form-group mb-0">
                          <select className="form-select" defaultValue={item.delivery_status} onChange={(e) => updateOrderDeliveryStatus(e, item.id)}>
                            {item.delivery_status == 4 ? (
                              <option value={4} selected={4 === item.delivery_status ? true : false} disabled={true}>
                                {DELIVERY_STATUS[item.delivery_status - 1]}
                              </option>
                            ) : (
                              DELIVERY_STATUS.map((d: any, i: any) => {
                                if (i != 3) {
                                  return (
                                    <option key={`opt_k_${i}`} value={i + 1} selected={i + 1 === item.delivery_status ? true : false}>
                                      {d}
                                    </option>
                                  );
                                } else return null;
                              })
                            )}
                          </select>
                        </div>
                      </td>
                      <td>
                        {item.quantity}
                        {item.unit} x {item.count}
                      </td>
                      <td>
                        {ordersDeleveryBoyList?.length ? (
                          <select
                            className="form-select"
                            value={item.delivery_boy_id}
                            onChange={(e) => updateDeliveryBoyOnOrder(e, item.order_id, item.id)}
                            disabled={item.delivery_status == 4 ? true : false}
                          >
                            <option value="">Select Delivery Boy</option>
                            {ordersDeleveryBoyList.map((d: any, i: any) => {
                              return (
                                <option key={`deli-${i}`} value={d.id} selected={d.id === item.delivery_boy_id ? true : false}>
                                  {d.name} (Assigned - {d.count})
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <select className="form-select">
                            <option value="">Select Delivery Boy</option>
                          </select>
                        )}
                      </td>
                      <td className="text-end">{item.delivery_status != 4 ? (Number(item.price) * Number(item.count)).toFixed(2) : 0}</td>
                      <td>
                        {" "}
                        {item.delivery_status != 4 && (
                          <button
                            className="btn btn-danger btn-sm"
                            title={"Cancel Item"}
                            onClick={() => cancelItemOnOrderId(orderDetails.id, item.id)}
                          >
                            <i className="fas fa-times-circle"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6} className="text-end fw-bold">
                    <span className="me-3">Sub Total :</span> {(orderDetails.total_price - orderDetails.shipping_cost).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="text-end fw-bold">
                    <span className="me-3">Shipping Cost :</span>{" "}
                    {orderDetails.shipping_cost > 0 ? orderDetails.shipping_cost.toFixed(2) : orderDetails.shipping_cost}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="text-end fw-bold">
                    <span className="me-3">Total :</span> {orderDetails.total_price.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function EnabledDatePicker({ deliveryDay, productId, onDateChange, defaultDeliveryDate }: any) {
  console.log("defaultDeliveryDate = ", defaultDeliveryDate);
  const filterDates = (date: any, deliveryDay: any) => {
    // Disable dates that are not Monday, Wednesday, or Friday
    const day = date.toLocaleString("en-US", { weekday: "long" });
    return deliveryDay.includes(day);
  };
  const parseDeliveryDay = (deliveryDay: any) => {
    try {
      return JSON.parse(deliveryDay);
    } catch (error) {
      return [];
    }
  };
  const daysToEnable = parseDeliveryDay(deliveryDay);
  const [firstEnabledDate, setFirstEnabledDate] = useState<any>(null);
  let today = new Date();
  let minDate = today.setDate(today.getDate() + 1);
  useEffect(() => {
    let currentDate = new Date(today);
    while (!filterDates(currentDate, daysToEnable) && daysToEnable.length) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // onDateChange(currentDate);
    // setFirstEnabledDate(currentDate);
    onDateChange("");
    setFirstEnabledDate(defaultDeliveryDate ? parseDateString(defaultDeliveryDate) : null);
  }, [deliveryDay]);

  return (
    <DatePicker
      selected={firstEnabledDate}
      onChange={(date: any) => {
        onDateChange(date);
        setFirstEnabledDate(date);
      }}
      filterDate={(date: any) => filterDates(date, daysToEnable)}
      minDate={new Date(minDate)}
      dateFormat="dd/MM/yyyy"
      customInput={
        <input
          type="text"
          id={productId}
          defaultValue={firstEnabledDate}
          name="deliveryDay"
          className="form-control"
          placeholder="Day of Week for delivery"
          readOnly={true}
        />
      }
    />
  );
}

function parseDateString(value: any) {
  const [day, month, year] = value.split("/");
  return new Date(year, month - 1, day); // month - 1 because months are 0-indexed in JavaScript
}

export default ProductCard;
