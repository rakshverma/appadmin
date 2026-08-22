import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import ResetPassword from "../pages/ResetPassword";
import CategoryList from "../pages/CategoryList";
import ProductList from "../pages/ProductList";
import AddProducts from "../pages/AddProducts";
import AddProductPrice from "../pages/AddProductPrice";
import FranchiseList from "../pages/FranchiseList";
import AddFranchise from "../pages/AddFranchise";
import DeleveryBoyList from "../pages/DeleveryBoyList";
import AddDeleveryBoy from "../pages/AddDeleveryBoy";
import UserProfile from "../pages/UserProfile";
import ProductReview from "../pages/ProductReview";
import Customers from "../pages/Customers";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Revenue from "../pages/Revenue";
import EditProduct from "../pages/EditProduct";
import AddShippingCost from "../pages/AddShippingCost";

const Application = () => {
  const basename = process.env.REACT_APP_ADMIN_BASENAME || "";
  return (
    <Router basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category/list" element={<CategoryList />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/add" element={<AddProducts />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
          <Route path="/product/add-price/:productId/:distributerId" element={<AddProductPrice />} />
          <Route path="/franchise/list" element={<FranchiseList />} />
          <Route path="/franchise/add" element={<AddFranchise />} />
          <Route path="/franchise/shipping-cost/:franchiseId" element={<AddShippingCost />} />
          <Route path="/deleveryboy/list" element={<DeleveryBoyList />} />
          <Route path="/deleveryboy/add" element={<AddDeleveryBoy />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/product/reviews" element={<ProductReview />} />
          <Route path="/customers/list" element={<Customers />} />
          <Route path="/order/list" element={<Orders />} />
          <Route path="/order/details/:id" element={<OrderDetails />} />
          <Route path="/revenue" element={<Revenue />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
};

export default Application;
