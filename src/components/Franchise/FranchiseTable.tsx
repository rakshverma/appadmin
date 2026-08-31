import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "../Table";

function FranchiseTable({ franchiseList, onClickEdit, onClickDelete }: any) {
  console.log("franchiseListfranchiseList = ", franchiseList);
  const getCount = (value: any) => Number(value || 0);
  const formatZipCodes = (zipCodes: any) => {
    if (!zipCodes) return "";
    if (Array.isArray(zipCodes)) return zipCodes.join(", ");
    try {
      const parsed = JSON.parse(zipCodes);
      return Array.isArray(parsed) ? parsed.join(", ") : "";
    } catch (e) {
      return "";
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone_number",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Franchise Name",
        accessor: "franchise_name",
      },
      {
        Header: "Franchise Location Pincodes",
        accessor: "pincodes",
        Cell: (props: any): any => {
          return (
            <>
              {props.row.original.state}
              <br />
              {props.row.original.district} - {formatZipCodes(props.row.original.zip_codes)}
            </>
          );
        },
      },
      {
        Header: "Orders",
        accessor: "order_counts",
        Cell: (props: any): any => {
          const { processing_orders, completed_orders, canceled_orders } = props.row.original;
          return (
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-warning text-dark">Processing: {getCount(processing_orders)}</span>
              <span className="badge bg-success">Completed: {getCount(completed_orders)}</span>
              <span className="badge bg-danger">Canceled: {getCount(canceled_orders)}</span>
            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props: any): any => {
          return props.value === 1 ? "Active" : "Inactive";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props: any) => {
          // const { id, name, inserted_at } = props.row.original;
          return (
            <>
              <Link
                to=""
                onClick={(e) => {
                  onClickEdit(e, props.row.original.user_id);
                }}
              >
                <i className="mdi mdi-lead-pencil font-size-24 me-2 text-info"></i>
              </Link>
              <button
                style={{ backgroundColor: "#ffffff", borderWidth: 0 }}
                onClick={() => {
                  onClickDelete(props.row.original.user_id);
                }}
              >
                <i className="mdi mdi-delete font-size-24 text-danger"></i>
              </button>
              <Link
                to={`/franchise/shipping-cost/${props.row.original.user_id}`}
                className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
              >
                Add Shipping Costs
              </Link>
            </>
          );
        },
      },
    ],
    [onClickEdit, onClickDelete]
  );
  return <Table columns={columns} data={franchiseList} />;
}

export default FranchiseTable;
