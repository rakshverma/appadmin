import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "./../utils/constants";
import { getFranchiseListAction, franchiseRequestListAction, deleteFranchiseAction } from "./../store/actions/franchiseAction";
import Listing from "../components/Franchise/Listing";
const { franchiseListHeading, addFranchise } = constants;
const breadCrumb = [{ to: "franchise/list", name: "Franchise List" }];
const tabs = [
  { id: "list", title: "Franchises List" },
  { id: "request", title: "Franchises Request" },
];

function FranchiseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { franchiseList, franchiseRequests } = useSelector((state: any) => state.franchise);
  const [activeTab, setActiveTab] = useState("list");
  useEffect(() => {
    console.log("LIST EFFECT CALLED");
    dispatch(getFranchiseListAction());
    dispatch(franchiseRequestListAction());
  }, [dispatch]);

  const onButtonClick = () => {
    navigate("/franchise/add");
  };

  const handleNavClick = (tab: any) => {
    setActiveTab(tab);
  };

  const onClickDelete = (id: any) => {
    console.log("fran id = ", id);
    if (window.confirm("deleting franchise will remove all pin codes associated to it. Do you want to continue?") === true) {
      dispatch(deleteFranchiseAction(id));
    }
  };

  return (
    <Listing
      pageHeading={"Franchises"}
      breadCrumb={breadCrumb}
      heading={franchiseListHeading}
      buttonText={addFranchise}
      onButtonClick={onButtonClick}
      franchiseList={franchiseList}
      franchiseRequests={franchiseRequests}
      activeTab={activeTab}
      handleNavClick={handleNavClick}
      tabs={tabs}
      onClickDelete={onClickDelete}
    />
  );
}

export default FranchiseList;
