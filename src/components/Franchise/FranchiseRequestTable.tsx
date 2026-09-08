import React, { useMemo } from "react";
import Table from "../Table";
import { convertDateToLocal } from "../../utils/common";

function FranchiseRequestTable({ franchiseRequests, onClickEditRequest }: any) {
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
        Header: "Message",
        accessor: "message",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props: any): any => {
          return props.value === 1 ? "Active" : "Inactive";
        },
      },
      {
        Header: "Date",
        accessor: "inserted_at",
        Cell: (props: any): any => {
          return convertDateToLocal(props.value);
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props: any) => {
          // const { id, name, inserted_at } = props.row.original;
          return (
            <>
              <button
                type="button"
                className="admin-icon-action"
                onClick={(e) => {
                  onClickEditRequest(e, props.row.original.id);
                }}
                title="Edit franchise request"
              >
                <i className="mdi mdi-lead-pencil font-size-24 me-2 text-info"></i>
              </button>
            </>
          );
        },
      },
    ],
    [onClickEditRequest]
  );
  return <Table columns={columns} data={franchiseRequests} />;
}

export default FranchiseRequestTable;
