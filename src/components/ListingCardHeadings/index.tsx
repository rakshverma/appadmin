import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

function ListingCardHeadings(props: any) {
  const {
    heading,
    button,
    onClick,
    changePassword,
    assignButtonText,
    onAssignButtonClick,
    updateShippingCost,
    onStatusButtonClick,
    processButtonText,
    onProcessButtonClick,
    summaryButtonText,
    onSummaryButtonClick,
    thermalButtonText,
    onThermalButtonClick,
  } = props;
  return (
    <div className="row mb-3">
      <div className="col-sm-7 my-auto">
        <h4 className="card-title mb-0">{heading}</h4>
      </div>
      <div className="col-sm-5 text-end">
        <div className="d-flex float-end">
          {onStatusButtonClick && (
            <div className="text-sm-end my-auto" style={{ marginRight: 10 }}>
              <Button
                type="button"
                label={"Complete Orders"}
                onClick={onStatusButtonClick}
                className={"btn-primary btn-sm btn-rounded waves-effect waves-light"}
              />
            </div>
          )}
          {assignButtonText && (
            <div className="text-sm-end my-auto" style={{ marginRight: 10 }}>
              <Button
                type="button"
                label={assignButtonText}
                onClick={onAssignButtonClick}
                className={"btn-dark btn-sm btn-rounded waves-effect waves-light"}
              />
            </div>
          )}
          {onProcessButtonClick && (
            <div className="text-sm-end my-auto" style={{ marginRight: 10 }}>
              <Button
                type="button"
                label={processButtonText || "Process Orders"}
                onClick={onProcessButtonClick}
                className={"btn-success btn-sm btn-rounded waves-effect waves-light"}
              />
            </div>
          )}
          {onSummaryButtonClick && (
            <div className="text-sm-end my-auto" style={{ marginRight: 10 }}>
              <Button
                type="button"
                label={summaryButtonText || "Generate Summary"}
                onClick={onSummaryButtonClick}
                className={"btn-info btn-sm btn-rounded waves-effect waves-light"}
              />
            </div>
          )}
          {onThermalButtonClick && (
            <div className="text-sm-end my-auto" style={{ marginRight: 10 }}>
              <Button
                type="button"
                label={thermalButtonText || "Thermal Print"}
                onClick={onThermalButtonClick}
                className={"btn-secondary btn-sm btn-rounded waves-effect waves-light"}
              />
            </div>
          )}
          {updateShippingCost && (
            <div className="text-sm-end my-auto" style={{ marginRight: 10 }}>
              <Button
                type="button"
                label={updateShippingCost.text}
                onClick={updateShippingCost.onClick}
                className={"btn-primary btn-sm btn-rounded waves-effect waves-light"}
              />
            </div>
          )}
          <div className="text-sm-end my-auto">
            {button?.type === "link" && (
              <Link to={button.to ?? ""} className="btn btn-primary btn-sm btn-rounded waves-effect waves-light">
                {button.text}
              </Link>
            )}
            {button?.type === "button" && (
              <Button type="button" label={button.text} onClick={onClick} className={"btn-primary btn-sm btn-rounded waves-effect waves-light"} />
            )}
          </div>

          {changePassword && (
            <div className="text-sm-end my-auto" style={{ marginLeft: 10 }}>
              <Button
                type="button"
                label={changePassword.text}
                onClick={changePassword.onClick}
                className={"btn-primary btn-sm btn-rounded waves-effect waves-light"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingCardHeadings;
