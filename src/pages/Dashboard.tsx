import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import BreadCrumb from "../components/BreadCrumb";
import { constants } from "./../utils/constants";
import InformationCard from "../components/InformationCard";
import {
  getOrdersListAction,
  getDeliveryListOnDeliveryBoy,
  updateDeliveryStatusOnId,
  getOrderListOnFranchiseId,
  cancelOrdersAction,
  completeOrdersAction,
} from "../store/actions/orderAction";
import { getProductListAction } from "./../store/actions/productAction";
import OrderListCard from "../components/Orders/OrderListCard";
import { convertDateToLocal } from "./../utils/common";
import generatePdf, { generateMultiplePdf } from "./../utils/generatePdf";
import { SET_ORDERS_LIST } from "./../store/actionTypes";

const { dashboardHeading, orderListHeading, assignDeleveyBoy, downloadInvoiceText } = constants;
const breadCrumb = [{ to: "", name: "Dashboard" }];
const tabs = [
  { id: "recent", title: "Recent Orders" },
  // { id: "ontheway", title: "On The Way" },
  { id: "delivered", title: "Delivered" },
  { id: "canceled", title: "Canceled" },
];

const adminQuickActions = [
  {
    title: "Add Product",
    text: "Create products with images, descriptions, and category mapping.",
    to: "/product/add",
    icon: "fa-box-open",
  },
  {
    title: "Manage Products",
    text: "Update inventory, edit products, and assign franchise pricing.",
    to: "/product/list",
    icon: "fa-boxes",
  },
  {
    title: "Categories",
    text: "Add or update product categories shown on the storefront.",
    to: "/category/list",
    icon: "fa-tags",
  },
  {
    title: "Franchises",
    text: "Create franchise users and map service districts or pincodes.",
    to: "/franchise/list",
    icon: "fa-store",
  },
  {
    title: "Orders",
    text: "Review orders, download invoices, complete or cancel fulfillment.",
    to: "/order/list",
    icon: "fa-receipt",
  },
  {
    title: "Customers",
    text: "See customer profiles and order history.",
    to: "/customers/list",
    icon: "fa-users",
  },
];

