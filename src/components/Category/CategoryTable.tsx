import React, { useMemo } from "react";
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
              <button
                type="button"
                className="admin-icon-action"
                onClick={(e) => {
                  onClickEdit(e, props.row.original.id);
                }}
                title="Edit category"
              >
                <i className="mdi mdi-lead-pencil font-size-24 me-2 text-info"></i>
              </button>
              <button
                type="button"
                className="admin-icon-action"
                onClick={(e) => {
                  onClickDelete(e, props.row.original.id);
                }}
                title="Delete category"
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
  return <Table columns={columns} data={categoryList} />;
}

export default CategoryTable;
