import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "../Table";
import { uploadUrl } from "../../utils/axios";
import { convertDateToLocal } from "../../utils/common";

function ProductTable({ productList, onClickEdit, onClickDelete }: any) {
  const { userInfo } = useSelector((state: any) => state.user);
  const showProductImage = (data: string) => {
    const images = JSON.parse(data);
    if (images.length) {
      return <img src={`${uploadUrl}${images[0]}`} style={{ height: 70 }} crossOrigin="anonymous" className="rounded" alt="" />;
    } else return null;
  };
  const columns = [
    {
      Header: "Product Image",
      accessor: "images",
      Cell: (props: any): any => {
        return showProductImage(props.value);
      },
    },
    {
      Header: "Product Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (props: any): any => {
        return <span style={{ color: props.value === 1 ? "green" : "red" }}>{props.value === 1 ? "Active" : "Inactive"}</span>;
      },
    },
    {
      Header: "Date Added",
      accessor: "inserted_at",
      Cell: (props: any): any => {
        return convertDateToLocal(props.value);
      },
    },
  ];
  if (userInfo?.role_id === 1) {
    columns.push({
      Header: "Actions",
      accessor: "actions",
      Cell: (props: any) => {
        // const { id, name, inserted_at } = props.row.original;
        return (
          <>
            <Link to={`/product/edit/${props.row.original.id}`} className="btn btn-light btn-sm me-2">
              <i className="mdi mdi-lead-pencil me-1"></i>
              Edit
            </Link>
            <button
              onClick={(e) => {
                onClickDelete(props.row.original.id, props.row.original.status === 1 ? 0 : 1);
              }}
              className={`btn btn-sm ${props.row.original.status === 1 ? "btn-outline-danger" : "btn-outline-success"}`}
            >
              {props.row.original.status === 1 ? "Disable" : "Enable"}
            </button>
          </>
        );
      },
    });
  }
  if (!productList?.length) {
    return (
      <div className="admin-empty-state">
        <i className="fa fa-box-open"></i>
        <h5>No products yet</h5>
        <p>Add your first product, then set its price and availability from the pricing tab.</p>
      </div>
    );
  }
  return <Table columns={columns} data={productList} />;
}

export default ProductTable;
