import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "../Table";
import { ORDER_STATUS, ORDER_STATUS_BADGE_CLASS } from "../../utils/constants";
import { convertDateToLocal } from "../../utils/common";
import { DELIVERY_STATUS } from "../../utils/constants";
import { uploadUrl } from "../../utils/axios";

const getReceiptUrl = (receiptUrl: string) => {
  if (!receiptUrl) return "";
  return `${uploadUrl}${receiptUrl.replace(/^\/?uploads\/?/, "")}`;
};

const OrderCheckbox = ({ id, selectedOrders, onSelect }: any) => {
  const handleCheckboxChange = () => {
    console.log("hellll = ", selectedOrders.includes(id));
    onSelect(id);
  };

  return <input type="checkbox" checked={selectedOrders.includes(id)} onChange={handleCheckboxChange} />;
};

function OrderTable({
  orderList,
  orderStatus,
  onCheckOrderCheckbox,
  radioRef,
  handleOrderDelete,
  generateOrderPdf,
  franchiseList,
  filterOrderByFranchise,
  selectedOrders,
  handleCheckboxSelect,
  handleSelectAllOrders,
  handleThermalPrint,
}: any) {
  const allVisibleSelected = orderList.length > 0 && orderList.every((order: any) => selectedOrders.includes(order.id));
  const columns = useMemo(
    () => [
      {
        Header: () =>
          handleCheckboxSelect ? (
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={() => handleSelectAllOrders(orderList.map((order: any) => order.id))}
              title="Select all visible orders"
            />
          ) : null,
        accessor: "checkbox",
        Cell: (props: any): any => {
          return handleCheckboxSelect ? (
            <OrderCheckbox id={props.row.original.id} selectedOrders={selectedOrders} onSelect={handleCheckboxSelect} />
          ) : null;
        },
      },
      {
        Header: "Order ID",
        accessor: "ref_no",
      },
      {
        Header: "Customer",
        accessor: "name",
        Cell: (props: any): any => {
          return (
            <>
              {props.value}
              <br />
              {props.row.original.phone_number}
              <br />
              {props.row.original.shipping_address}
            </>
          );
        },
      },
      {
        Header: "Franchise",
        accessor: "franchise_name",
      },
      {
        Header: "Order Date",
        accessor: "inserted_at",
        Cell: (props: any): any => {
          return <div style={{ width: 80 }}>{convertDateToLocal(props.row.original.inserted_at)}</div>;
        },
      },
      {
        Header: "Items",
        accessor: "product_names",
        Cell: (props: any): any => {
          const names = props.value.split(",");
          const quantity = props.row.original.quantity.split(",");
          const units = props.row.original.units.split(",");
          return names.map((item: any, i: number) => {
            return (
              <div style={{ width: 280 }} key={`item_${i}`}>
                {item} - {quantity[i]}
                {units[i]} <br />
              </div>
            );
          });
        },
      },
      {
        Header: "Delivery date",
        accessor: "delivery_date",
        Cell: (props: any): any => {
          const dates = props.row.original.delivery_date.split(",");
          return dates.map((item: any, i: number) => {
            return <div key={`item_${i}`}>{item}</div>;
          });
        },
      },
      {
        Header: "Delivery status",
        accessor: "delivery_status",
        Cell: (props: any): any => {
          const dates = props.row.original.delivery_status.split(",");
          return dates.map((item: any, i: number) => {
            let index = item - 1;
            let color = "#111111";
            if (item == 2) color = "#002aff";
            if (item == 3) color = "#04fc00";
            if (item == 4) color = "#fc0000";
            return (
              <div key={`item_${i}`} style={{ width: 100 }}>
                <span style={{ color }}>{DELIVERY_STATUS[index]}</span>
              </div>
            );
          });
        },
      },
      {
        Header: "Total(₹)",
        accessor: "total_price",
        Cell: (props: any): any => {
          return props.value.toFixed(2);
        },
      },

      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: (props: any): any => {
      //     return <span className={`badge ${ORDER_STATUS_BADGE_CLASS[props.value]}`}>{ORDER_STATUS[props.value]}</span>;
      //   },
      // },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props: any): any => {
          return (
            <div style={{ width: 90 }}>
              <Link
                to={`/order/details/${props.row.original.id}`}
                className="btn btn-success btn-sm"
                style={{ marginRight: 10 }}
                title="Order Details"
              >
                <i className="fas fa-eye"></i>
              </Link>

              <button className="btn btn-success btn-sm" onClick={() => generateOrderPdf(props.row.original)}>
                <i className="fas fa-download"></i>
              </button>

              {handleThermalPrint && (
                <button
                  className="btn btn-secondary btn-sm mt-2"
                  onClick={() => handleThermalPrint([props.row.original.id])}
                  title="Thermal print without prices"
                >
                  <i className="fas fa-print"></i>
                </button>
              )}

              {props.row.original.receipt_url && (
                <a
                  href={getReceiptUrl(props.row.original.receipt_url)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-info btn-sm mt-2"
                  title="View stored invoice"
                >
                  <i className="fas fa-file-invoice"></i>
                </a>
              )}

              {/* <button onClick={() => handleOrderDelete(props.row.original.id)} className="btn btn-danger btn-sm" title="Cancel Order">
                <i className="fas fa-trash"></i>
              </button> */}
            </div>
          );
        },
      },
    ],
    [selectedOrders, orderList, allVisibleSelected, handleCheckboxSelect, handleSelectAllOrders, generateOrderPdf, handleThermalPrint]
  );
  return (
    <Table columns={columns} data={orderList} franchiseList={franchiseList} fromScreen={"order"} filterOrderByFranchise={filterOrderByFranchise} />
  );
}

export default OrderTable;
