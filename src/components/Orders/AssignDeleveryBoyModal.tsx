import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeleveryBoyListOnFranchise, updateDeleveryBoyDetailsOnOrder } from "../../store/actions/orderAction";
import CustomModal from "./../CustomModal";
import { ORDER_STATUS } from "../../utils/constants";

function AssignDeleveryBoyModal({ isOpen, closeModal, orderSelected, orderList }: any) {
  const orderItem = useMemo(() => {
    return orderList.filter((obj: any) => obj.id === parseInt(orderSelected));
  }, [orderList, orderSelected]);
  const dispatch = useDispatch();
  const { ordersDeleveryBoyList, isError, isSuccess } = useSelector((state: any) => state.order);
  const [assignError, setAssignError] = useState<any>({});
  const [formData, setFormData] = useState({
    deleveryBoyId: orderItem.length ? orderItem[0].delevery_boy_id : null,
    status: orderItem.length ? orderItem[0].status : null,
  });

  useEffect(() => {
    dispatch(getDeleveryBoyListOnFranchise(orderSelected));
  }, [dispatch, orderSelected]);

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess, closeModal]);

  const handleChangeEvent = (e: any) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAssignSaveClicked = () => {
    let msg = {};
    if (!formData.deleveryBoyId) msg = { ...msg, deleveryBoyId: "Please select delivery boy." };
    if (!formData.status) msg = { ...msg, status: "Select status." };
    if (Object.keys(msg).length > 0) {
      setAssignError(msg);
    } else {
      setAssignError({});
      dispatch(updateDeleveryBoyDetailsOnOrder(formData.deleveryBoyId, formData.status, orderItem[0].id));
    }
  };

  return (
    <CustomModal
      handleModalCloseRequest={closeModal}
      handleSaveClicked={handleAssignSaveClicked}
      modalTitle={"Assign to Delivery Boy"}
      isOpen={isOpen}
      footerButtonText={"Update"}
      closeModal={closeModal}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="form-group">
            <label>List of Delivery Boys</label>
            <select className="form-select" name="deleveryBoyId" onChange={handleChangeEvent}>
              <option value="">Select Delivery Boy</option>
              {ordersDeleveryBoyList?.map((item: any, i: number) => {
                return (
                  <option
                    value={item.id}
                    key={`opt_db${i}`}
                    selected={formData.deleveryBoyId === item.id}
                  >{`${item.name} - Assigned( ${item.count} )`}</option>
                );
              })}
            </select>
            {assignError?.deleveryBoyId && <p style={{ color: "red" }}>{assignError?.deleveryBoyId}</p>}
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Order Status</label>
            <select className="form-select" name="status" onChange={handleChangeEvent}>
              {Object.keys(ORDER_STATUS).map((k: any) => {
                return (
                  <option value={k} key={`st${k}`} selected={formData.status == k} disabled={k == 1}>
                    {ORDER_STATUS[k]}
                  </option>
                );
              })}
            </select>
            {assignError?.status && <p style={{ color: "red" }}>{assignError?.status}</p>}
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default AssignDeleveryBoyModal;
