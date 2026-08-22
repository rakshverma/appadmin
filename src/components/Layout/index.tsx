import React from "react";
import ProtectedRoutes from "../../Routes/ProtectedRoutes";
import LoadingIndicator from "./../LoadingIndicator";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Footer from "./Footer";

function Layout() {
  return (
    <div id="layout-wrapper">
      <LoadingIndicator />
      <Header />
      <LeftMenu />
      <div className="main-content">
        <div className="page-content">
          <ProtectedRoutes />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
