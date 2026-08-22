import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbProps } from "../../types";
function BreadCrumb(props: BreadcrumbProps) {
  const { pageHeading, breadCrumb } = props;
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">{pageHeading}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">Menu</li>
              {breadCrumb.map((item, i) => {
                return (
                  <li className="breadcrumb-item active" key={`brcrum_${i}`}>
                    <Link to={item.to}>{item.name}</Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
