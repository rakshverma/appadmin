import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ListingCardHeadings from "../ListingCardHeadings";
import OrderTable from "./OrderTable";
import AssignDeleveryBoyModal from "./AssignDeleveryBoyModal";
import { getOrdersListAction, cancelOrderOnId } from "../../store/actions/orderAction";

function OrderListCard({
  orderList,
  activeTab,
  tabs,
  heading,
  buttonText,
  onButtonClick,
  assignButtonText,
  handleNavClick,
  generateOrderPdf,
  franchiseList,
  filterOrderByFranchise,
  handleCancelOrder,
  handleCompleteOrder,
  handleProcessOrder,
  handleGenerateSummary,
}: any) {
  console.log("orderListorderList = ", orderList);
  const dispatch = useDispatch();
  const radioRef: any = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [checkboxError, setCheckboxError] = useState<string | null>(null);
  const [orderSelected, setOrderSelected] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<any>([]);
  console.log("orderSelected = ", orderSelected);

  const onClickEdit = () => {};
  const onClickDelete = () => {};
  const onClickEditRequest = () => {};

  const closeModal = () => {
    setIsOpen(false);
    setOrderSelected("");
    radioRef.current.checked = false;
    dispatch(getOrdersListAction());
  };

  const onCheckOrderCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxError(null);
    setOrderSelected(e.target.defaultValue);
  };

  const handleOrderDelete = (id: any) => {
    dispatch(cancelOrderOnId(id));
  };

  const handleCheckboxSelect = (orderId: any) => {
    console.log("orderId = ", orderId);
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id: any) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAllOrders = (orderIds: any[]) => {
    const allSelected = orderIds.length > 0 && orderIds.every((id: any) => selectedOrders.includes(id));
    if (allSelected) {
      setSelectedOrders(selectedOrders.filter((id: any) => !orderIds.includes(id)));
      return;
    }
    setSelectedOrders([...selectedOrders, ...orderIds.filter((id: any) => !selectedOrders.includes(id))]);
  };

  const onDownloadButtonClick = () => {
    onButtonClick(selectedOrders);
    setSelectedOrders([]);
  };

  const onHandleCancelOrders = () => {
    handleCancelOrder(selectedOrders);
    setSelectedOrders([]);
  };

  const onStatusButtonClick = () => {
    handleCompleteOrder(selectedOrders);
    setSelectedOrders([]);
  };

  const onProcessButtonClick = () => {
    handleProcessOrder(selectedOrders);
    setSelectedOrders([]);
  };

  const onSummaryButtonClick = () => {
    handleGenerateSummary(orderList);
  };

  console.log("orderList = ", orderList);

  return (
    <>
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
                assignButtonText={"Cancel Orders"}
                onClick={onDownloadButtonClick}
                onAssignButtonClick={onHandleCancelOrders}
                onStatusButtonClick={onStatusButtonClick}
                processButtonText={"Process Orders"}
                onProcessButtonClick={onProcessButtonClick}
                summaryButtonText={"Generate Summary"}
                onSummaryButtonClick={onSummaryButtonClick}
              />
              {checkboxError && <p style={{ textAlign: "right", color: "red" }}>{checkboxError}</p>}
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {tabs.map((item: any, i: number) => (
                      <li className="nav-item" role="presentation" key={`tabs_${i}`}>
                        <button className={`nav-link ${activeTab === item.id ? "active" : ""}`} type="button" onClick={() => handleNavClick(item.id)}>
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content">
                    {activeTab === "recent" && (
                      <div className={`tab-pane ${activeTab === "recent" ? "active" : ""}`} id="list">
                        <OrderTable
                          orderList={orderList.filter((obj: any) => obj.status === 1)}
                          orderStatus={"recent"}
                          onCheckOrderCheckbox={onCheckOrderCheckbox}
                          radioRef={radioRef}
                          handleOrderDelete={handleOrderDelete}
                          generateOrderPdf={generateOrderPdf}
                          franchiseList={franchiseList}
                          filterOrderByFranchise={filterOrderByFranchise}
                          selectedOrders={selectedOrders}
                          handleCheckboxSelect={handleCheckboxSelect}
                          handleSelectAllOrders={handleSelectAllOrders}
                        />
                      </div>
                    )}
                    {/* {activeTab === "ontheway" && (
                      <div className={`tab-pane ${activeTab === "ontheway" ? "active" : ""}`} id="request">
                        <OrderTable
                          orderList={orderList.filter((obj) => obj.status === 2)}
                          orderStatus={"ontheway"}
                          onCheckOrderCheckbox={onCheckOrderCheckbox}
                        />
                      </div>
                    )} */}
                    {activeTab === "delivered" && (
                      <div className={`tab-pane ${activeTab === "delivered" ? "active" : ""}`} id="delivered">
                        <OrderTable
                          orderList={orderList.filter((obj: any) => obj.status === 2)}
                          orderStatus={"delivered"}
                          onCheckOrderCheckbox={onCheckOrderCheckbox}
                          radioRef={radioRef}
                          generateOrderPdf={generateOrderPdf}
                          franchiseList={franchiseList}
                          filterOrderByFranchise={filterOrderByFranchise}
                          selectedOrders={selectedOrders}
                          handleCheckboxSelect={handleCheckboxSelect}
                          handleSelectAllOrders={handleSelectAllOrders}
                        />
                      </div>
                    )}
                    {activeTab === "canceled" && (
                      <div className={`tab-pane ${activeTab === "canceled" ? "active" : ""}`} id="request">
                        <OrderTable
                          orderList={orderList.filter((obj: any) => obj.status === 3)}
                          orderStatus={"canceled"}
                          onCheckOrderCheckbox={onCheckOrderCheckbox}
                          radioRef={radioRef}
                          generateOrderPdf={generateOrderPdf}
                          franchiseList={franchiseList}
                          filterOrderByFranchise={filterOrderByFranchise}
                          selectedOrders={selectedOrders}
                          handleCheckboxSelect={handleCheckboxSelect}
                          handleSelectAllOrders={handleSelectAllOrders}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <AssignDeleveryBoyModal isOpen={isOpen} closeModal={closeModal} orderSelected={orderSelected} orderList={orderList} />}
    </>
  );
}

export default OrderListCard;
