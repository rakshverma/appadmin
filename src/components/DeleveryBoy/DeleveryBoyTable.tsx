import React, { useMemo } from "react";
import Table from "../Table";

function DeleveryBoyTable({ deleveryBoyList, onClickEdit, onClickDelete }: any) {
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
        Cell: (props: any): any => {
          return props.row.original.franchise_name ? props.row.original.franchise_name : `${props.row.original.addedby_name} ( Admin )`;
        },
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "District",
        accessor: "district",
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
              <button
                type="button"
                className="admin-icon-action"
                onClick={(e) => {
                  onClickEdit(e, props.row.original.id);
                }}
                title="Edit delivery boy"
              >
                <i className="mdi mdi-lead-pencil font-size-24 me-2 text-info"></i>
              </button>
              <button
                type="button"
                className="admin-icon-action"
                onClick={(e) => {
                  onClickDelete(props.row.original.id);
                }}
                title="Delete delivery boy"
              >
                <i className="mdi mdi-delete font-size-24 text-danger"></i>
              </button>
            </>
          );
        },
      },
    ],
    [onClickEdit, onClickDelete]
  );
  return <Table columns={columns} data={deleveryBoyList} />;
}

export default DeleveryBoyTable;
