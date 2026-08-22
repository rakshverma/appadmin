import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "./../utils/constants";
import { getOrdersListAction, getOrderListOnFranchiseId, cancelOrdersAction, completeOrdersAction } from "../store/actions/orderAction";
import { getProductListAction } from "../store/actions/productAction";
import OrderListCard from "../components/Orders/OrderListCard";
import BreadCrumb from "../components/BreadCrumb";
import { SET_ORDERS_LIST } from "./../store/actionTypes";
import generatePdf, { generateMultiplePdf } from "./../utils/generatePdf";
const { orderPageheading, orderListHeading, assignDeleveyBoy, downloadInvoiceText } = constants;
const breadCrumb = [{ to: "order/list", name: "Orders" }];
const tabs = [
  { id: "recent", title: "Recent Orders" },
  // { id: "ontheway", title: "On The Way" },
  { id: "delivered", title: "Completed Orders" },
  { id: "canceled", title: "Canceled orders" },
];

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList, isError, isSuccess } = useSelector((state: any) => state.order);
  const { franchiseList } = useSelector((state: any) => state.product);
  const [activeTab, setActiveTab] = useState("recent");
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    console.log("LIST EFFECT CALLED");
    dispatch(getProductListAction());
    dispatch(getOrdersListAction());
  }, [dispatch]);

  const onButtonClick = (orderIds: any) => {
    if (orderIds.length) {
      let orderArray: any = [];
      orderIds.forEach((id: any) => {
        const detailsArr = orderList.filter((obj: any) => obj.id === id);
        orderArray.push(detailsArr[0]);
      });
      generateMultiplePdf(orderArray);
    }
  };

  const handleNavClick = (tab: any) => {
    setActiveTab(tab);
  };

  const filterOrderByFranchise = (e: any) => {
    console.log("e = ", e.target.value);
    dispatch(getOrderListOnFranchiseId(e.target.value));
  };

  const generateOrderPdf = (details: any) => {
    generatePdf(details);
  };

  const handleCancelOrder = (list: any) => {
    console.log("list = ", list);
    console.log("orderList = ", orderList);
    if (!list.length) return;
    let check = true;
    list.forEach((itm: any) => {
      const filter = orderList.filter((obj: any) => {
        if (itm == obj.id) {
          const delivery_status = obj.delivery_status.split(",");
          console.log("delivery_statusdelivery_status = ", delivery_status);
          if (delivery_status.includes("3") || delivery_status.includes("2")) return true;
          else return false;
        } else return false;
      });

      console.log("filter = ", filter);

      if (filter.length) {
        check = false;
        return;
      }
    });

    // orderList.forEach((obj: any) => {
    //   const filter = list.filter((itm: any) => {
    //     if (itm == obj.id) {
    //       const delivery_status = obj.delivery_status.split(",");
    //       console.log("delivery_statusdelivery_status = ", delivery_status);
    //       if (delivery_status.includes(3) || delivery_status.includes(2)) return true;
    //       else return false;
    //     } else return false;
    //   });
    //   if (filter.length) {
    //     check = false;
    //     return;
    //   }
    // });
    console.log("check = ", check);
    if (!check) {
      window.alert(
        "some of order contains item which is already assigned to delivery boy or already delivered. Please cancel item from specific order details page."
      );
      return;
    }
    dispatch(cancelOrdersAction(list));
  };

  console.log("franchiseList = ", franchiseList);
  const handleCompleteOrder = (list: any) => {
    if (!list.length) return;
    dispatch(completeOrdersAction(list));
  };

  return (
    <div className="container-fluid" style={{ marginBottom: 100 + "px" }}>
      <BreadCrumb pageHeading={orderPageheading} breadCrumb={breadCrumb} />
      <OrderListCard
        orderList={orderList}
        activeTab={activeTab}
        tabs={tabs}
        heading={orderListHeading}
        buttonText={downloadInvoiceText}
        onButtonClick={onButtonClick}
        assignButtonText={assignDeleveyBoy}
        handleNavClick={handleNavClick}
        franchiseList={franchiseList}
        filterOrderByFranchise={filterOrderByFranchise}
        generateOrderPdf={generateOrderPdf}
        setSelectedOrders={setSelectedOrders}
        selectedOrders={selectedOrders}
        handleCancelOrder={handleCancelOrder}
        handleCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}

export default Orders;
