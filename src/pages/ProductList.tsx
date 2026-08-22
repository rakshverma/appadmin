import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "./../utils/constants";
import { getProductListAction } from "./../store/actions/productAction";
import Listing from "../components/Product/Listing";
const { productListheading, addProducts } = constants;
const breadCrumb = [{ to: "product/list", name: "Product List" }];
const tabs = [
  { id: "home", title: "List of Products" },
  { id: "price", title: "Set Product Price" },
  // { id: "shipping", title: "Set Shipping Cost" },
];

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location = ", location);
  const tab = location?.state?.tab || "home";
  const { productList, franchiseId } = useSelector((state: any) => state.product);
  const [activeTab, setActiveTab] = useState(tab);
  console.log("product list called = ", tab);
  console.log("productList = ", productList);
  useEffect(() => {
    console.log("LIST EFFECT CALLED");
    dispatch(getProductListAction());
  }, [dispatch]);

  const onButtonClick = () => {
    navigate("/product/add");
  };

  const handleNavClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <Listing
      pageHeading={"Products"}
      breadCrumb={breadCrumb}
      heading={productListheading}
      buttonText={addProducts}
      onButtonClick={onButtonClick}
      productList={productList}
      activeTab={activeTab}
      handleNavClick={handleNavClick}
      tabs={tabs}
    />
  );
}

export default ProductList;