const franchiseQuickActions = [
  {
    title: "Orders",
    text: "View orders assigned to your franchise.",
    to: "/order/list",
    icon: "fa-receipt",
  },
  {
    title: "Product Pricing",
    text: "Open products and update local price or availability.",
    to: "/product/list",
    icon: "fa-rupee-sign",
  },
  {
    title: "Shipping Cost",
    text: "Update pincode-wise delivery charges.",
    to: "/franchise/list",
    icon: "fa-map-marker-alt",
  },
];

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qrPath = `${process.env.PUBLIC_URL}/assets/imgs/qr.jpg`;
  const { orderList, deliveryList, isError, isSuccess } = useSelector((state: any) => state.order);
  const { franchiseList } = useSelector((state: any) => state.product);
  const { userInfo } = useSelector((state: any) => state.user);
  const [activeTab, setActiveTab] = useState("recent");
  const [statusCount, setStatusCount] = useState({
    recent: 0,
    delivered: 0,
    canceled: 0,
  });

  useEffect(() => {
    console.log("LIST EFFECT CALLED = ", userInfo);
    if (userInfo?.role_id === 1 || userInfo?.role_id === 2) {
      dispatch(getProductListAction());
      dispatch(getOrdersListAction());
    }
    if (userInfo?.role_id === 3) {
      dispatch(getDeliveryListOnDeliveryBoy(userInfo?.id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userInfo?.role_id === 1 || userInfo?.role_id === 2) {
      dispatch(getOrdersListAction());
    }
    dispatch(getDeliveryListOnDeliveryBoy(userInfo?.id));
  }, [userInfo]);

  useEffect(() => {
    let recent = 0;
    let delivered = 0;
    let canceled = 0;
    orderList.forEach((itm: any) => {
      if (itm.status === 1) {
        recent++;
      }
      if (itm.status === 2) {
        delivered++;
      }
      if (itm.status === 3) {
        canceled++;
      }
    });

    setStatusCount((state) => ({ ...state, recent, delivered, canceled }));
  }, [orderList]);

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

  const updateOrderDeliveryStatus = (e: any, id: number) => {
    const status = e.target.value;
    dispatch(updateDeliveryStatusOnId(id, status));
  };

  const generateOrderPdf = (details: any) => {
    generatePdf(details);
  };

  const filterOrderByFranchise = (e: any) => {
    console.log("e = ", e.target.value);
    dispatch(getOrderListOnFranchiseId(e.target.value));
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

  const handleCompleteOrder = (list: any) => {
    if (!list.length) return;
    dispatch(completeOrdersAction(list));
  };

  console.log("franchiseList = ", franchiseList);
  const quickActions = userInfo?.role_id === 1 ? adminQuickActions : franchiseQuickActions;

  return (
    <>
      <div className="container-fluid" style={{ marginBottom: 100 + "px" }}>
        {(userInfo?.role_id === 1 || userInfo?.role_id === 2) && (
          <>
            <BreadCrumb pageHeading={dashboardHeading} breadCrumb={breadCrumb} />
            <div className="row">
              <InformationCard
                heading={"New Orders"}
                value={statusCount.recent}
                date={moment().format("DD/MM/yyyy")}
                avatarClass={"fa-truck-moving"}
                avatarBgClass={"bg-info"}
              />
              <InformationCard
                heading={"Delivered"}
                value={statusCount.delivered}
                date={moment().format("DD/MM/yyyy")}
                avatarClass={"fa-people-carry"}
                avatarBgClass={"bg-primary"}
              />
              <InformationCard
                heading={"Cancelled"}
                value={statusCount.canceled}
                date={moment().format("DD/MM/yyyy")}
                avatarClass={"fa-times"}
                avatarBgClass={"bg-danger"}
              />
            </div>
            <div className="admin-ops-panel">
              <div className="admin-ops-head">
                <div>
                  <h4>Operations</h4>
                  <p>Common admin tasks are collected here for faster daily use.</p>
                </div>
                <Link to="/product/add" className="btn btn-primary btn-sm">
                  <i className="fa fa-plus me-1"></i>
                  New Product
                </Link>
              </div>
              <div className="admin-quick-grid">
                {quickActions.map((action) => (
                  <Link to={action.to} className="admin-quick-card" key={action.title}>
                    <span className="admin-quick-icon">
                      <i className={`fa ${action.icon}`}></i>
                    </span>
                    <span>
                      <strong>{action.title}</strong>
                      <small>{action.text}</small>
                    </span>
                    <i className="fa fa-chevron-right admin-quick-arrow"></i>
                  </Link>
                ))}
              </div>
            </div>
            <div className="admin-setup-strip">
              <div>
                <strong>Suggested flow</strong>
                <span>Add categories, add products, create franchise/pincode mappings, set product prices, then review orders.</span>
              </div>
            </div>
            <OrderListCard
              orderList={orderList}
              activeTab={activeTab}
              tabs={tabs}
              heading={orderListHeading}
              buttonText={downloadInvoiceText}
              onButtonClick={onButtonClick}
              assignButtonText={assignDeleveyBoy}
              handleNavClick={handleNavClick}
              generateOrderPdf={generateOrderPdf}
              filterOrderByFranchise={filterOrderByFranchise}
              franchiseList={franchiseList}
              handleCancelOrder={handleCancelOrder}
              handleCompleteOrder={handleCompleteOrder}
            />
          </>
        )}
        {userInfo?.role_id === 3 && (
          <>
            {deliveryList.map((item: any) => {
              return (
                <div className="card">
                  <div className="card-body">
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <span>
                        Order No : {item?.itemList[0]?.ref_no}
                        <br /> {convertDateToLocal(item?.itemList[0]?.inserted_at)}
                      </span>
                    </div>
                    <div className="table-responsive">
                      <table className="align-middle mb-0 table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Item Name</th>
                            <th>Delivery Date</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.itemList.map((itm: any) => {
                            return (
                              <tr>
                                <td>{itm?.product_name}</td>
                                <td>{itm?.delivery_date}</td>
                                <td>
                                  {itm?.quantity}
                                  {itm?.unit} X {itm?.count}
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td></td>
                            <td className="text-end">
                              <span style={{ fontWeight: "bold" }}>Total</span>
                            </td>
                            <td>{item?.itemList[0]?.total_price}</td>
                          </tr>
                          <tr>
                            <td className="text-end">
                              <span style={{ fontWeight: "bold" }}>Address</span>
                            </td>
                            <td colSpan={2}>
                              {item?.itemList[0]?.shipping_address}
                              <br />
                              Landmark - {item?.itemList[0]?.landmark}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-end">
                              <span style={{ fontWeight: "bold" }}>Update Delivery Status</span>
                            </td>
                            <td colSpan={2}>
                              {item?.itemList[0]?.delivery_status === 3 ? (
                                "DELIVERED"
                              ) : item?.itemList[0]?.delivery_status === 4 ? (
                                "CANCELED"
                              ) : (
                                <select className="form-select" onChange={(e) => updateOrderDeliveryStatus(e, item?.itemList[0]?.item_id)}>
                                  <option key={`opt_k_`} value={""}>
                                    Select Status
                                  </option>
                                  <option key={`opt_k_DELIVERED`} value={3}>
                                    DELIVERED
                                  </option>
                                  <option key={`opt_k_DELIVERED`} value={4}>
                                    CANCELED
                                  </option>
                                </select>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-3 text-center">
                        <img src={qrPath} alt="" height="300" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
