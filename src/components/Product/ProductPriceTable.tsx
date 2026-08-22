import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "../Table";
import { uploadUrl } from "../../utils/axios";
import { setProductPriceOnFranchiseId } from "../../store/actions/productAction";

function ProductPriceTable({ productList }: any) {
  const dispatch = useDispatch();
  const { franchiseList, franchiseId } = useSelector((state: any) => state.product);
  const [showError, setShowError] = useState<any>(null);
  console.log("franchiseIdfranchiseId=", franchiseId);
  const showProductImage = (data: string) => {
    const images = JSON.parse(data);
    if (images.length) {
      return <img src={`${uploadUrl}${images[0]}`} style={{ height: 70 }} crossOrigin="anonymous" className="rounded" alt="" />;
    } else return null;
  };

  const setProductPriceOnFranchise = (e: any) => {
    setShowError(null);
    dispatch(setProductPriceOnFranchiseId(e.target.value));
  };

  const showErrorOnClickButton = (id: number) => {
    setShowError({ id: id, msg: "Select franchise first" });
  };

  const columns = useMemo(
    () => [
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
        Header: `Quantity & Price(₹)`,
        accessor: "quantity_wise_price",
        Cell: (props: any): any => {
          if (!props.value) return "N/A";
          else {
            const prices = JSON.parse(props.value);
            return (
              <ul className="qan-price-list">
                <li key={`price_heading`}>
                  Quantity
                  <span style={{ marginRight: 20 }}>Price</span>
                </li>
                {prices.map((item: any, i: number) => {
                  return (
                    <li key={`price_${i}`}>
                      {`${item.quantity}${item.unit}`} <span style={{ marginRight: 35 }}> {parseFloat(item.price).toFixed(2)}</span>{" "}
                    </li>
                  );
                })}
              </ul>
            );
          }
        },
      },
      {
        Header: "category",
        accessor: "category_name",
        Cell: (props: any): any => {
          return <span className="badge bg-info">{props.value}</span>;
        },
      },
      {
        Header: "Availability",
        accessor: "is_available",
        Cell: (props: any): any => {
          return props.value === 1 ? <span style={{ color: "green" }}>In Stock</span> : <span style={{ color: "red" }}>Out of Stock</span>;
        },
      },
      {
        Header: "Days of delevery",
        accessor: "delevery_days",
        Cell: (props: any): any => {
          if (!props.value) return "N/A";
          else {
            const days = JSON.parse(props.value);
            return (
              <ul className="qan-price-list">
                {days.map((item: any, i: number) => {
                  return <li key={`days_${i}`}>{`${item}`}</li>;
                })}
              </ul>
            );
          }
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props: any) => {
          // const { id, name, inserted_at } = props.row.original;
          if (franchiseId) {
            return (
              <Link to={`/product/add-price/${props.row.original.id}/${franchiseId}`} className="btn btn-primary btn-sm" title="Edit Product Price">
                Set Price
              </Link>
            );
          } else {
            return (
              <>
                <Link to={""} onClick={() => showErrorOnClickButton(props.row.id)} className="btn btn-primary btn-sm" title="Edit Product Price">
                  Set Price
                </Link>
                {showError && showError.id === props.row.id ? <p style={{ color: "red" }}>{showError.msg}</p> : null}
              </>
            );
          }
        },
      },
    ],
    [franchiseId, showError]
  );
  productList = productList.filter((item: any) => item.status === 1);
  if (!productList?.length) {
    return (
      <div className="admin-empty-state">
        <i className="fa fa-rupee-sign"></i>
        <h5>No active products to price</h5>
        <p>Add and enable products before setting franchise pricing.</p>
      </div>
    );
  }
  return (
    <Table
      columns={columns}
      data={productList}
      franchiseList={franchiseList}
      franchiseId={franchiseId}
      setProductPriceOnFranchise={setProductPriceOnFranchise}
    />
  );
}

export default ProductPriceTable;
