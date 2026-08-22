import React from "react";
import { DeleveryBoyListProps } from "./../../types";
import BreadCrumb from "../BreadCrumb";
import ListingCardHeadings from "../ListingCardHeadings";
import DeleveryBoyTable from "./DeleveryBoyTable";

function Listing({ pageHeading, breadCrumb, heading, buttonText, onButtonClick, deleveryBoyList, onClickEdit, onClickDelete }: any) {
  return (
    <div className="container-fluid" style={{ marginBottom: 100 + "px" }}>
      <BreadCrumb pageHeading={pageHeading} breadCrumb={breadCrumb} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <ListingCardHeadings
                heading={heading}
                button={{
                  type: "button",
                  text: buttonText,
                }}
                onClick={onButtonClick}
              />
              <div className="row">
                <div className="col-md-12">
                  <DeleveryBoyTable deleveryBoyList={deleveryBoyList} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
