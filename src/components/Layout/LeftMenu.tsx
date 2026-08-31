import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
function LeftMenu() {
  const { userInfo } = useSelector((state: any) => state.user);
  const closeMobileMenu = () => {
    document.body.classList.remove("sidebar-enable");
  };
  const navClassName = ({ isActive }: { isActive: boolean }) => `waves-effect${isActive ? " active" : ""}`;

  return (
    <div className="vertical-menu">
      <div data-simplebar="init" className="h-100">
        <div className="simplebar-wrapper margin-0">
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset left-menu-simplebar">
              <div className="simplebar-content-wrapper left-menu-simplebar-wrapper">
                <div className="simplebar-content padding-0">
                  <div id="sidebar-menu" className="mm-active">
                    <ul className="metismenu list-unstyled mm-show" id="side-menu">
                      <li className="menu-title">Menu</li>
                      <li>
                        <NavLink to={"/dashboard"} end className={navClassName} onClick={closeMobileMenu}>
                          <i className="fa fa-home"></i>
                          <span>Dashboard</span>
                        </NavLink>
                      </li>
                      {(userInfo?.role_id === 1 || userInfo?.role_id === 2) && (
                        <li>
                          <NavLink to={"/order/list"} className={navClassName} onClick={closeMobileMenu}>
                            <i className="fa fa-shopping-cart"></i>
                            <span> Orders</span>
                          </NavLink>
                        </li>
                      )}

                      {userInfo?.role_id === 1 && (
                        <>
                          <li>
                            <NavLink to={"/customers/list"} className={navClassName} onClick={closeMobileMenu}>
                              <i className="fa fa-users"></i>
                              <span> Customers</span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={"/franchise/list"} className={navClassName} onClick={closeMobileMenu}>
                              <i className="fa fa-user-tie"></i>
                              <span> Franchises</span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={"/revenue"} className={navClassName} onClick={closeMobileMenu}>
                              <i className="fa fa-rupee-sign"></i>
                              <span> Revenue</span>
                            </NavLink>
                          </li>
                        </>
                      )}
                      {(userInfo?.role_id === 1 || userInfo?.role_id === 2) && <li className="menu-title">Products</li>}

                      {userInfo?.role_id === 1 && (
                        <li>
                          <NavLink to={"/category/list"} className={navClassName} onClick={closeMobileMenu}>
                            <i className="fa fa-tags"></i>
                            <span> Categories</span>
                          </NavLink>
                        </li>
                      )}
                      {(userInfo?.role_id === 1 || userInfo?.role_id === 2) && (
                        <>
                          <li>
                            <NavLink to={"/product/list"} className={navClassName} onClick={closeMobileMenu}>
                              <i className="fa fa-boxes"></i>
                              <span> Products</span>
                            </NavLink>
                          </li>
                          {userInfo?.role_id === 1 && (
                            <li>
                              <NavLink to={"/product/add"} className={navClassName} onClick={closeMobileMenu}>
                                <i className="fa fa-plus-circle"></i>
                                <span> Add Product</span>
                              </NavLink>
                            </li>
                          )}
                        </>
                      )}

                      {userInfo?.role_id === 1 && (
                        <li>
                          <NavLink to={"/product/reviews"} className={navClassName} onClick={closeMobileMenu}>
                            <i className="fa fa-pen-nib"></i>
                            <span> Product Review</span>
                          </NavLink>
                        </li>
                      )}
                      {(userInfo?.role_id === 1 || userInfo?.role_id === 2) && (
                        <>
                          <li className="menu-title">Delivery Boy</li>
                          <li>
                            <NavLink to={"/deleveryboy/list"} className={navClassName} onClick={closeMobileMenu}>
                              <i className="fa fa-users-cog"></i>
                              <span> List of Delivery Boys</span>
                            </NavLink>
                          </li>
                        </>
                      )}

                      {/* {userInfo?.role_id === 1 && (
                        <>
                          <li className="menu-title">Pages</li>
                          <li>
                            <a href="home-page.html" className="waves-effect">
                              <i className="bx bx-right-arrow-circle"></i>
                              <span> Home</span>
                            </a>
                          </li>
                          <li>
                            <a href="about-us.html" className="waves-effect">
                              <i className="bx bx-right-arrow-circle"></i>
                              <span> About Us</span>
                            </a>
                          </li>
                          <li>
                            <a href="contact-us.html" className="waves-effect">
                              <i className="bx bx-right-arrow-circle"></i>
                              <span> Contact Us</span>
                            </a>
                          </li>
                        </>
                      )} */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="simplebar-placeholder left-menu-simplebar-placeholder"></div>
        </div>
        <div className="simplebar-track simplebar-horizontal visibility-hidden">
          <div className="simplebar-scrollbar simplebar-visible left-menu-simplebar-scrollbar"></div>
        </div>
        <div className="simplebar-track simplebar-vertical simplebar-hover visibility-visible">
          <div className="simplebar-scrollbar simplebar-visible left-menu-simplebar-scrollbar-visible"></div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
