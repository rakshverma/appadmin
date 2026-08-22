import React from "react";
import { useDispatch } from "react-redux";
import BreadCrumb from "../BreadCrumb";
import ListingCardHeadings from "../ListingCardHeadings";
import ProductTable from "./ProductTable";
import { ProductListProps } from "./../../types";
import ProductPriceTable from "./ProductPriceTable";
import { updateProductStatus } from "../../store/actions/productAction";

function Listing({ pageHeading, breadCrumb, heading, buttonText, onButtonClick, productList, activeTab, handleNavClick, tabs }: ProductListProps) {
  const dispatch = useDispatch();

  const onClickDelete = (id: any, status: any) => {
    dispatch(updateProductStatus(id, status));
  };
  console.log("activeTab = ", activeTab);
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
              <div className="admin-list-intro">
                <div>
                  <span className="admin-kicker">Catalog</span>
                  <h5>Products and pricing</h5>
                  <p>Add products first, then set price and availability for each franchise before items appear for customers.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {tabs.map((item: any, i: number) => (
                      <li className="nav-item" role="presentation" key={`navlink_${i}`}>
                        <button className={`nav-link ${activeTab === item.id ? "active" : ""}`} type="button" onClick={() => handleNavClick(item.id)}>
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content">
                    {activeTab === "home" && (
                      <div className={`tab-pane ${activeTab === "home" ? "active" : ""}`} id="home">
                        <ProductTable productList={productList} onClickDelete={onClickDelete} />
                      </div>
                    )}
                    {activeTab === "price" && (
                      <div className={`tab-pane ${activeTab === "price" ? "active" : ""}`} id="price">
                        <ProductPriceTable productList={productList} />
                      </div>
                    )}
                    {/* {activeTab === "shipping" && (
                      <div className={`tab-pane ${activeTab === "shipping" ? "active" : ""}`} id="shipping">
                        <ShippingCost />
                      </div>
                    )} */}
                  </div>
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
