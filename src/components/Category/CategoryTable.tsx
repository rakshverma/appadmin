import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../Table";
import { convertDateToLocal } from "../../utils/common";

function CategoryTable({ categoryList, onClickEdit, onClickDelete }: any) {
  const columns = useMemo(
    () => [
      {
        Header: "Category Name",
        accessor: "name",
      },
      {
        Header: "Date Added",
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
              <Link
                to=""
                onClick={(e) => {
                  onClickEdit(e, props.row.original.id);
                }}
              >
                <i className="mdi mdi-lead-pencil font-size-24 me-2 text-info"></i>
              </Link>
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
    [onClickEdit, onClickDelete]
  );
  return <Table columns={columns} data={categoryList} />;
}

export default CategoryTable;
