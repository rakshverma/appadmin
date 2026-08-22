import React from "react";
import Modal from "react-modal";
import { CustomModalProps } from "./../../types";
import "./category.css";

function CustomModal(props: CustomModalProps) {
  const {
    handleModalCloseRequest,
    handleSaveClicked,
    modalTitle,
    isOpen,
    footerButtonText,
    closeModal,
    children,
  } = props;
  return (
    <Modal
      className="Modal__Bootstrap modal-dialog"
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={handleModalCloseRequest}
      ariaHideApp={false}
    >
      <div className="modal-content">
        <div className="modal-header bg-dark">
          <h4 className="modal-title text-white">{modalTitle}</h4>
          <button
            type="button"
            className="btn-close bg-white"
            aria-label="Close"
            onClick={closeModal}
          ></button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveClicked}
          >
            {footerButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
