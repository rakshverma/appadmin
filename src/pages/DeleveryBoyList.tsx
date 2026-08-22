import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../utils/constants";
import { getDeleveryBoyListAction, deleteDeliveryBoy } from "../store/actions/deleveryBoyAction";
import Listing from "../components/DeleveryBoy/Listing";

const { deleveryBoyListHeading, addDeleveryBoy } = constants;
function DeleveryBoyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deleveryBoyList } = useSelector((state: any) => state.deleveryBoy);
  const breadCrumb = [{ to: "deleveryboy/list", name: "Delevery Boys" }];

  useEffect(() => {
    dispatch(getDeleveryBoyListAction());
  }, [dispatch]);

  const onButtonClick = () => {
    navigate("/deleveryboy/add");
  };

  const onClickEdit = (e: any, id: any) => {
    e.preventDefault();
    navigate(`/deleveryboy/add?eid=${id}`);
  };

  const onClickDelete = (id: any) => {
    dispatch(deleteDeliveryBoy(id));
  };

  return (
    <Listing
      pageHeading={"Delevery Boys"}
      breadCrumb={breadCrumb}
      heading={deleveryBoyListHeading}
      buttonText={addDeleveryBoy}
      onButtonClick={onButtonClick}
      deleveryBoyList={deleveryBoyList}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
    />
  );
}

export default DeleveryBoyList;
