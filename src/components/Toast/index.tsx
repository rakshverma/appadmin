import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { CLEAR_STATUS_MESSAGE } from "../../store/actionTypes";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.statusMessage.isError);
  const success = useSelector((state: any) => state.statusMessage.isSuccess);
  // const [forceRerender, setForceRerender] = useState(false);
  const errorKey = error ? `error-${Date.now()}` : "";
  const successKey = success ? `success-${Date.now()}` : "";
  useEffect(() => {
    // Dismiss all existing toasts before showing new ones

    if (error) {
      // Use the unique key as the toastId
      toast.dismiss();
      toast.error(error, { toastId: errorKey });
      dispatch({ type: CLEAR_STATUS_MESSAGE });
    }

    if (success) {
      toast.dismiss();
      // Use the unique key as the toastId
      toast.success(success, { toastId: successKey });
      dispatch({ type: CLEAR_STATUS_MESSAGE });
    }
  }, [error, success]);

  return <ToastContainer />;
};

export default Toast;
