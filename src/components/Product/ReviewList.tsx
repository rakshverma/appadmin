import React from "react";
import Table from "../Table";
import { uploadUrl } from "../../utils/axios";

function ReviewList({ reviewList, onClickDelete }: any) {
  const showProductImage = (data: string) => {
    try {
      const images = JSON.parse(data);
      if (images.length) {
        return <img src={`${uploadUrl}${images[0]}`} style={{ height: 70 }} crossOrigin="anonymous" className="rounded" alt="" />;
      } else return null;
    } catch (e) {
      return null;
    }
  };
  const columns = [
    {
      Header: "Product Photo",
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
      Header: "Reviews",
      accessor: "message",
    },
    {
      Header: "Customer",
      accessor: "user_name",
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
              title="Delete review"
            >
              <i className="mdi mdi-delete font-size-24 text-danger"></i>
            </button>
          </>
        );
      },
    },
  ];
  return <Table columns={columns} data={reviewList} />;
}

export default ReviewList;
