import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import { changePasswordAction, resetUserFlags } from "../../store/actions/userAction";

function ChangePassword({ isOpen, closeModal }: any) {
  const dispatch = useDispatch();
  const { isError } = useSelector((state: any) => state.user);
  const [passwordError, setPasswordError] = useState<any>({});
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    return () => {
      console.log("unmount called");
      setPasswordError({});
      dispatch(resetUserFlags());
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    };
  }, [dispatch]);

  const onChangeFormData = (e: any) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSaveClicked = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setPasswordError(errors);
      return;
    }
    dispatch(changePasswordAction(formData));
  };

  const validateForm = () => {
    const { oldPassword, newPassword, confirmPassword } = formData;
    let errors = {};
    if (!oldPassword) errors = { ...errors, oldPassword: "Please enter old password" };
    if (oldPassword && oldPassword.length < 6) errors = { ...errors, oldPassword: "password must be minimum 6 charecters" };
    if (!newPassword) errors = { ...errors, newPassword: "Please enter new password" };
    if (newPassword && newPassword.length < 6) errors = { ...errors, newPassword: "password must be minimum 6 charecters" };
    if (!confirmPassword) errors = { ...errors, confirmPassword: "Please enter confirm password" };
    if (confirmPassword && confirmPassword !== newPassword)
      errors = { ...errors, confirmPassword: "Confirm password does not match with new password" };

    return errors;
  };

  return (
    <CustomModal
      handleModalCloseRequest={closeModal}
      handleSaveClicked={handleSaveClicked}
      modalTitle={"Change Password"}
      isOpen={isOpen}
      footerButtonText={"Update"}
      closeModal={closeModal}
    >
      {isError && <p style={{ color: "red" }}>{isError}</p>}
      <div className="form-group">
        <div className="form-group">
          <label>Old Password</label>
          <input
            type={"password"}
            name={"oldPassword"}
            placeholder={""}
            className={"form-control"}
            onChange={onChangeFormData}
            value={formData.oldPassword}
          />
          {passwordError.oldPassword && <p style={{ color: "red" }}>{passwordError.oldPassword}</p>}
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type={"password"}
            name={"newPassword"}
            placeholder={""}
            className={"form-control"}
            onChange={onChangeFormData}
            value={formData.newPassword}
          />
          {passwordError.newPassword && <p style={{ color: "red" }}>{passwordError.newPassword}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type={"password"}
            name={"confirmPassword"}
            placeholder={""}
            className={"form-control"}
            onChange={onChangeFormData}
            value={formData.confirmPassword}
          />
          {passwordError.confirmPassword && <p style={{ color: "red" }}>{passwordError.confirmPassword}</p>}
        </div>
      </div>
    </CustomModal>
  );
}

export default ChangePassword;
