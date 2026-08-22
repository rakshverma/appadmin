import React from "react";
import BreadCrumb from "../BreadCrumb";
import ListingCardHeadings from "../ListingCardHeadings";
import FranchiseTable from "./FranchiseTable";
import FranchiseRequestTable from "./FranchiseRequestTable";
import { useNavigate } from "react-router-dom";

function Listing({
  pageHeading,
  breadCrumb,
  heading,
  buttonText,
  onButtonClick,
  franchiseList,
  franchiseRequests,
  activeTab,
  handleNavClick,
  tabs,
  onClickDelete,
}: any) {
  const navigate = useNavigate();
  const onClickEdit = (e: any, userId: any) => {
    e.preventDefault();
    navigate(`/franchise/add?eid=${userId}`);
  };
  const onClickEditRequest = () => {};
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
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {tabs.map((item: any) => (
                      <li className="nav-item" role="presentation">
                        <button className={`nav-link ${activeTab === item.id ? "active" : ""}`} type="button" onClick={() => handleNavClick(item.id)}>
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content">
                    {activeTab === "list" && (
                      <div className={`tab-pane ${activeTab === "list" ? "active" : ""}`} id="list">
                        <FranchiseTable franchiseList={franchiseList} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
                      </div>
                    )}
                    {activeTab === "request" && (
                      <div className={`tab-pane ${activeTab === "request" ? "active" : ""}`} id="request">
                        <FranchiseRequestTable franchiseRequests={franchiseRequests} onClickEditRequest={onClickEditRequest} />
                      </div>
                    )}
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
