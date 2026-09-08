import React, { useMemo } from "react";
import Table from "../Table";

function CustomerList({ customerList, onClickDelete }: any) {
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
        Header: "Pincode",
        accessor: "pin_code",
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: (props: any): any => {
          return (
            <>
              {props.row.original.street}
              <br />
              {props.row.original.district}, {props.row.original.state} - {props.row.original.pin_code}
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Total Orders",
        accessor: "total_orders",
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
                  onClickDelete(e, props.row.original.id);
                }}
                title="Delete customer"
              >
                <i className="mdi mdi-delete font-size-24 text-danger"></i>
              </button>
            </>
          );
        },
      },
    ],
    [onClickDelete]
  );
  return <Table columns={columns} data={customerList} />;
}

export default CustomerList;
