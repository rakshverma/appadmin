import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import { constants } from "./../utils/constants";
import ListingCardHeadings from "../components/ListingCardHeadings";
import ReviewList from "../components/Product/ReviewList";
import { getProductReviewsAction, deleteReviewOnId } from "./../store/actions/productAction";

const { reviewListHeading, reviewHeading } = constants;

function ProductReview() {
  const dispatch = useDispatch();
  const { reviewList } = useSelector((state: any) => state.productReviews);
  const breadCrumb = [{ to: "product/list", name: "Product List" }];

  useEffect(() => {
    dispatch(getProductReviewsAction());
  }, [dispatch]);

  const onClickDelete = (e: any, id: number) => {
    e.preventDefault();
    console.log("helooooooooooo = ", id);
    dispatch(deleteReviewOnId(id));
  };

  return (
    <>
      <div className="container-fluid" style={{ marginBottom: 100 + "px" }}>
        <BreadCrumb pageHeading={reviewHeading} breadCrumb={breadCrumb} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <ListingCardHeadings heading={reviewListHeading} />
                <div className="row">
                  <div className="col-md-12">
                    <ReviewList reviewList={reviewList} onClickDelete={onClickDelete} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReview;
