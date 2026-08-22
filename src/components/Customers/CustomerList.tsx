import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../Table";
import { convertDateToLocal } from "../../utils/common";

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
              <Link
                to=""
                onClick={(e) => {
                  onClickDelete(e, props.row.original.id);
                }}
              >
                <i className="mdi mdi-delete font-size-24 text-danger"></i>
              </Link>
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
